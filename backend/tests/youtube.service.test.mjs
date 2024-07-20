import { expect } from "chai";
import dotenv from "dotenv";
import { getYouTubeRecommendations } from "../api/youtube/youtube.service.mjs";

dotenv.config();

describe("getYouTubeRecommendations Function", function () {
  this.timeout(20000);

  const mockQuery = "rock music";

  it("should return a list of YouTube video recommendations for 'rock music' ", async function () {
    try {
      const response = await getYouTubeRecommendations(mockQuery);
      expect(response).to.be.an("array");
      expect(response).to.have.lengthOf.at.least(1);
      response.forEach((item) => {
        expect(item).to.include.keys("title", "videoId", "url");
        expect(item.title).to.be.a("string");
        expect(item.videoId).to.be.a("string");
        expect(item.url).to.be.a("string");
        expect(item.url).to.include("https://www.youtube.com/watch?v=");
      });
      console.log("YouTube Recommendations:", response);
    } catch (error) {
      console.error("Error during YouTube API call:", error);
      throw error;
    }
  });
});
