import axios from "axios";
import dotenv from "dotenv";
import logger from "../logger.mjs"; // Importer le logger centralisé
dotenv.config();

const API_URL = process.env.OPENAI_API_URL;
const API_KEY = process.env.OPENAI_API_KEY;

// Vérifier les variables d'environnement
if (!API_URL || !API_KEY) {
  logger.error(
    "Environment variables OPENAI_API_URL and OPENAI_API_KEY must be defined."
  );
  throw new Error("Missing API configuration.");
}

// Configuration de l'appel API
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function getRecommendation(message) {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        messages: [
          {
            role: "user",
            content: `Recommended music based : ${message}`,
          },
        ],
        model: "gpt-4o",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stop: null,
      },
      config
    );

    logger.info("API call successful", { response: response.data });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    logger.error("Error during API call", { error: error.message });
    throw error;
  }
}
