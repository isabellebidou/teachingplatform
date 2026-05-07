import mongoose from "mongoose";
import keys from "../config/keys.js";
import Script from "../models/Script.js";
import scripts from "./data/scripts.js"; 

async function seed() {
  await mongoose.connect(keys.mongoURI);

  console.log("🧹 Clearing old scripts...");
  await Script.deleteMany({});

  console.log("🌱 Seeding new scripts...");
  await Script.insertMany(scripts);

  console.log(`✅ Inserted ${scripts.length} scripts`);
  process.exit();
}

seed();