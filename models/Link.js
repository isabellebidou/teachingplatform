import mongoose from "mongoose";

const { Schema } = mongoose;

const linkSchema = new Schema({
  name: String,
  url: String,
  type: { type: String, default: "text" },
  comment: String
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.links || mongoose.model("links", linkSchema);