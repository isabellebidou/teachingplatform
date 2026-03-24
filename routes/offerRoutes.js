import requireLogin from "../middlewares/requireLogin.js";
import requireAdminAccess from "../middlewares/requireAdminAccess.js";
import mongoose from "mongoose";
import { logError } from "../services/utils.js";

export default (app) => {
  const Offer = mongoose.model("offers");

  // GET all offers
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await Offer.find().sort({ name: 1 });
      res.send(offers);
    } catch (err) {
      logError(err);
      res.status(500).send("Failed to fetch offers");
    }
  });

  // CREATE offer
  app.post(
    "/api/offer",
    requireLogin,
    requireAdminAccess,
    async (req, res) => {
      try {
        const { name, description, price } = req.body;

        const offer = new Offer({
          name,
          description,
          price,
        });

        await offer.save();

        res.send(offer);

      } catch (err) {
        logError(err);
        res.status(422).send(err);
      }
    }
  );
};