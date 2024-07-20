import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import axios from "axios";
import logger from "../logger.mjs";
import { RESET, FG_RED, FG_BLUE, FG_MAGENTA } from "../color.mjs";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = `${process.env.SERVER_URL}:${process.env.PORT}`;
let startTime;
let endTime;

describe("Recommendation API", function () {
  this.timeout(20000);

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

  it("should respond with recommended music", async function () {
    try {
      const genre = "rock";
      const response = await axios.post(`${baseUrl}/api/recommend`, {
        message: genre,
      });

      logger.info(
        `${FG_MAGENTA}Recommended music :, ${JSON.stringify(
          response.data
        )}${RESET}`
      );

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("botMessage");
      expect(response.data).to.have.property("youtubeResults");
      expect(response.data.botMessage).to.be.a("string");
      expect(response.data.youtubeResults).to.be.an("array");
    } catch (error) {
      logger.error("Error during recommendation test:", error);
      throw error;
    }
  });
});
