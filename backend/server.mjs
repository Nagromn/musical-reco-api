import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./logger.mjs";
import recommendationRoute from "./routes/recommendation.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", recommendationRoute);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
