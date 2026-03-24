import mongoose from "mongoose";

const { Schema } = mongoose;

const LevelSchema = new Schema(
  {
    cefr: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true,
      unique: true
    },
    frenchLabels: {
      type: [String], // ["5e", "4e"]
      default: []
    },
    description: String
  },
  { timestamps: true }
);

// Export safely to avoid OverwriteModelError
export default mongoose.models.Level || mongoose.model("Level", LevelSchema);
