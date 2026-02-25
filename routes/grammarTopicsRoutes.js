const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const logError = require("../services/utils");
const GrammarTopic = mongoose.model("GrammarTopic");

module.exports = (app) => {

  app.get("/api/grammarTopics", requireLogin, async (req, res) => {
    try {
      console.log("app.get   /api/grammarTopics from grammarTopicsRoutes level: "+ req.user.level)
      const grammarTopics = await GrammarTopic
        .find({ level: req.user.level });

      res.send(grammarTopics);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch grammarTopics");
    }
  });
};