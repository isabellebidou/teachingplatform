const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const upload = require("../config/audioUpload");
const { uploadFile, deleteSeveralAudios, getObjectSignedUrl } = require("../services/s3");

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
    function findAudiosKeys(ids) {
    return new Promise((resolve, reject) => {
      Audio.find({ _id: { $in: ids } }, {  s3Key:1 })
        .exec(function (err, docs) {
          if (err) {
            reject(err); // Reject the promise with the error
          } else {
            resolve(docs); // Resolve the promise with the `docs` array
          }
        });
    });
  }
    app.delete("/api/user_audios/delete", async (req, res) => {
    const idsToDelete = req.body.idsToDelete.map((id) => mongoose.Types.ObjectId(id));
    try {
      const s3Keys = await findAudiosKeys(idsToDelete);
      
      deleteSeveralAudios(s3Keys);
      const result = await Audio.deleteMany({ _id: { $in: idsToDelete } });
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send("Failed to delete audios");
    }
  });
  

  /**
   * List user's audios (with signed URLs)
   * GET /api/user_audios
   */
  app.get("/api/user_audios", requireLogin, async (req, res) => {
    try {
      console.log("app.get   /api/user_audios from audioroutes")
      const audios = await Audio.find({ _user: req.user.id });

      for (let index = 0; index < audios.length; index++) {
        const element = audios[index];
        console.log(element._id);
        
      }

      let audiosWithUrls = [];
       audiosWithUrls= await Promise.all(
        audios.map(async (audio) => {
          const url = await getObjectSignedUrl(audio.s3Key);

          return {
            ...audio.toObject(),
            url
          };
        })
      );

      console.log(audiosWithUrls.length+ "   from end of app.get")
      res.send(audiosWithUrls);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch audios");
    }
  });


    app.get("/api/user_audioss", async (req, res) => {
    try {
      const audios = await Audio.find({ _user: req.params.id });
      const audioPromises = audios.map(async (audio) => {
        const url = await getObjectSignedUrl(audio.s3Key);
        //audio.imageUrl = path;
        return audio;
      });
      const audiosWithUrls = await Promise.all(audioPromises);
      res.send(audiosWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};
