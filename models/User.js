import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  numberOfDocuments: { type: Number, default: 0 },
  type: { type: String, default: "guest" },
  email: String,
  hasReviews: { type: Boolean, default: false },
  level: String,
  language: { type: String, default: "en" }
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.users || mongoose.model("users", userSchema);