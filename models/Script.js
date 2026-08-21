import mongoose from "mongoose"

const { Schema } = mongoose

const scriptSchema = new Schema({
  sentence: String,
  difficulty: String,
  common_mistake_transcriptions: [{ type: String }],

  visual: String, // e.g. "I reCORD a poLITE introDUCtion"
  // targetVowels: ["ɪ", "ɔ", "eɪ", "ʊ", "iː", "uː", "æ", "ɑː", "ɜː", "ə"],

  partsOfSpeech: {
    type: Map,

    of: Schema.Types.Mixed,
  },
  targetVowels: [
    {
      word: { type: String, required: true },
      vowel: { type: String, required: true },
      targetVowel: { type: String, required: true },
    }
  ]
})

// Export safely to avoid OverwriteModelError
export default mongoose.models.Script || mongoose.model("Script", scriptSchema)
