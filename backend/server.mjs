import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./logger.mjs";
import { getRecommendation } from "./api/api.service.mjs";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/recommend", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ message: "Invalid message input" });
  }

  try {
    const { botMessage, youtubeResults } = await getRecommendation(message);
    res.json({ botMessage, youtubeResults });
    logger.info("Successfully fetched data from OpenAI and YouTube", {
      botMessage,
      youtubeResults: JSON.stringify(youtubeResults, null, 2),
    });
  } catch (error) {
    logger.error("Error fetching data from OpenAI or YouTube", {
      error: error.message,
    });
    res
      .status(500)
      .json({ message: "Error fetching data from OpenAI or YouTube" });
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
