import { expect } from "chai";
import dotenv from "dotenv";
import { getOpenAIRecommendation } from "../api/openai/openai.service.mjs";

dotenv.config();

describe("test bot response from openAI", function () {
  this.timeout(20000);

  const mockMessage = "rock";

  it("should return the expected response from OpenAI", async function () {
    try {
      const response = await getOpenAIRecommendation(mockMessage);
      expect(response).to.be.a("string");
      console.log("Response from OpenAI:", response);
    } catch (error) {
      console.error("Error during OpenAI API call:", error);
      throw error;
    }
  });
});
