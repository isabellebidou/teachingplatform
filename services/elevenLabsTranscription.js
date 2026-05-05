

import keys from "../config/keys.js";
import {log} from"../services/utils.js";


export async function transcribeAudio(buffer, mimetype, filename) {
  log("MIME:", mimetype);
  log("Filename:", filename);
  log("Buffer size:", buffer.length);
  const formData = new FormData();

  const blob = new Blob([buffer], { type: mimetype });

  formData.append("file", blob, filename); 
  formData.append("model_id", "scribe_v1");
   log(formData.body);


  const response = await fetch(
    "https://api.elevenlabs.io/v1/speech-to-text",
    {
      method: "POST",
      headers: {
        "xi-api-key": keys.elevenLabsSpeechToTextKey,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ElevenLabs error: ${errText}`);
  }

  const data = await response.json();

  return normalizeTranscription(data);
}
function normalizeTranscription(data) {
  const words = (data.words || [])
    .filter(w => w.type === "word")
    .map(w => ({
      word: cleanWord(w.text),
      startMs: Math.round(w.start * 1000),
      endMs: Math.round(w.end * 1000),
    }));

  return {
    text: data.text,
    words,
    raw: data,
  };
}
function cleanWord(word) {
  return word
    .toLowerCase()
    .replace(/[^\w']/g, ""); // removes punctuation like "voice!"
}

