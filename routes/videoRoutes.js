import mongoose from "mongoose";
import {
  getObjectSignedUrl
} from "../services/s3.js"

const Video = mongoose.model("videos");
export default (app) => {

app.get("/api/videos", async (req, res) => {
  try {

    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch videos");
  }
});


  app.get("/api/video-url/:id", async (req, res) => {
    try {
      const video = await Video.findById(req.params.id)

      if (!video) {
        return res.status(404).json({ error: "video not found" })
      }

      const url = await getObjectSignedUrl(video.s3Key)
      res.json({ url })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Failed to generate URL" })
    }
  })
}