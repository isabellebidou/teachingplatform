const mongoose = require("mongoose");
const axios = require("axios");
module.exports = (app) => {
 // npm install axios if not already

app.get("/health", async (req, res) => {
  let dbStatus = "disconnected";
  let dbState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected

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
  if (dbState === 1) {
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

  // ----- Quick Google OAuth callback check -----
  if (process.env.NODE_ENV === "production") {
    try {
      // Make a GET request to your deployed callback URL
      const callbackUrl = keys.callBack + "/auth/google/callback";
      const response = await axios.get(callbackUrl, { validateStatus: false });
      // Expecting a 200–399 response (not an actual login)
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
    // skip OAuth check in dev
    health.services.googleOAuth = "skipped in dev";
  }

  const statusCode = health.status === "ok" ? 200 : 500;
  res.status(statusCode).json(health);
});

};