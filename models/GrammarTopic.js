import mongoose from "mongoose";

const { Schema } = mongoose;

const GrammarTopicSchema = new Schema(
  {
    name: {
      en: { type: String },
      fr: { type: String }
    },
    level: {
      type: String,
      enum: ["A1", "A2", "B", "C"],
      required: true
    },
    rule: {
      en: { type: String, required: true },
      fr: { type: String, required: true }
    },
    allowedAnswers: { type: [String], default: [] },
    allowedIncorrectAnswers: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    numberOfOptions: { type: Number, default: null },
    examples: { type: [String], default: [] },
    commonErrors: { type: [String], default: [] },
    detail: { type: String, default: null },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Index for fast queries
GrammarTopicSchema.index({ level: 1 });

// Export safely (prevents overwrite errors in production)
export default mongoose.models.GrammarTopic || mongoose.model("GrammarTopic", GrammarTopicSchema);