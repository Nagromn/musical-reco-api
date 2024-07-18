import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import {
  getGenreRecommendation,
  getArtistRecommendation,
  getMoodRecommendation,
} from "../api/api.service.mjs";
import logger from "../logger.mjs";
import { RESET, FG_RED, FG_BLUE, FG_MAGENTA } from "../color.mjs";

let startTime;
let endTime;

describe("Recommendation API", function () {
  this.timeout(35000);

  before(function () {
    startTime = Date.now();
    logger.info(`${FG_BLUE}Starting test suite...${RESET}`);
  });

  after(function () {
    endTime = Date.now();
    const totalTime = endTime - startTime;
    logger.info(`Total time for all tests: ${FG_RED}(${totalTime}ms)${RESET}`);
    logger.info(`${FG_BLUE}Finished test suite.${RESET}`);
  });

  it("should respond with recommended music based on genre", async function () {
    this.timeout(10000);

    try {
      const genre = "rock";
      const recommendedMusic = await getGenreRecommendation(genre);

      logger.info(
        `${FG_MAGENTA}Recommended music based on genre:, ${recommendedMusic}${RESET}`
      );

      expect(recommendedMusic).to.be.a("string");
    } catch (error) {
      logger.error("Error during genre recommendation test:", error);
      throw error;
    }
  });

  it("should respond with recommended music based on artist", async function () {
    this.timeout(10000);

    try {
      const artist = "Michael Jackson";
      const recommendedMusic = await getArtistRecommendation(artist);

      logger.info(
        `${FG_MAGENTA}Recommended music based on artist:, ${recommendedMusic}${RESET}`
      );

      expect(recommendedMusic).to.be.a("string");
    } catch (error) {
      logger.error("Error during artist recommendation test:", error);
      throw error;
    }
  });

  it("should respond with recommended music based on mood", async function () {
    this.timeout(15000);

    try {
      const mood = "happy";
      const recommendedMusic = await getMoodRecommendation(mood);

      logger.info(
        `${FG_MAGENTA}Recommended music based on mood:, ${recommendedMusic}${RESET}`
      );

      expect(recommendedMusic).to.be.a("string");
    } catch (error) {
      logger.error("Error during mood recommendation test:", error);
      throw error;
    }
  });
});
