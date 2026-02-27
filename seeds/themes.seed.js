import mongoose from "mongoose";
import keys from "../config/keys.js";
import Theme from "../models/Theme.js";

import {
  themesA1,
  themesA2,
  themesB1
} from "./data/themes.data.js";

await mongoose.connect(keys.mongoURI);

const themes = [
  ...themesA1.map(name => ({ name, level: "A1" })),
  ...themesA2.map(name => ({ name, level: "A2" })),
  ...themesB1.map(name => ({ name, level: "B1" }))
];

await Theme.deleteMany({});
await Theme.insertMany(themes);

console.log("✅ Themes seeded");
process.exit();