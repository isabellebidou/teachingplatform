

const keys = require("../config/keys");
const log =  require("../services/utils").log;


async function transcribeAudio(buffer, mimetype, filename) {
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

  return response.json(); // contains transcription text
}

module.exports = { transcribeAudio };