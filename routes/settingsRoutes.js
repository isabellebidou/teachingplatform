import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";

export default (app) => {
  const User = mongoose.model("users");

  app.post("/api/settings", requireLogin, async (req, res) => {
    try {
      const { language } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { language },
        { new: true } // return updated user
      );

      res.send(updatedUser);
} catch (err) {
  res.status(422).send(err);
}
  });
};