import { expect } from "chai";
import dotenv from "dotenv";
import youtubeConfig from "../api/youtube/config/youtube.config.mjs";

dotenv.config();

describe("YouTube Configuration", function () {
  it("should have the YouTube API URL and API key defined", function () {
    expect(process.env.YOUTUBE_API_URL).to.be.a("string").that.is.not.empty;
    expect(process.env.YOUTUBE_API_KEY).to.be.a("string").that.is.not.empty;
  });

  it("should export a valid youtubeConfig object", function () {
    expect(youtubeConfig)
      .to.be.an("object")
      .that.includes.keys("apiUrl", "apiKey");

    expect(youtubeConfig.apiUrl).to.equal(process.env.YOUTUBE_API_URL);
    expect(youtubeConfig.apiKey).to.equal(process.env.YOUTUBE_API_KEY);
  });
});
