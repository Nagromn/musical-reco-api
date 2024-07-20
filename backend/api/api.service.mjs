import logger from "../logger.mjs";
import { getYouTubeRecommendations } from "./youtube/youtube.service.mjs";
import { getOpenAIRecommendation } from "./openai/openai.service.mjs";

export async function getRecommendation(message) {
  try {
    const youtubeResults = await getYouTubeRecommendations(message);

    const openAIMessage = `Recommended music based on "${message}":\n${youtubeResults
      .map((result, index) => `${index + 1}. ${result.title} (${result.url})`)
      .join("\n")}`;

    const botMessage = await getOpenAIRecommendation(openAIMessage);

    return {
      botMessage,
      youtubeResults,
    };
  } catch (error) {
    logger.error("Error during API call", { error: error.message });
    throw error;
  }
}
