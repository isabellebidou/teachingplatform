export function buildStressRequest({
  scriptText,
  audioBuffer,
  elevenLabs,
}) {
  return {
    expectedText: scriptText,
    audioBase64: toBase64Wav(audioBuffer),
    elevenLabs: normalizeElevenLabs(elevenLabs),
  };
}
function toBase64Wav(buffer) {
  return `data:audio/wav;base64,${buffer.toString("base64")}`;
}
function normalizeElevenLabs(data) {
  return {
    language_code: data.language_code,
    language_probability: data.language_probability,
    text: data.text,
    words: (data.words || [])
      .filter(w => w.type === "word")
      .map(w => ({
        text: cleanWord(w.text),
        start: w.start,
        end: w.end,
        type: w.type,
        speaker_id: w.speaker_id,
        logprob: w.logprob,
      })),
  };
}
function cleanWord(w) {
  return w.toLowerCase().replace(/[^\w']/g, "");
}