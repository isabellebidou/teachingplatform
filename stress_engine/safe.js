// stress_engine/safe.js
import { analyzeAudioStress } from "./index.js";

export async function safeAnalyzeAudioStress(input) {
  try {
    return await analyzeAudioStress(input);
  } catch (err) {
    return {
      ok: false,
      error: "stress_engine_failed",
      message: err.message
    };
  }
}