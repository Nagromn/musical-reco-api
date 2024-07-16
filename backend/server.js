require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL;

app.use(cors());
app.use(express.json());

app.post("/recommend", async (req, res) => {
  const { message } = req.body;

  try {
    console.log("Received message:", message);
    console.log(OPENAI_API_KEY);

    const response = await axios.post(
      `${OPENAI_API_URL}`,
      {
        messages: [
          {
            role: "user",
            content: `Recommend music based on genre or artist: ${message}`,
          },
        ],
        model: "gpt-4o",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stop: null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content.trim();
    res.json({ message: botMessage });
  } catch (error) {
    console.error(
      "Error fetching data from OpenAI:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error fetching data from OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
