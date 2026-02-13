import React from "react";

export default function AudioPlayer({ src }) {
  if (!src) return null;

  return (
    <audio
      controls
      preload="metadata"
      style={{ width: "100%" }}
    >
      <source src={src} type="audio/webm" />
      <source src={src} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}
