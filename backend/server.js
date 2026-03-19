require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("AI DevOps Agent Running 🚀");
});

// 🚀 MAIN API
app.post("/ask", async (req, res) => {

  const question = req.body.question.toLowerCase().trim();
    // 🔥 SMART DEVOPS ACTION DETECTION
    
    // PIPELINE
    if (
      question.includes("pipeline") &&
      (
        question.includes("trigger") ||
        question.includes("run") ||
        question.includes("start")
      )
    ) {
      return res.json(`
    🚀 DevOps Action: Pipeline Execution
    
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
    
    // DEPLOY
    if (
      question.includes("deploy")
    ) {
      return res.json(`
    🚀 DevOps Action: Deployment
    
    🚀 Deployment Started
    
    Environment: Production
    Status: Deploying...
    
    Steps:
    ✔ Build complete
    ✔ Containers created
    ✔ Deployment in progress
    `);
    }
    
    // ROLLBACK
    if (
      question.includes("rollback") ||
      question.includes("revert")
    ) {
      return res.json(`
    ⏪ DevOps Action: Rollback
    
    ⏪ Rollback Initiated
    
    Target Version: Previous stable release
    Status: Rolling back...
    
    ✔ Reverting deployment
    ✔ Restarting services
    ✔ System stable
    `);
    }
  // 🤖 AI FALLBACK (REAL AI)

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a senior DevOps engineer. Give clear, practical answers with commands when needed."
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

    console.error("AI Error:", error);
    res.status(500).send("AI Error");

  }

});

// 🌐 Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
