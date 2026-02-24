// seeds/levels.seed.js
import mongoose from "mongoose";
import keys from "../config/keys.js";
import Level from "../models/Level.js";

await mongoose.connect(keys.mongoURI);

const levels = [
  {
    cefr: "A1",
    frenchLabels: ["6e", "5e"],
    description: "Beginner user: basic sentences, everyday vocabulary"
  },
  {
    cefr: "A2",
    frenchLabels: ["4e"],
    description: "Elementary user: simple narratives, familiar topics"
  },
  {
    cefr: "B1",
    frenchLabels: ["3e", "Seconde"],
    description: "Independent user: opinions, past events, projects"
  },
  {
    cefr: "B2",
    frenchLabels: ["Première", "Terminale"],
    description: "Upper-intermediate: abstract topics, argumentation"
  },
  {
    cefr: "C1",
    frenchLabels: ["Prépa", "Ecricome"],
    description: "Advanced: complex texts, nuance, precision"
  },
  {
    cefr: "C2",
    frenchLabels: ["Prépa avancée"],
    description: "Mastery: near-native comprehension and expression"
  }
];

await Level.deleteMany({});
await Level.insertMany(levels);

console.log("✅ Levels seeded");
process.exit();