import requireLogin from "../middlewares/requireLogin.js";
import requireAdminAccess from "../middlewares/requireAdminAccess.js";
import mongoose from "mongoose";
import { logError } from "../services/utils.js";

export default (app) => {
  const Link = mongoose.model("links");

  // GET all links
  app.get("/api/links", async (req, res) => {
    try {
      const links = await Link.find().sort({ name: 1 });
      res.send(links);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch links");
    }
  });

  // CREATE link
  app.post(
    "/api/link",
    requireLogin,
    requireAdminAccess,
    async (req, res) => {
      try {
        const { name, url, type, comment } = req.body;

        const link = new Link({
          name,
          url,
          type,
          comment,
        });

        await link.save();

        res.send(link);

      } catch (err) {
        logError(err);
        res.status(422).send(err);
      }
    }
  );
};