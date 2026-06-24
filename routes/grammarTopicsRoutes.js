import mongoose from "mongoose"
import requireLogin from "../middlewares/requireLogin.js"
import { logError as error, log } from "../services/utils.js"

export default (app) => {
  const GrammarTopic = mongoose.model("GrammarTopic")
  app.put("/api/grammarTopics/:id", async (req, res) => {
    /*console.log("PUT HIT")
    console.log(req.params.id)
    console.log("BODY:")
    console.log(JSON.stringify(req.body, null, 2))*/
    try {
      const update = {
        name: req.body.name,
        level: req.body.level,
        rule: req.body.rule,
        allowedAnswers: req.body.allowedAnswers,
        allowedIncorrectAnswers: req.body.allowedIncorrectAnswers,
        suggestions: req.body.suggestions,
        numberOfOptions: req.body.numberOfOptions,
        examples: req.body.examples,
        commonErrors: req.body.commonErrors,
        detail: req.body.detail,
        active: req.body.active,
        data: req.body.data,
      }
      /*console.log("UPDATE:")
      console.log(JSON.stringify(update, null, 2))*/

      const topic = await GrammarTopic.findByIdAndUpdate(
        req.params.id,
        update,
        {
          new: true,
          runValidators: true,
        },
      )

      if (!topic) {
        return res.status(404).json({
          message: "Topic not found",
        })
      }
      /*console.log("UPDATED DOC:")
      console.log(topic)*/

      res.json(topic)
    } catch (err) {
      res.status(400).json({
        message: err.message,
      })
    }
  })
  app.get("/api/grammarTopics", requireLogin, async (req, res) => {
    try {
      log(
        "app.get   /api/grammarTopics from grammarTopicsRoutes level: " +
          req.user.level,
      )
      const grammarTopics = await GrammarTopic.find({ level: req.user.level })

      res.send(grammarTopics)
      //console.log("grammarTopics", grammarTopics.length)
    } catch (err) {
      error(err)
      res.status(500).send("Failed to fetch grammarTopics")
    }
  })
  app.get("/api/grammarTopics_all", async (req, res) => {
    //console.log(" get grammarTopics_all")
    try {
      log("app.get   /api/grammarTopics_all from grammarTopicsRoutes ")

      const grammarTopics =
        req.user?.type === "admin"
          ? await GrammarTopic.find()
          : await GrammarTopic.find({ active: true })

      res.send(grammarTopics)
    } catch (err) {
      error(err)
      res.status(500).send("Failed to fetch grammarTopics")
    }
  })
}
