const mongoose = require("mongoose");
const { Schema } = mongoose;

const audioSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  s3Key: String,
  mimeType: String,
});

mongoose.model("audios", audioSchema);