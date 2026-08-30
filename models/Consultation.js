import mongoose from "mongoose";

const { Schema } = mongoose;

const consultationSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateBooked: Date,
  date: Date,
});

export default mongoose.models.documents || mongoose.model("consultations", consultationSchema);