import mongoose from "mongoose";

const { Schema } = mongoose;

// Sub-schema for answers
const AnswerSchema = new Schema(
  {
    questionIndex: Number,
    selectedAnswer: String, // "A"
    correct: Boolean
  },
  { _id: false }
);

// Main schema
const StudentAttemptSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
      required: true
    },
    answers: [AnswerSchema],
    score: Number,
    total: Number,
    completedAt: Date
  },
  { timestamps: true }
);

// Index for fast queries
StudentAttemptSchema.index({ studentId: 1 });

// Export safely to avoid OverwriteModelError
export default mongoose.models.StudentAttempt || mongoose.model("StudentAttempt", StudentAttemptSchema);