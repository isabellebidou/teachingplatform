import mongoose from "mongoose";

const Script = mongoose.model("Script");

export default (app) => {
  app.get("/api/scripts", async (req, res) => {
    try {
      const scripts = await Script.find();
      res.send(scripts);
    } catch (err) {
      res.status(500).send("Failed to fetch scripts");
    }
  });
};