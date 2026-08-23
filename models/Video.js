import mongoose from "mongoose";

const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    s3Key: {
      type: String,
      required: true,
    },

    videoPath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      default: "video/mp4",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("videos", videoSchema);