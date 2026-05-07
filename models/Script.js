import mongoose from "mongoose"

const { Schema } = mongoose

const scriptSchema = new Schema({
  sentence: String,
  difficulty: String,
  common_mistake_transcriptions: [{ type: String }],

  visual: String, // e.g. "I reCORD a poLITE introDUCtion"

  partsOfSpeech: {
    type: Map,

    of: Schema.Types.Mixed,
  },
})

// Export safely to avoid OverwriteModelError
export default mongoose.models.Script || mongoose.model("Script", scriptSchema)
