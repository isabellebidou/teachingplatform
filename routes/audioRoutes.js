const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const upload = require("../config/audioUpload");
const { uploadFile, getObjectSignedUrl } = require("../services/s3");

const Audio = mongoose.model("audios");

module.exports = (app) => {

  /**
   * Upload audio
   * POST /api/audio
   * multipart/form-data
   * field name: "audio"
   */
  app.post(
    "/api/audio",
    requireLogin,
    upload.single("audio"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).send("No audio file provided");
        }

        const { buffer, mimetype, originalname } = req.file;

        const s3Key = `audios/${req.user.id}/${Date.now()}-${originalname}`;

        // Upload to S3
        await uploadFile(buffer, s3Key, mimetype);

        // Save metadata to MongoDB
        const audio = await new Audio({
          _user: req.user.id,
          s3Key,
          mimeType: mimetype,
        }).save();

        res.send(audio);
      } catch (err) {
        console.error("Audio upload error:", err);
        res.status(500).send("Audio upload failed");
      }
    }
  );

  /**
   * List user's audios (with signed URLs)
   * GET /api/user_audios
   */
  app.get("/api/user_audios", requireLogin, async (req, res) => {
    try {
      console.log("/api/user_audios")
      const audios = await Audio.find({ _user: req.user.id }).sort({
        createdAt: -1,
      });

      const audiosWithUrls = await Promise.all(
        audios.map(async (audio) => {
          const url = await getObjectSignedUrl(audio.s3Key);
          return {
            ...audio.toObject(),
            audioUrl: url,
          };
        })
      );


      res.send(audiosWithUrls);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch audios");
    }
  });
};
