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

  try {
    const botMessage = await getRecommendation(message);
    res.json({ message: botMessage });
    logger.info("Successfully fetched data from OpenAI", {
      message: botMessage,
    });
  } catch (error) {
    logger.error("Error fetching data from OpenAI", { error: error.message });
    res.status(500).json({ message: "Error fetching data from OpenAI" });
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
