const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  const User = mongoose.model("users");

  app.post("/api/settings", requireLogin, async (req, res) => {
    console.log("/api/settings",req.body)
    try {
      const { language } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { language },
        { new: true } // return updated user
      );

      res.send(updatedUser);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};