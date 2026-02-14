import React from "react";

export default function AudioPlayer({ url, mimeType }) {
  return (
    <audio controls preload="metadata" style={{ width: "100%" }}>
      <source src={url} type={mimeType} />
      Your browser does not support the audio element.
    </audio>
  );
}
