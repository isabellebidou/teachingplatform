import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";

export default (app) => {
  const UserData = mongoose.model("userdata");

  app.get("/api/user_data", requireLogin, async (req, res) => {
    try {
      const userData = await UserData.find({ _user: req.user.id });
      res.send(userData);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/user_data/:id", requireLogin, async (req, res) => {
    try {
      const userData = await UserData.find({ _user: req.params.id });
      res.send(userData);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/user_data/name/:id", requireLogin, async (req, res) => {
    try {
      const userDataName = await UserData.findOne(
        { _user: req.params.id },
        "name"
      );
      res.send(userDataName);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/userdata", requireLogin, async (req, res) => {
    try {
      const { fname, lname, dob } = req.body;

      const userdata = new UserData({
        fname,
        lname,
        dob,
        _user: req.user.id,
      });

      await userdata.save();
      res.send(userdata);

    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/userdata/edit", requireLogin, async (req, res) => {
    try {
      const { fname, lname, dob } = req.body;

      const updated = await UserData.updateOne(
        { _user: req.user.id },
        {
          $set: { fname, lname, dob },
        }
      );

      res.send(updated);

    } catch (err) {
      res.status(422).send(err);
    }
  });
};
