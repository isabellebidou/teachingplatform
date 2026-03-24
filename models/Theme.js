import mongoose from "mongoose";

const { Schema } = mongoose;

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Index for fast queries
ThemeSchema.index({ level: 1 });

// Export safely to avoid OverwriteModelError
export default mongoose.models.Theme || mongoose.model("Theme", ThemeSchema);