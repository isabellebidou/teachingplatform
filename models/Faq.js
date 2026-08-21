import mongoose from "mongoose";

const { Schema } = mongoose;

const faqSchema = new Schema({
  question:  {
      en: { type: String },
      fr: { type: String }
    },
  answer:  {
      en: { type: String },
      fr: { type: String }
    },
});

// Export safely to avoid "OverwriteModelError"
export default mongoose.models.faqs || mongoose.model("faqs", faqSchema);