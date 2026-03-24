// routes/exerciceRoutes.js
// routes/exerciceRoutes.js
import { logError as error, log, warn } from "../services/utils.js"
import keys from "../config/keys.js"
import OpenAI from "openai"
import mongoose from "mongoose"
import i18n from "../i18n.js";


export default (app) => {
  let openai
  if (keys.openaiKey) {
    openai = new OpenAI({ apiKey: keys.openaiKey })
  }
;

  app.post("/api/exercice", async (req, res) => {
    const { selectedTopic } = req.body
    const Theme = mongoose.model("Theme")
    const lang = req.user.language || "en"
    const t = i18n.getFixedT(lang)
    if (!selectedTopic)
      return res.status(400).json({ error: "No topic provided" })
    const topicName = selectedTopic.name?.[lang] || selectedTopic.name?.en
    const topicRule = selectedTopic.rule?.[lang] || selectedTopic.rule?.en

    log("/api/exercice selectedTopic", selectedTopic)

    // Pick random theme
    let theme
    try {
      const themes = await Theme.aggregate([
        { $match: { level: req.user.level } },
        { $sample: { size: 1 } },
      ])
      theme = themes[0]
      log("/api/exercice theme", theme)
    } catch (err) {
      return res.status(500).send("Theme not found: " + err.message)
    }

    // Always-available fake fallback
    const fakeResponse = {
      questions: [
        {
          sentence: "I enjoy ____ books in my free time.",
          options: [
            { text: "reading", isCorrect: true },
            { text: "to read", isCorrect: false },
            { text: "read", isCorrect: false },
            { text: "reads", isCorrect: false },
          ],
        },
      ],
      instructions:
        "Fill in the gap with the correct form of the present simple",
    }

    // No OpenAI key → return fake
    if (!openai) return res.json(fakeResponse)

    log("topicName", topicName)
    log("topicRule", topicRule)
    log("lang", lang)
    // Build prompt for strict JSON output
    const systemMessage = `
You are an English teacher AI used inside an automated system.

STRICT RULES:
- You MUST output ONLY valid JSON.
- Do NOT include explanations, comments, markdown, or extra text.
- Do NOT include trailing commas.
- Do NOT include line comments.
- Every string MUST be enclosed in double quotes.
- The output MUST be directly parseable by JSON.parse().

You create grammar gap-fill exercises following the rules provided.
`

    const userMessage = `
TASK:
Create EXACTLY 8 gap-fill questions.

LEVEL:
${req.user.level}

GRAMMAR TOPIC:
${selectedTopic.name}

GRAMMAR RULE (MANDATORY):
${selectedTopic.rule}

${
  selectedTopic.allowedAnswers.length > 0
    ? `
ALLOWED CORRECT ANSWERS (CLOSED SET):
${selectedTopic.allowedAnswers.join(", ")}

CRITICAL CONSTRAINTS:
- The gap "____" MUST be fillable with ONE AND ONLY ONE allowed correct answer.
- The correct option MUST EXACTLY MATCH one allowed answer.
- No other structure may be tested.
- If a sentence does not clearly test this grammar rule, it is INVALID.
`
    : `
GRAMMAR CONSTRAINTS:
- Every sentence MUST clearly test the grammar rule above.
- Do NOT test unrelated grammar points.
`
}

${
  selectedTopic.allowedIncorrectAnswers.length > 0
    ? `
ALLOWED INCORRECT ANSWERS (CLOSED SET):
${selectedTopic.allowedIncorrectAnswers.join(", ")}

DISTRACTOR RULES:
- Use ONLY these incorrect answers as distractors.
- Use them at random positions.
`
    : `
DISTRACTOR RULES:
- Invent plausible but grammatically incorrect distractors.
`
}

${
  selectedTopic.suggestions.length > 0
    ? `
SUGGESTIONS (CLOSED SET):
${selectedTopic.suggestions.join(", ")}

SUGGESTION RULES:
- Randomly select ONE suggestion per question.
- Place the suggestion in parentheses immediately before the gap.
- Example format: "(to work) ____"
- The correct answer MUST correspond exactly to the suggestion.
_ The suggestion MUST align semantically with the question.

`
    : ``
}

THEME:
${theme.name}

QUESTION RULES:
- Each question contains ONE sentence.
- Each sentence contains EXACTLY ONE gap written as "____".
- Vocabulary must match the level and theme.
- Do NOT include dialogue or multiple sentences.
- Each question must be grammatically correct AND logically meaningful.


OPTIONS RULES:
- Each question has EXACTLY ${
      selectedTopic.numberOfOptions > 0 ? selectedTopic.numberOfOptions : 4
    } options.
- EXACTLY ONE option has to be correct.
- ONLY the correct option may be grammatically valid.
- The correct option must produce a grammatically correct AND logically meaningful sentence.
- Avoid sentences where the correct answer creates an illogical meaning.
- each option has to have a different text.
_ Mark the correct option as correct ("isCorrect: true") and the remaining ones as incorrect ("isCorrect: false")
- Never return a question with zero correct answers.
_ The correct option MUST display at a different index everytime.

${
  selectedTopic.examples > 0
    ? `
 EXAMPLE OF OPTION => EXPECTED 
${selectedTopic.examples[0]}
`
    : ``
}
INVALID OUTPUT (DO NOT PRODUCE):
- Sentences testing grammar other than the target rule.
- Gaps solvable by more than one correct answer.
- Any text outside JSON.
- Any missing or extra fields.

IMPORTANT:
${
  selectedTopic.detail !== null
    ? `
 _ 
${selectedTopic.detail}
`
    : ``
}

- Output ONLY the JSON object . Do NOT add explanations or comments.
_ Before returning the JSON, verify that the correct answer is grammatically valid in the sentence.
If it is not valid, regenerate the sentence.

RETURN FORMAT (STRICT JSON ONLY):

{
  "questions": [
    {
      "sentence": "A single sentence with (optional suggestion) ____ gap."
      "options": [
        { "text": "option text", "isCorrect": boolean }
      ]
    }
  ],
  "instructions": "${t("exercise:instructions")} ${topicName}."
}

`

    try {
      const completion = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        max_output_tokens: 800,
      })

      // Extract the raw text

      const rawText = completion.output?.[0]?.content?.[0]?.text
      log("rawText: ", rawText)
      if (!rawText) throw new Error("No text returned from OpenAI")

      log("RAW TEXT TYPE:", typeof rawText)
      log("RAW TEXT LENGTH:", rawText?.length)
      log("RAW TEXT FIRST CHARS:", rawText?.slice(0, 50))

      // Parse JSON with retry
      let gptData

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
        logError("JSON parse error:", err)
      }

      res.json({ ...fakeResponse, ...gptData })
    } catch (err) {
      logError("OpenAI error (fallback to fake):", err)
      res.json(fakeResponse)
    }

    // Helper: validate that each question has exactly one correct option
    function hasExactlyOneCorrectAnswer(questions) {
      return questions.every(
        (q) => q.options.filter((opt) => opt.isCorrect === true).length === 1,
      )
    }

    async function generateWithRetry(generateFn, maxRetries = 3) {
      let attempt = 0
      while (attempt < maxRetries) {
        attempt++
        log(`🔁 Attempt ${attempt} to parse JSON...`)
        const gptData = await generateFn()
        if (hasExactlyOneCorrectAnswer(gptData.questions || [])) {
          log("✅ Valid questions received")
          return gptData
        } else {
          warn("⚠️ Invalid JSON: no correct answers. Retrying...")
        }
      }
      throw new Error("❌ Failed to generate valid questions after retries")
    }
  })
}
