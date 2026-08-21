import mongoose from "mongoose";
import keys from "../config/keys.js";
import Faq from "../models/Faq.js";
import articles from "./data/articleSeed.js"; 
import Article from "../models/Article.js";



async function seed() {
  await mongoose.connect(keys.mongoURI);
  console.log("📦 First article:");
  console.log(JSON.stringify(articles[0], null, 2));


  console.log("🧹 Clearing old articles...");
  await Article.deleteMany({});

  console.log("🌱 Seeding new articles...");
  await Article.insertMany(articles);

  console.log(`✅ Inserted ${articles.length} articles`);
  process.exit();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});