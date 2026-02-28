// routes/feedbackRoutes.js
const mongoose = require("mongoose")
const keys = require("../config/keys")
const OpenAI = require("openai")
const Theme = mongoose.model("Theme")

module.exports = (app) => {
  let openai
  if (keys.openaiKey) {
    openai = new OpenAI({ apiKey: keys.openaiKey })
  }


  

  app.post("/api/exercice", async (req, res) => {
    const { selectedTopic } = req.body
    let theme

    try {
      const themes = await Theme.aggregate([
        { $match: { level: req.user.level } },
        { $sample: { size: 1 } },
      ])

      theme = themes[0]
    } catch (error) {
      return res.status(500).send("Theme not found: " + error)
    }
    if (!selectedTopic)
      return res.status(400).json({ error: "No topic provided" })

    // Always-available fake fallback
    const fakeResponse = {
"questions":[{"sentence":"I enjoy ____ books in my free time.","options":[{"text":"reading","isCorrect":true},{"text":"to read","isCorrect":false},{"text":"read","isCorrect":false},{"text":"reads","isCorrect":false}]},{"sentence":"She ____ basketball every weekend.","options":[{"text":"plays","isCorrect":true},{"text":"play","isCorrect":false},{"text":"playing","isCorrect":false},{"text":"played","isCorrect":false}]},{"sentence":"My brother ____ swimming in the pool.","options":[{"text":"likes","isCorrect":true},{"text":"like","isCorrect":false},{"text":"liked","isCorrect":false},{"text":"liking","isCorrect":false}]},{"sentence":"They often ____ TV in the evening.","options":[{"text":"watch","isCorrect":true},{"text":"to watch","isCorrect":false},{"text":"watching","isCorrect":false},{"text":"watches","isCorrect":false}]},{"sentence":"____ is my favorite hobby.","options":[{"text":"Drawing","isCorrect":true},{"text":"Draws","isCorrect":false},{"text":"To draw","isCorrect":false},{"text":"Draw","isCorrect":false}]},{"sentence":"We ____ volleyball on Saturdays.","options":[{"text":"play","isCorrect":true},{"text":"plays","isCorrect":false},{"text":"playing","isCorrect":false},{"text":"played","isCorrect":false}]},{"sentence":"She ____ music in her room.","options":[{"text":"listens to","isCorrect":true},{"text":"listening to","isCorrect":false},{"text":"listened to","isCorrect":false},{"text":"listen to","isCorrect":false}]},{"sentence":"He ____ soccer with his friends on weekends.","options":[{"text":"plays","isCorrect":true},{"text":"play","isCorrect":false},{"text":"playing","isCorrect":false},{"text":"played","isCorrect":false}]}]
    }
    const exampleJSON = JSON.stringify(fakeResponse, null, 2)
    // No OpenAI key → return fake
   // if (!openai) return res.json(fakeResponse)
   if (true) return res.json(fakeResponse);

const systemMessage = `
You are an English teacher AI.
You create grammar gap-fill exercises.
You always return valid JSON only.
`;

const userMessage = `
Create exactly 8 gap-fill questions.

CEFR level: ${req.user.level}
Grammar focus: ${selectedTopic}
Theme: ${theme.name}

Rules:
- Each question contains ONE sentence with a single gap marked as ____
- Use vocabulary and structures appropriate to the CEFR level
- Each question has exactly 4 answer options
- Exactly one option is correct
- No explanations or comments
- Return JSON only

Required JSON format:
{
  "questions": [
    {
      "sentence": "Sentence with ____ gap.",
      "options": [
        { "text": "option 1", "isCorrect": true },
        { "text": "option 2", "isCorrect": false },
        { "text": "option 3", "isCorrect": false },
        { "text": "option 4", "isCorrect": false }
      ]
    }
  ]
}
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage }
        ],
        max_tokens: 800,
      })

      let gptData
      try {
        gptData = JSON.parse(completion.choices[0].message.content)
        console.log("gptData from exerciceRoutes: " + JSON.stringify(gptData))
      } catch (err) {
        console.error("JSON parse error, using GPT text as suggestion:", err)
        gptData = {
          ...fakeResponse,
          suggestion: completion.choices[0].message.content,
        }
      }

      res.json({ ...fakeResponse, ...gptData })
    } catch (err) {
      console.error("OpenAI error (fallback to fake):", err.name, err.message)
      // **Return fake feedback if any OpenAI error occurs (rate limit, network, etc.)**
      res.json(fakeResponse)
    }
  })
}
