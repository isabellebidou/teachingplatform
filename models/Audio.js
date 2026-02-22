const mongoose = require("mongoose");
const { Schema } = mongoose;

const audioSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "user" },
  _script: {type: Schema.Types.ObjectId, ref: "Script"},
  createdAt: { type: Date, default: Date.now },
  s3Key: String,
  audioPath: String,
  mimeType: String,
  transcript: String,
  feedback: [String]
  
});

mongoose.model("audios", audioSchema);