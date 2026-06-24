import React, { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"

export default function AudioRecorder({ onUploadSuccess, script }) {
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const auth = useSelector((state) => state.auth)
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [durationInSeconds, setDurationInSeconds] = useState(0)
  const { t, i18n } = useTranslation("audio")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"
  const MAX_UPLOAD_DURATION = 30 // seconds

  const recordingStartTimeRef = useRef(null)
  const timerRef = useRef(null)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const startRecording = async () => {
    recordingStartTimeRef.current = Date.now()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" })
      setAudioBlob(blob)
      setAudioURL(URL.createObjectURL(blob))
    }

    mediaRecorder.start()
    setElapsedSeconds(0)

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)
    setIsRecording(true)
  }
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setDurationInSeconds((Date.now() - recordingStartTimeRef.current) / 1000)
    clearInterval(timerRef.current)
    setIsRecording(false)
  }

  /*async function handleSendRecording(blob) {
    await uploadRecording(blob);
    onUploadSuccess(); 
  }*/

  const uploadAudio = async () => {
    console.log("uploadAudio   from AudioRecorder.js")
    if (!audioBlob) return
    if (!auth.type === "admin" && durationInSeconds > 30) {
      alert("Only recordings under 30 seconds can be uploaded.")
      return
    }

    const formData = new FormData()
    console.log(script._id)
    formData.append("audio", audioBlob, "recording.webm")
    formData.append("scriptId", script._id)
    formData.append("lang", lang)

    try {
      setUploading(true)
      await axios.post("/api/audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setAudioBlob(null)
      setAudioURL(null)

      if (onUploadSuccess) onUploadSuccess()
    } catch (err) {
      console.error("Upload failed", err)
    } finally {
      setUploading(false)
    }
  }
  const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${secs.toString().padStart(2, "0")}`
}

  return (
    <div id="audioCtrls">
      {!isRecording && (
        <button id="recordBtn" className="largeBtn" onClick={startRecording}>
          {t("btnRecord")}
        </button>
      )}

      {isRecording && (
        <>
          <button
            id="stopRecordBtn"
            className="largeBtn"
            onClick={stopRecording}
          >
            {t("btnStopRecord")}
          </button>
          <div className="recordingTimer">⏱ {formatTime(elapsedSeconds)}s</div>
        </>
      )}

      {audioURL && (
        <>
          <audio controls src={audioURL} />
          <br />
          <button
            className="largeBtn"
            onClick={uploadAudio}
            disabled={
              auth.type === "guest" ||
              (auth.type !== "admin" && durationInSeconds > MAX_UPLOAD_DURATION)
                ? true
                : uploading
            }
          >
            {uploading ? "Uploading..." : "⬆ Upload"}
          </button>
        </>
      )}
    </div>
  )
}
