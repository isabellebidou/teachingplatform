import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin.js';
import {logError as error, log} from "../services/utils.js";




export default (app) => {

  const GrammarTopic = mongoose.model("GrammarTopic")
  app.get("/api/grammarTopics", requireLogin, async (req, res) => {

    try {
      log("app.get   /api/grammarTopics from grammarTopicsRoutes level: "+ req.user.level)
      const grammarTopics = await GrammarTopic
        .find({ level: req.user.level });

      res.send(grammarTopics);
    } catch (err) {
      error(err);
      res.status(500).send("Failed to fetch grammarTopics");
    }
  });
};