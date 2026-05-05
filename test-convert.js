import fs from "fs";
import { convertWebmToWav } from "./services/convertWebmToWav.js";

const webm = fs.readFileSync("./test.webm");

const wav = await convertWebmToWav(webm);

console.log("WAV size:", wav.length);
console.log("Header:", wav.slice(0, 12));