const mongoose = require("mongoose");
const { Schema } = mongoose;

const audioSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  s3Key: String,
  audioPath: String,
  mimeType: String,
});

mongoose.model("audios", audioSchema);