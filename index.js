import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import keys from "./config/keys.js"; // must use export default
import bodyParser from "body-parser";
import enforce from "express-sslify";

import path from "path";
import { fileURLToPath } from "url";

// ------------------- ESM __dirname fix -------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------- Import models -------------------
import "./models/User.js";
import "./models/UserData.js";
import "./models/Reading.js";
import "./models/Document.js";
import "./models/Faq.js";
import "./models/Link.js";
import "./models/Offer.js";
import "./models/StarReview.js";
import "./models/Audio.js";
import "./models/Script.js";
import "./models/GrammarTopic.js";
import "./models/Theme.js";
import "./models/Level.js";
import "./models/Exercise.js";

// ------------------- Import services -------------------
import "./services/passport.js";
import "./services/elevenLabsTranscription.js";

// ------------------- Import routes -------------------
import healthRoutes from "./routes/healthRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import starReviewRoutes from "./routes/starReviewRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";
import grammarTopicsRoutes from "./routes/grammarTopicsRoutes.js";
import exerciceRoutes from "./routes/exerciceRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

// ------------------- Express app -------------------
const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(bodyParser.json());
app.set("trust proxy", 1);

// ------------------- HTTPS enforcement -------------------
if (isProduction) {
  app.enable("trust proxy");
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// ------------------- Cookie session -------------------
app.use(
  cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    secure: isProduction,
  })
);

// ------------------- Passport -------------------
app.use(passport.initialize());
app.use(passport.session());

// ------------------- Mount routes -------------------
[
  healthRoutes,
  feedbackRoutes,
  authRoutes,
  billingRoutes,
  readingRoutes,
  userDataRoutes,
  usersRoutes,
  faqRoutes,
  linkRoutes,
  offerRoutes,
  starReviewRoutes,
  audioRoutes,
  scriptRoutes,
  grammarTopicsRoutes,
  exerciceRoutes,
  settingsRoutes,
].forEach((route) => route(app));

// ------------------- Serve static React build -------------------
if (isProduction) {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// ------------------- MongoDB connection -------------------
mongoose.set("strictQuery", false);

const startDBAndServer = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected:", mongoose.connection.name);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    if (isProduction) process.exit(1);
  }
};

// ------------------- Start server -------------------
startDBAndServer();

export default app; // optional for testing