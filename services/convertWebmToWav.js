import { execFile } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

export function convertWebmToWav(buffer) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.webm`);
    const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.wav`);

    fs.writeFileSync(inputPath, buffer);

    execFile(
      "ffmpeg",
      [
        "-i", inputPath,
        "-ar", "16000",   // sample rate (important for speech)
        "-ac", "1",       // mono
        "-f", "wav",
        outputPath
      ],
      (err) => {
        if (err) return reject(err);

        const wavBuffer = fs.readFileSync(outputPath);

        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        resolve(wavBuffer);
      }
    );
  });
}