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

app.post("/ask", (req, res) => {

    const question = req.body.question.toLowerCase();
  
    if(question.includes("pipeline")){
        res.json("To trigger a GitLab pipeline you can use GitLab CI/CD or the GitLab API.");
    }
    else if(question.includes("deploy")){
        res.json("Deployment started. The AI DevOps agent would trigger the deployment pipeline.");
    }
    else if(question.includes("merge request")){
        res.json("Checking GitLab merge requests...");
    }
    else{
        res.json("AI DevOps Agent received your request.");
    }
  
  });

// app.post("/ask", async (req, res) => {

//   const question = req.body.question;

//   try {

//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         { role: "system", content: "You are a DevOps assistant." },
//         { role: "user", content: question }
//       ]
//     });

//     res.json(response.choices[0].message.content);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("AI Error");
//   }

// });
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
