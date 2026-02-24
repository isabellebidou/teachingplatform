import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  key: String,  // "A", "B", "C"
  text: String
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  sentence: String,
  options: [OptionSchema],
  correctAnswer: String // "A"
}, { _id: false });

const ExerciseSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    required: true
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true
  },
  grammarTopic: {
    type: mongoose.Schema.Types.ObjectId,
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
}, { timestamps: true });

ExerciseSchema.index({ level: 1, theme: 1, grammarTopic: 1 });

export default mongoose.model("Exercise", ExerciseSchema);