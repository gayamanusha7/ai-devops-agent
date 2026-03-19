require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AI DevOps Agent Running 🚀");
});

app.post("/ask", async (req, res) => {

  const question = req.body.question;

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert DevOps assistant. Help with CI/CD pipelines, GitLab, deployments, Kubernetes, Docker, monitoring and troubleshooting."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const answer = response.choices[0].message.content;

    res.json(answer);

  } catch (error) {

    console.error(error);
    res.status(500).send("AI Error");

  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
