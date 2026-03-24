import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import { transcribeAudio } from "../services/elevenLabsTranscription.js";
import upload from "../config/audioUpload.js";
import { uploadFile, deleteSeveralAudios, getObjectSignedUrl } from "../services/s3.js";
import { logError as error, log } from "../services/utils.js";
import { normalize, compareWords, generateFeedback } from "./helpers.js";

const Audio = mongoose.model("audios");
const Script = mongoose.model("Script");

export default (app) => {

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
        const { scriptId, lang } = req.body;

        let script;
        try {
          script = await Script.findById(scriptId);
        } catch (err) {
          return res.status(404).send("Script not found " + err);
        }

        // ==========> TRANSCRIBE AUDIO 
        const transcriptionResult = await transcribeAudio(
          buffer,
          mimetype,
          originalname
        );

        const transcriptText = transcriptionResult.text;
        log("Transcription:", transcriptText);

        // ==========> PROCESS TEXT  
        const feedback = generateFeedback(
          lang,
          compareWords(
            normalize(script.sentence).split(" "),
            normalize(transcriptText).split(" ")
          ),
          transcriptText
        );

        log(`script: ${scriptId} from audioRoutes POST audio`);
        log(`feedback: ${feedback} from audioRoutes POST audio`);

        const s3Key = `audios/${req.user.id}/${Date.now()}-${originalname}`;

        // Upload to S3
        await uploadFile(buffer, s3Key, mimetype);

        // Save to MongoDB
        const audio = await new Audio({
          _user: req.user.id,
          _script: scriptId,
          s3Key,
          mimeType: mimetype,
          transcript: transcriptText,
          feedback: feedback,
        }).save();

        res.send(audio);

      } catch (err) {
        error("Audio upload error:", err);
        res.status(500).send("Audio upload failed");
      }
    }
  );

  function findAudiosKeys(ids) {
    return new Promise((resolve, reject) => {
      Audio.find({ _id: { $in: ids } }, { s3Key: 1 })
        .exec((err, docs) => {
          if (err) reject(err);
          else resolve(docs);
        });
    });
  }

  app.delete("/api/user_audios/delete", async (req, res) => {
    const idsToDelete = req.body.idsToDelete.map(id =>
      mongoose.Types.ObjectId(id)
    );

    try {
      const s3Keys = await findAudiosKeys(idsToDelete);

      await deleteSeveralAudios(s3Keys);
      const result = await Audio.deleteMany({ _id: { $in: idsToDelete } });

      res.send(result);

    } catch (err) {
      log(err);
      res.send("Failed to delete audios");
    }
  });

  app.get("/api/user_audios", requireLogin, async (req, res) => {
    try {
      log("GET /api/user_audios");

      const audios = await Audio
        .find({ _user: req.user.id })
        .populate({
          path: "_script",
          select: "sentence"
        });

      res.send(audios);

    } catch (err) {
      error(err);
      res.status(500).send("Failed to fetch audios");
    }
  });

  app.get("/api/audio-url/:id", requireLogin, async (req, res) => {
    try {
      const audio = await Audio.findById(req.params.id);

      if (!audio) {
        return res.status(404).json({ error: "Audio not found" });
      }

      if (audio._user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const url = await getObjectSignedUrl(audio.s3Key);
      res.json({ url });

    } catch (err) {
      error(err);
      res.status(500).json({ error: "Failed to generate URL" });
    }
  });
};