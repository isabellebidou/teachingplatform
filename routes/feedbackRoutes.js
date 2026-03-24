import { logError, log } from "../services/utils.js";
import keys from "../config/keys.js";
import OpenAI from "openai";

export default (app) => {
  let openai;

  if (keys.openaiKey) {
    openai = new OpenAI({ apiKey: keys.openaiKey });
  }

  app.post("/api/feedback", async (req, res) => {
    const { text } = req.body;
    const lang = req.user.language || "en"
  const language = {
  en: "english",
  fr: "french"
}[lang] || "english";

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // ✅ fallback (always safe)
    const fakeResponse = {
      score: 5,
      errors: [
        {
          error: "goed",
          correction: "went",
          explanation: "Past simple of 'go' is irregular.",
        },
      ],
      suggestion: "Good effort. Review past tense forms.",
      originalText: text,
    };

    if (!openai) return res.json(fakeResponse);

    const systemMessage = `
You are an English teacher AI.

Return STRICT JSON in ${language} with:
- errors: array of { error, correction, explanation }
- suggestion: short feedback
- score: number from 1 to 5

RULES:
- Respond in ${language}.
_ Return ONLY valid JSON.
- No extra text
- No markdown
`;

    try {
      const completion = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: systemMessage }
        ],
        max_output_tokens: 800,
      });

      // Extract the raw text
      const rawText = completion.output?.[0]?.content?.[0]?.text;
      if (!rawText) throw new Error("No text returned from OpenAI");

      // Parse JSON with retry
      let gptData;
      try {
        const cleaned = rawText
                  .trim()
                  .replace(/^```json/, "")
                  .replace(/^```/, "")
                  .replace(/```$/, "")
                  .trim()
        
                log("CLEANED TEXT:", cleaned)
        
                gptData = JSON.parse(cleaned)
      } catch (err) {
        logError("JSON parse error, using fallback:", err);
        gptData = fakeResponse;
      }

      res.json({ ...fakeResponse, ...gptData });
    } catch (err) {
      logError("OpenAI error (fallback to fake):", err);
      res.json(fakeResponse);
    }
  });
};