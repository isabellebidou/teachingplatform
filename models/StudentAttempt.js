import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedAnswer: String, // "A"
  correct: Boolean
}, { _id: false });

const StudentAttemptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true
  },
  answers: [AnswerSchema],
  score: Number,
  total: Number,
  completedAt: Date
}, { timestamps: true });

StudentAttemptSchema.index({ studentId: 1 });

export default mongoose.model("StudentAttempt", StudentAttemptSchema);