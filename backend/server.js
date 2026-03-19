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

  const question = req.body.question.toLowerCase();

  // 🔥 SIMULATED DEVOPS ACTIONS

  if (question.includes("trigger pipeline")) {
    return res.json(`
✅ Pipeline Triggered

Project: ai-devops-agent
Branch: main
Status: Running...

Logs:
✔ Build started
✔ Running tests
✔ Deployment in progress
`);
  }

  if (question.includes("deploy")) {
    return res.json(`
🚀 Deployment Started

Environment: Production
Status: Deploying...

Steps:
✔ Build complete
✔ Containers created
✔ Deployment in progress
`);
  }

  if (question.includes("rollback")) {
    return res.json(`
⏪ Rollback Initiated

Target Version: Previous stable release
Status: Rolling back...

✔ Reverting deployment
✔ Restarting services
✔ System stable
`);
  }

  // 🤖 AI fallback (REAL AI)

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a senior DevOps engineer. Give clear, practical answers with commands when needed."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json(response.choices[0].message.content);

  } catch (error) {

    console.error(error);
    res.status(500).send("AI Error");

  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
