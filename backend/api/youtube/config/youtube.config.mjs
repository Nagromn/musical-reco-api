import dotenv from "dotenv";
dotenv.config();

const YOUTUBE_API_URL = process.env.YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_URL || !YOUTUBE_API_KEY) {
  throw new Error("Missing YouTube API configuration.");
}

const youtubeConfig = {
  apiUrl: YOUTUBE_API_URL,
  apiKey: YOUTUBE_API_KEY,
};

export default youtubeConfig;
