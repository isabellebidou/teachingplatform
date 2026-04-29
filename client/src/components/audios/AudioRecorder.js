import React, { useRef, useState } from "react";
import axios from "axios";
import { logError as error } from "../../utils/utils.js"
import { log } from "../../utils/utils.js";
import { useTranslation } from "react-i18next";


export default function AudioRecorder({ onUploadSuccess, script }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { t,i18n } = useTranslation("audio")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";
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
  log('uploadAudio   from AudioRecorder.js')
    if (!audioBlob) return;

    const formData = new FormData();
    log(script._id)
    formData.append("audio", audioBlob,"recording.webm");
    formData.append("scriptId", script._id);
    formData.append("lang", lang);

    try {
      setUploading(true);
      await axios.post("/api/audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAudioBlob(null);
      setAudioURL(null);

      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>

      {!isRecording && (
        <button className="largeBtn" onClick={startRecording}>{t("btnRecord")}</button>
      )}

      {isRecording && (
        <button className="largeBtn" onClick={stopRecording}>{t("btnStopRecord")}</button>
      )}

      {audioURL && (
        <>
          <audio controls src={audioURL} />
          <br />
          <button className="largeBtn" onClick={uploadAudio} disabled={uploading}>
            {uploading ? "Uploading..." : "⬆ Upload"}
          </button>
        </>
      )}
    </div>
  );
}
