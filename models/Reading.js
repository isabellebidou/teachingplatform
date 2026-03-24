import mongoose from "mongoose";

const { Schema } = mongoose;

const readingSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  _offer: { type: Schema.Types.ObjectId, ref: "Offer" },
  dateSent: Date,
  dateCompleted: { type: Date, default: null },
  expectations: String,
  pdfPath: String,
  pdfUrl: String
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.readings || mongoose.model("readings", readingSchema);