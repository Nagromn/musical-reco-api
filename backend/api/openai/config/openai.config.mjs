import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_URL = process.env.OPENAI_API_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_URL || !OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API configuration.");
}

const openAIConfig = {
  apiUrl: OPENAI_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
};

export default openAIConfig;
