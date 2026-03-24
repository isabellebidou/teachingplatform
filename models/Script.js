import mongoose from "mongoose";

const { Schema } = mongoose;

const scriptSchema = new Schema({
  sentence: String,
  difficulty: String,
  common_mistake_transcriptions: [{ type: String }]
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.Script || mongoose.model("Script", scriptSchema);