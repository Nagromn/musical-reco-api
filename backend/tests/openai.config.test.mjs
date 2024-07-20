import { expect } from "chai";
import dotenv from "dotenv";
import openAIConfig from "../api/openai/config/openai.config.mjs";

dotenv.config();

describe("OpenAI Configuration", function () {
  it("should have the OpenAI API URL and API key defined", function () {
    expect(process.env.OPENAI_API_URL).to.be.a("string").that.is.not.empty;
    expect(process.env.OPENAI_API_KEY).to.be.a("string").that.is.not.empty;
  });

  it("should export a valid openAIConfig object", function () {
    expect(openAIConfig)
      .to.be.an("object")
      .that.includes.keys("apiUrl", "headers");
    expect(openAIConfig.apiUrl).to.equal(process.env.OPENAI_API_URL);
    expect(openAIConfig.headers)
      .to.be.an("object")
      .that.includes.keys("Content-Type", "Authorization");
    expect(openAIConfig.headers["Content-Type"]).to.equal("application/json");
    expect(openAIConfig.headers["Authorization"]).to.equal(
      `Bearer ${process.env.OPENAI_API_KEY}`
    );
  });
});
