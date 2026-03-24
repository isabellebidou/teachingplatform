import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import requireAdminAccess from "../middlewares/requireAdminAccess.js";
import { logError } from "../services/utils.js";

export default (app) => {
  const Faq = mongoose.model("faqs");

  // GET all FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await Faq.find();
      res.send(faqs);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch FAQs");
    }
  });

  // CREATE FAQ
  app.post(
    "/api/faq",
    requireLogin,
    requireAdminAccess,
    async (req, res) => {
      try {
        const { question, answer } = req.body;

        const faq = new Faq({
          question,
          answer,
        });

        await faq.save();

        res.send(faq);

      } catch (err) {
        logError(err);
        res.status(422).send(err);
      }
    }
  );
};