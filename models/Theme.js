import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
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
}, { timestamps: true });

ThemeSchema.index({ level: 1 });

export default mongoose.model("Theme", ThemeSchema);