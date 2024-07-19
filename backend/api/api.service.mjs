import axios from "axios";
import dotenv from "dotenv";
import logger from "../logger.mjs";

dotenv.config();

const API_URL = process.env.OPENAI_API_URL;
const API_KEY = process.env.OPENAI_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_URL || !API_KEY || !YOUTUBE_API_KEY) {
  logger.error(
    "Environment variables OPENAI_API_URL, OPENAI_API_KEY, and YOUTUBE_API_KEY must be defined."
  );
  throw new Error("Missing API configuration.");
}

export async function getRecommendation(message) {
  let botMessage;
  let youtubeResults = [];

  try {
    // Appel à l'API OpenAI
    const response = await axios.post(
      `${API_URL}`,
      {
        messages: [
          {
            role: "user",
            content: `Recommended music based: ${message}`,
          },
        ],
        model: "gpt-4",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stop: null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    botMessage = response.data.choices[0].message.content.trim();
    logger.info("OpenAI API call successful", { response: response.data });

    // Recherche sur YouTube
    try {
      youtubeResults = await searchYouTube(botMessage);
    } catch (youtubeError) {
      logger.error("Error during YouTube search", {
        message: youtubeError.message,
        stack: youtubeError.stack,
        response: youtubeError.response
          ? youtubeError.response.data
          : "No response data",
      });
      // Même si la recherche YouTube échoue, nous retournons les résultats d'OpenAI
    }
  } catch (error) {
    logger.error("Error during OpenAI API call", { error: error.message });
    throw error;
  }

  return { botMessage, youtubeResults };
}

async function searchYouTube(query) {
  try {
    logger.info("Search query for YouTube", { query });

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 3,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    if (!response.data.items || response.data.items.length === 0) {
      logger.warn("No results found on YouTube", { query });
      return [];
    }

    const results = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    logger.info("YouTube search successful", { results });
    return results;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === 403
    ) {
      // Gérer les erreurs de quota
      throw new Error("Quota exceeded for YouTube API");
    } else {
      logger.error("Error during YouTube search", {
        message: error.message,
        stack: error.stack,
        response: error.response ? error.response.data : "No response data",
      });
      throw error;
    }
  }
}
