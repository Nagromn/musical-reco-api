import axios from "axios";
import logger from "../../logger.mjs";
import openAIConfig from "./config/openai.config.mjs";

export async function getOpenAIRecommendation(message) {
  try {
    const response = await axios.post(
      openAIConfig.apiUrl,
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "gpt-4o",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stop: null,
      },
      {
        headers: openAIConfig.headers,
      }
    );

    logger.info("OpenAI API call successful", { response: response.data });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    logger.error("Error during OpenAI API call", { error: error.message });
    throw error;
  }
}
