import mongoose from "mongoose";
import keys from "../config/keys.js";
import Faq from "../models/Faq.js";
import faqs from "./data/faqSeed.js"; 

//import scripts from "./data/scriptsWithTargetVowels.js"; // Import the scripts with target vowels

async function seed() {
  await mongoose.connect(keys.mongoURI);
  console.log("📦 First faq:");
  console.log(JSON.stringify(faqs[0], null, 2));


  console.log("🧹 Clearing old faq...");
  await Faq.deleteMany({});

  console.log("🌱 Seeding new faqs...");
  await Faq.insertMany(faqs);

  console.log(`✅ Inserted ${faqs.length} faqs`);
  process.exit();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});