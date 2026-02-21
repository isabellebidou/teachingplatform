import React, { useRef, useState } from "react";
import axios from "axios";

export default function AudioRecorder({ onUploadSuccess, script }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [uploading, setUploading] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioURL(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  /*async function handleSendRecording(blob) {
    await uploadRecording(blob);
    onUploadSuccess(); // 🔥 tell parent “something changed”
  }*/


  const uploadAudio = async () => {
    console.log('uploadAudio   from AudioRecorder.js')
    if (!audioBlob) return;

    const formData = new FormData();
    console.log(script._id)
    formData.append("audio", audioBlob,"recording.webm");
    formData.append("scriptId", script._id);

    try {
      setUploading(true);
      await axios.post("/api/audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAudioBlob(null);
      setAudioURL(null);

      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>

      {!isRecording && (
        <button onClick={startRecording}>🎙 Start recording</button>
      )}

      {isRecording && (
        <button onClick={stopRecording}>⏹ Stop recording</button>
      )}

      {audioURL && (
        <>
          <audio controls src={audioURL} />
          <br />
          <button onClick={uploadAudio} disabled={uploading}>
            {uploading ? "Uploading..." : "⬆ Upload"}
          </button>
        </>
      )}
    </div>
  );
}
