// routes/feedbackRoutes.js
const keys = require("../config/keys");
const OpenAI = require("openai");

module.exports = (app) => {
  let openai;
  if (keys.openaiKey) {
    openai = new OpenAI({ apiKey: keys.openaiKey });
  }

  app.post("/api/feedback", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    // Always-available fake fallback
    const fakeResponse = {
      score: 5,
      errors: [
        { error: "goed", correction: "went", explanation: "Past simple of 'go' is irregular." }
      ],
      suggestion: "Good effort. Review past tense forms.",
      originalText: text
    };

    // No OpenAI key → return fake
    if (!openai) return res.json(fakeResponse);

    const systemMessage = `
You are an English teacher AI. Analyze the text and return a JSON object with:
- errors: array of { error, correction, explanation } for grammar, vocabulary, or word order mistakes
- suggestion: short overall feedback
- score: number from 1 to 5 (5 = perfect)
Return ONLY JSON, no explanations outside the JSON.
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: text }
        ],
        max_tokens: 200
      });

      let gptData;
      try {
        gptData = JSON.parse(completion.choices[0].message.content);
      } catch (err) {
        console.error("JSON parse error, using GPT text as suggestion:", err);
        gptData = { ...fakeResponse, suggestion: completion.choices[0].message.content };
      }

      res.json({ ...fakeResponse, ...gptData });

    } catch (err) {
      console.error("OpenAI error (fallback to fake):", err.name, err.message);
      // **Return fake feedback if any OpenAI error occurs (rate limit, network, etc.)**
      res.json(fakeResponse);
    }
  });
};
