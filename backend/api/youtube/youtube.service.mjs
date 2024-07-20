import axios from "axios";
import logger from "../../logger.mjs";
import youtubeConfig from "./config/youtube.config.mjs";

export async function getYouTubeRecommendations(query) {
  try {
    const response = await axios.get(youtubeConfig.apiUrl, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 3,
        key: youtubeConfig.apiKey,
      },
    });

    logger.info("YouTube API call successful", { response: response.data });
    return response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    logger.error("Error during YouTube API call", { error: error.message });
    throw error;
  }
}
