import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import requireAdminAccess from "../middlewares/requireAdminAccess.js";

export default (app) => {
  const User = mongoose.model("users");

  app.get("/api/users_all", requireLogin, requireAdminAccess, async (req, res) => {
    try {
      const users = await User.aggregate([
        {
          $lookup: {
            from: "readings",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_user", "$$userId"] },
                },
              },
            ],
            as: "readings",
          },
        },
        {
          $addFields: {
            hasUnattendedFeedback: {
              $size: {
                $filter: {
                  input: "$readings",
                  cond: { $eq: ["$$this.dateCompleted", null] },
                },
              },
            },
          },
        },
        {
          $sort: {
            hasUnattendedReading: -1,
          },
        },
      ]);

      res.send(users);

    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/users_allold", requireLogin, requireAdminAccess, async (req, res) => {
    try {
      const users = await User.aggregate([
        {
          $lookup: {
            from: "userdatas",
            let: { userId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_user", "$$userId"] },
                },
              },
            ],
            as: "data",
          },
        },
        {
          $sort: {
            "data.name": 1,
          },
        },
      ]);

      res.send(users);

    } catch (err) {
      res.status(500).send(err);
    }
  });
};