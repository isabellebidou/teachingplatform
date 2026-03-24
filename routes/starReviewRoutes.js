import { logError } from "../services/utils.js";
import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";

export default (app) => {
  const StarReview = mongoose.model("starreviews");

  app.get("/api/starreviews", async (req, res) => {
    try {
      const starreviews = await StarReview.find();
      res.send(starreviews);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch reviews");
    }
  });

  app.post("/api/starreview", requireLogin, async (req, res) => {
    try {
      const { name, number, comment } = req.body;

      const starreview = new StarReview({
        name,
        number,
        comment,
        dateSent: Date.now(),
        _user: req.user.id,
      });

      await starreview.save();

      req.user.hasReviews = true;
      const user = await req.user.save();

      res.send(user);

    } catch (err) {
      logError(err);
      res.status(422).send(err);
    }
  });
};