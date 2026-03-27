import passport from "passport";
import { logError } from "../services/utils.js";

export default (app) => {

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    prompt: 'select_account',
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    try {
      req.logout();
      res.redirect("/");
    } catch (err) {
      logError(err);
    }
  });

  app.get("/api/current_user", (req, res) => {
    try {
      res.send(req.user);
    } catch (err) {
      logError(err);
    }
  });
};