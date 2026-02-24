// seeds/grammar.seed.js

import mongoose from "mongoose";
import keys from "../config/keys.js";
import GrammarTopic from "../models/GrammarTopic.js";

import {
  grammarA1,
  grammarA2,
  grammarB1
} from "./data/grammar.data.js";

(async () => {
  try {
    await mongoose.connect(keys.mongoURI);

    const grammarTopics = [
      ...grammarA1.map(name => ({
        name,
        level: "A1"
      })),
      ...grammarA2.map(name => ({
        name,
        level: "A2"
      })),
      ...grammarB1.map(name => ({
        name,
        level: "B1"
      }))
    ];

    // Clean insert (safe for dev / staging)
    await GrammarTopic.deleteMany({});
    await GrammarTopic.insertMany(grammarTopics);

    console.log("✅ Grammar topics seeded successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding grammar topics:", error);
    process.exit(1);
  }
})();