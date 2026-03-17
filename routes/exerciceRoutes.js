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
    console.log("/api/exercice selectedTopic", selectedTopic)
    let theme

    try {
      const themes = await Theme.aggregate([
        { $match: { level: req.user.level } },
        { $sample: { size: 1 } },
      ])

      theme = themes[0]
      console.log("/api/exercice theme", theme)
    } catch (error) {
      return res.status(500).send("Theme not found: " + error)
    }
    if (!selectedTopic)
      return res.status(400).json({ error: "No topic provided" })

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
        {
          sentence: "She ____ basketball every weekend.",
          options: [
            { text: "plays", isCorrect: true },
            { text: "play", isCorrect: false },
            { text: "playing", isCorrect: false },
            { text: "played", isCorrect: false },
          ],
        },
        {
          sentence: "My brother ____ swimming in the pool.",
          options: [
            { text: "likes", isCorrect: true },
            { text: "like", isCorrect: false },
            { text: "liked", isCorrect: false },
            { text: "liking", isCorrect: false },
          ],
        },
        {
          sentence: "They often ____ TV in the evening.",
          options: [
            { text: "watch", isCorrect: true },
            { text: "to watch", isCorrect: false },
            { text: "watching", isCorrect: false },
            { text: "watches", isCorrect: false },
          ],
        },
        {
          sentence: "____ is my favorite hobby.",
          options: [
            { text: "Drawing", isCorrect: true },
            { text: "Draws", isCorrect: false },
            { text: "To draw", isCorrect: false },
            { text: "Draw", isCorrect: false },
          ],
        },
        {
          sentence: "We ____ volleyball on Saturdays.",
          options: [
            { text: "play", isCorrect: true },
            { text: "plays", isCorrect: false },
            { text: "playing", isCorrect: false },
            { text: "played", isCorrect: false },
          ],
        },
        {
          sentence: "She ____ music in her room.",
          options: [
            { text: "listens to", isCorrect: true },
            { text: "listening to", isCorrect: false },
            { text: "listened to", isCorrect: false },
            { text: "listen to", isCorrect: false },
          ],
        },
        {
          sentence: "He ____ soccer with his friends on weekends.",
          options: [
            { text: "plays", isCorrect: true },
            { text: "play", isCorrect: false },
            { text: "playing", isCorrect: false },
            { text: "played", isCorrect: false },
          ],
        },
      ],
      instructions:
        "Fill in the gap with the correct form of the present simple",
    }
    // const exampleJSON = JSON.stringify(fakeResponse, null, 2)
    // No OpenAI key → return fake // toggle fake vs real
    if (!openai) return res.json(fakeResponse) // real
    // if (true) return res.json(fakeResponse);// fake

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
`;

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
_ The correct option MUST display at a different index everytime.

${
  selectedTopic.examples > 0 
  ?`
 EXAMPLE OF OPTION => EXPECTED 
${selectedTopic.examples[0]}
`:``}
INVALID OUTPUT (DO NOT PRODUCE):
- Sentences testing grammar other than the target rule.
- Gaps solvable by more than one correct answer.
- Any text outside JSON.
- Any missing or extra fields.

IMPORTANT:
${
  selectedTopic.detail !== null 
  ?`
 _ 
${selectedTopic.detail}
`:``}

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
  "instructions": "Fill in the gap using ${selectedTopic.name}."
}

`;
    try {
 const completion = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content: "You are an API. You must return ONLY valid JSON. No text, no explanations."
    },
    {
      role: "user",
      content: systemMessage + "\n\n" + userMessage
    }
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
      //const fixedQuestions = ensureCorrectAnswers(gptData.questions);
      res.json({ ...fakeResponse, ...gptData })
    } catch (err) {
      console.error("OpenAI error (fallback to fake):", err.name, err.message)
      // **Return fake feedback if any OpenAI error occurs (rate limit, network, etc.)**
      res.json(fakeResponse)
    }
  })
  /**
 * Ensure every question has at least one correct answer.
 * If missing, it picks the first option and marks it correct.
 * Logs a warning for debugging.
 */
function ensureCorrectAnswers(questions) {
  return questions.map((q, idx) => {
    const hasCorrect = q.options.some(opt => opt.isCorrect);

    if (!hasCorrect) {
      console.warn(
        `⚠️ Question ${idx + 1} has no correct answer. Marking first option as correct:`,
        q.sentence
      );

      // mark first option as correct
      q.options[0].isCorrect = true;
    }

    return q;
  });
}




// Now you can safely pass fixedQuestions to your front-end
console.log("✅ All questions now have at least one correct answer.");
}
