import mongoose from "mongoose";

const { Schema } = mongoose;

const starReviewSchema = new Schema({
  name: { type: String, default: "anonymous" },
  number: { type: Number, default: 0 },
  comment: String,
  dateSent: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.starreviews || mongoose.model("starreviews", starReviewSchema);