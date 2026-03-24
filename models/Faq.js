import mongoose from "mongoose";

const { Schema } = mongoose;

const faqSchema = new Schema({
  question: String,
  answer: String
});

// Export safely to avoid "OverwriteModelError"
export default mongoose.models.faqs || mongoose.model("faqs", faqSchema);