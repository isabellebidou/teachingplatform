import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  path: String,
  title: String,
});

export default mongoose.models.documents || mongoose.model("documents", documentSchema);