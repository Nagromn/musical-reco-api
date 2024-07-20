import express from "express";
import logger from "../logger.mjs";
import { getRecommendation } from "../api/api.service.mjs";

const router = express.Router();

router.post("/recommend", async (req, res) => {
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

export default router;
