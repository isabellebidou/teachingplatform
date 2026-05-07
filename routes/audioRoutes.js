import mongoose from "mongoose"
import requireLogin from "../middlewares/requireLogin.js"
import { transcribeAudio } from "../services/elevenLabsTranscription.js"
import fs from "fs"
import { convertWebmToWav } from "../services/convertWebmToWav.js"
import { analyzeAudioStress } from "../stress_engine/index.js"
//import { safeAnalyzeAudioStress } from "../stress_engine/safe.js";
import { buildStressRequest } from "../services/buildStressRequest.js"
import upload from "../config/audioUpload.js"
import i18n from "../i18n.js"
import {
  uploadFile,
  deleteSeveralAudios,
  getObjectSignedUrl,
} from "../services/s3.js"
import { logError as error, log } from "../services/utils.js"
import {
  normalize,
  compareWords,
  generateFeedback,
  generateStressFeedback,
} from "./helpers.js"

const Audio = mongoose.model("audios")
const Script = mongoose.model("Script")

export default (app) => {
app.post(
  "/api/audio",
  requireLogin,
  upload.single("audio"),
  async (req, res) => {
    try {
      console.log("📥 [audio] request received");

      if (!req.file) {
        console.error("❌ [audio] No file in req.file");
        return res.status(400).send("No audio file provided");
      }

      console.log("📦 [audio] file received:", {
        mimetype: req.file.mimetype,
        size: req.file.size,
        originalname: req.file.originalname,
      });

      const { buffer, mimetype, originalname } = req.file;
      const { scriptId, lang } = req.body;

      // ================= SCRIPT LOAD =================
      let script;
      try {
        script = await Script.findById(scriptId);
        if (!script) {
          console.error("❌ [audio] Script not found:", scriptId);
          return res.status(404).send("Script not found");
        }
      } catch (err) {
        console.error("❌ [audio] Script DB error:", err);
        return res.status(500).send("Script lookup failed");
      }

      console.log("📄 [audio] script loaded:", script._id);

      // ================= TRANSCRIPTION =================
      let transcriptionResult;
      try {
        transcriptionResult = await transcribeAudio(
          buffer,
          mimetype,
          originalname,
        );
      } catch (err) {
        console.error("❌ [audio] transcription failed:", err);
        return res.status(500).send("Transcription failed");
      }

      const transcriptText = transcriptionResult.text;
      const wordsWithTimings = transcriptionResult.words;

      console.log("📝 [audio] transcript:", transcriptText);

      // ================= WAV CONVERSION =================
      let wavBuffer;
      try {
        wavBuffer = await convertWebmToWav(buffer);
      } catch (err) {
        console.error("❌ [audio] WAV conversion failed:", err);
        return res.status(500).send("Audio conversion failed");
      }

      console.log("🔄 [audio] WAV conversion OK");

      // ================= STRESS ENGINE =================
      let stressResult;
      try {
        const payload = buildStressRequest({
          scriptText: script.sentence,
          audioBuffer: wavBuffer,
          elevenLabs: transcriptionResult.raw,
        });

        stressResult = await analyzeAudioStress(payload);
      } catch (err) {
        console.error("❌ [audio] stress engine failed:", err);
        return res.status(500).send("Stress analysis failed");
      }

      console.log("🧠 [audio] stress analysis OK");

      const stressFeedback = generateStressFeedback(stressResult, lang);

      // ================= TEXT FEEDBACK =================
      const feedback = generateFeedback(
        lang,
        compareWords(
          normalize(script.sentence).split(" "),
          normalize(transcriptText).split(" "),
        ),
        transcriptText,
      );

      // ================= STORAGE =================
      const s3Key = `audios/${req.user.id}/${Date.now()}-${originalname}`;

      try {
        await uploadFile(buffer, s3Key, mimetype);
      } catch (err) {
        console.error("❌ [audio] S3 upload failed:", err);
        return res.status(500).send("Upload failed");
      }

      console.log("☁️ [audio] uploaded to S3:", s3Key);

      // ================= DB SAVE =================
      const audio = await new Audio({
        _user: req.user.id,
        _script: scriptId,
        s3Key,
        mimeType: mimetype,
        transcript: transcriptText,
        feedback,
         stressFeedback,
      }).save();

      console.log("💾 [audio] saved to DB:", audio._id);

      res.send(audio);
    } catch (err) {
      console.error("🔥 [audio] UNHANDLED ERROR:", err);
      res.status(500).send("Audio upload failed");
    }
  },
);

  function findAudiosKeys(ids) {
    return new Promise((resolve, reject) => {
      Audio.find({ _id: { $in: ids } }, { s3Key: 1 }).exec((err, docs) => {
        if (err) reject(err)
        else resolve(docs)
      })
    })
  }

  app.delete("/api/user_audios/delete", async (req, res) => {
    const idsToDelete = req.body.idsToDelete.map((id) =>
      mongoose.Types.ObjectId(id),
    )

    try {
      const s3Keys = await findAudiosKeys(idsToDelete)

      await deleteSeveralAudios(s3Keys)
      const result = await Audio.deleteMany({ _id: { $in: idsToDelete } })

      res.send(result)
    } catch (err) {
      log(err)
      res.send("Failed to delete audios")
    }
  })

  app.get("/api/user_audios", requireLogin, async (req, res) => {
    try {
      log("GET /api/user_audios")

      const audios = await Audio.find({ _user: req.user.id }).populate(
        "_script",
        //  path: "_script",
        //  select: "sentence",
      )

      res.send(audios)
    } catch (err) {
      error(err)
      res.status(500).send("Failed to fetch audios")
    }
  })

  app.get("/api/audio-url/:id", requireLogin, async (req, res) => {
    try {
      const audio = await Audio.findById(req.params.id)

      if (!audio) {
        return res.status(404).json({ error: "Audio not found" })
      }

      if (audio._user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      const url = await getObjectSignedUrl(audio.s3Key)
      res.json({ url })
    } catch (err) {
      error(err)
      res.status(500).json({ error: "Failed to generate URL" })
    }
  })
}
