import mongoose from "mongoose";
import axios from "axios";
import keys from "../config/keys.js";
import { logError } from "../services/utils.js";

export default (app) => {
  app.get("/health", async (req, res) => {
    try {
      let dbStatus = "disconnected";
      const dbState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected

      if (dbState === 1) dbStatus = "connected";

      const health = {
        status: dbState === 1 ? "ok" : "error",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        services: {
          database: dbStatus,
          auth: "unknown",
          googleOAuth: "unknown",
        },
      };

      // ----- DB check -----
      if (dbState === 1 && mongoose.connection.db) {
        try {
          await mongoose.connection.db.admin().ping();
          health.services.database = "connected";
        } catch (err) {
          health.services.database = "error";
          health.status = "error";
          health.error = err.message;
        }
      }

      // ----- Session/Auth check -----
      try {
        health.services.auth = req.user ? "authenticated" : "anonymous";
      } catch (err) {
        health.services.auth = "error";
        health.status = "error";
        health.authError = err.message;
      }

      // ----- Google OAuth check -----
      if (process.env.NODE_ENV === "production" && keys.callBack) {
        try {
          const callbackUrl = `${keys.callBack}/auth/google/callback`;

          const response = await axios.get(callbackUrl, {
            validateStatus: () => true, // prevent throw
          });

          health.services.googleOAuth =
            response.status >= 200 && response.status < 400
              ? "reachable"
              : `error (${response.status})`;

        } catch (err) {
          health.services.googleOAuth = "error";
          health.googleOAuthError = err.message;
          health.status = "error";
        }
      } else {
        health.services.googleOAuth = "skipped in dev";
      }

      const statusCode = health.status === "ok" ? 200 : 500;
      res.status(statusCode).json(health);

    } catch (err) {
      logError("Health route crashed:", err);

      res.status(500).json({
        status: "error",
        message: "Health check failed",
      });
    }
  });
};