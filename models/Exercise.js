import mongoose from "mongoose";

const { Schema } = mongoose;

// Sub-schemas
const OptionSchema = new Schema(
  {
    key: String,  // "A", "B", "C"
    text: String
  },
  { _id: false }
);

const QuestionSchema = new Schema(
  {
    sentence: String,
    options: [OptionSchema],
    correctAnswer: String // "A"
  },
  { _id: false }
);

// Main Exercise schema
const ExerciseSchema = new Schema(
  {
    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
      required: true
    },
    grammarTopic: {
      type: Schema.Types.ObjectId,
      ref: "GrammarTopic",
      required: true
    },
    questions: {
      type: [QuestionSchema],
      required: true
    },
    source: {
      type: String,
      enum: ["openai", "manual"],
      default: "openai"
    }
  },
  { timestamps: true }
);

// Index for fast queries
ExerciseSchema.index({ level: 1, theme: 1, grammarTopic: 1 });

// Export the model safely (avoids "model overwrite" errors in hot reload or serverless)
export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);