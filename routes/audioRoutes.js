import mongoose from "mongoose"
import requireLogin from "../middlewares/requireLogin.js"
import { transcribeAudio } from "../services/elevenLabsTranscription.js"
import fs from "fs"
import { convertWebmToWav } from "../services/convertWebmToWav.js"
import { analyzeAudioStress } from "../stress_engine/index.js"
import { safeAnalyzeAudioStress } from "../stress_engine/safe.js"
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
import keys from "../config/keys.js"

const Audio = mongoose.model("audios")
const Script = mongoose.model("Script")
const User = mongoose.model("users")
const stress = true
const vowelQuality = false //set to true to enable vowel quality feedback

export default (app) => {
  app.post(
    "/api/audio",
    requireLogin,
    upload.single("audio"),
    async (req, res) => {
      try {
        // console.log("📥 [audio] request received")

        if (!req.file) {
          console.error("❌ [audio] No file in req.file")
          return res.status(400).send("No audio file provided")
        }

     /*   console.log("📦 [audio] file received:", {
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalname: req.file.originalname,
        })*/
        if (req.user.role !== "admin" && req.file.size > 250000) {
          return res.status(403).json({
            message: "out of capacity",
          })
        }

        const { buffer, mimetype, originalname } = req.file
        const { scriptId, lang } = req.body
        const shouldGenerateStressFeedback =
          req.body.stress === undefined
            ? stress
            : req.body.stress === true || req.body.stress === "true"
        const shouldGenerateVowelFeedback =
          req.body.vowel === undefined
            ? vowelQuality
            : req.body.vowel === true || req.body.vowel === "true"

        // ================= SCRIPT LOAD =================
        let script
        try {
          script = await Script.findById(scriptId)
          if (!script) {
            // console.error("❌ [audio] Script not found:", scriptId);
            return res.status(404).send("Script not found")
          }
        } catch (err) {
          // console.error("❌ [audio] Script DB error:", err);
          return res.status(500).send("Script lookup failed")
        }

        //  console.log("📄 [audio] script loaded:", script._id);

        // ================= TRANSCRIPTION =================
        let transcriptionResult
        try {
          transcriptionResult = await transcribeAudio(
            buffer,
            mimetype,
            originalname,
          )
        } catch (err) {
          //   console.error("❌ [audio] transcription failed:", err);
          return res.status(500).send("Transcription failed")
        }
       // console.log("transcriptionResult:", transcriptionResult)
        const transcriptText = transcriptionResult.text
        const wordsWithTimings = transcriptionResult.words

        //      console.log("📝 [audio] transcript:", transcriptText)

        // ================= TEXT FEEDBACK =================
        const feedback = generateFeedback(
          lang,
          compareWords(
            normalize(script.sentence).split(" "),
            normalize(transcriptText).split(" "),
          ),
          transcriptText,
        )

        // ================= STORAGE =================
        const s3Key = `audios/${req.user.id}/${Date.now()}-${originalname}`

        try {
          await uploadFile(buffer, s3Key, mimetype)
        } catch (err) {
          console.error("❌ [audio] S3 upload failed:", err)
          return res.status(500).send("Upload failed")
        }

        //     console.log("☁️ [audio] uploaded to S3:", s3Key)

        // ================= DB SAVE =================
        const audioDoc = await new Audio({
          _user: req.user.id,
          _script: scriptId,
          s3Key,
          mimeType: mimetype,
          transcript: transcriptText,
          feedback,
        }).save()

        // ================= WAV CONVERSION =================
        let wavBuffer
        try {
          wavBuffer = await convertWebmToWav(buffer)
        } catch (err) {
          console.error("❌ [audio] WAV conversion failed:", err)
          return []
        }

        //   console.log("🔄 [audio] WAV conversion OK")

        // ================= STRESS FEEDBACK =================
        let stressFeedbackResult = []
        if (shouldGenerateStressFeedback) {
          try {
            stressFeedbackResult = await buildStressFeedback({
              wavBuffer,
              script,
              transcriptionResult,
              lang,
            })
            /*console.log(
              "🧠 [audio] stress feedback generated:",
              stressFeedbackResult,
            )*/

            audioDoc.stressFeedback = stressFeedbackResult
            await audioDoc.save()
    //        console.log("🧠 [audio] stress analysis OK")
          } catch (err) {
            console.error("❌ [audio] stress engine failed:", err)
          }
        }

        //   console.log("💾 [audio] saved to DB:", audioDoc._id)

        // ================= vowel quality feedback =================
        let vowelQualityFeedback = []
        //if (shouldGenerateVowelFeedback && script.targetVowels && script.targetVowels.length > 0) {
        if (shouldGenerateVowelFeedback) {
          try {
            vowelQualityFeedback = await analyzeVowelQuality({
              wavBuffer,
              transcriptionResult,
              script,
            })
           /* console.log(
              "🧠 [audio] vowel quality feedback generated:",
              vowelQualityFeedback,
            )*/
            audioDoc.vowelQualityFeedback = vowelQualityFeedback
            await audioDoc.save()
           // console.log("🧠 [audio] vowel quality analysis OK")
          } catch (err) {
            console.error("❌ [audio] vowel quality failed:", err)
          }
        }

        await User.findByIdAndUpdate(req.user.id, {
          $inc: { numberOfRecordings: 1 },
        })

        res.send(audioDoc)
      } catch (err) {
        console.error("🔥 [audio] UNHANDLED ERROR:", err)
        res.status(500).send("Audio upload failed")
      }
    },
  )

  function findAudiosKeys(ids) {
    return new Promise((resolve, reject) => {
      Audio.find({ _id: { $in: ids } }, { s3Key: 1 }).exec((err, docs) => {
        if (err) reject(err)
        else resolve(docs)
      })
    })
  }
  async function buildStressFeedback({
    wavBuffer,
    script,
    transcriptionResult,
    lang,
  }) {
    // ================= STRESS ENGINE =================
    let stressResult
    try {
      const payload = buildStressRequest({
        scriptText: script.sentence,
        audioBuffer: wavBuffer,
        elevenLabs: transcriptionResult.raw,
        partsOfSpeech: script.partsOfSpeech,
      })

      stressResult = await analyzeAudioStress(payload)
    } catch (err) {
      console.error("❌ [audio] stress engine failed:", err)
      return []
    }

   // console.log("🧠 [audio] stress analysis OK")

    return generateStressFeedback(stressResult, lang)
  }
  /*async function buildVowelQualityFeedback({
    wavBuffer,
    script,
    transcriptionResult,
    lang,
  }) {
    // =============================== tbd
    let vowelQualityResult
    try {
      const payload = buildVowelQualityRequest({
        // =============================== tbd
      })

      vowelQualityResult = await analyzeVowelQuality(payload)
    } catch (err) {
      console.error("❌ [audio] vowelQuality failed:", err)
      return []
    }
  }*/
  function buildVowelTargets(script, transcriptionResult) {
    return script.targetVowels
      .map((target, index) => {
        const transcriptionWord = transcriptionResult.words.find(
          ({ word }) => word.toLowerCase() === target.word.toLowerCase(),
        )

        if (!transcriptionWord) {
          return null
        }

        return {
          id: `${target.word}-${index + 1}`,
          word: target.word,
          vowel: target.vowel,
          targetVowel: target.targetVowel,
          wordStartMs: transcriptionWord.startMs,
          wordEndMs: transcriptionWord.endMs,
        }
      })
      .filter(Boolean)
  }
  async function analyzeVowelQuality({
    wavBuffer,
    transcriptionResult,
    script,
  }) {
    const targets = buildVowelTargets(script, transcriptionResult)

    if (targets.length === 0) {
      return { results: [] }
    }

    const form = new FormData()

    form.append(
      "audio",
      new Blob([wavBuffer], { type: "audio/wav" }),
      "recording.wav",
    )

    form.append("targets", JSON.stringify(targets))
   
    console.log("🧠 [audio] sending request to :", `${keys.VOWEL_QUALITY_URL}/analyze`)

    const response = await fetch(`${keys.VOWEL_QUALITY_URL}/analyze`, {
      method: "POST",
      body: form,
    })

    if (!response.ok) {
      throw new Error(`Vowel quality service failed: ${response.status}`)
    }

    return response.json()
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
