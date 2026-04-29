import React, { useState } from "react"
import axios from "axios"
import colour from "sharp/lib/colour"
import { useTranslation } from "react-i18next";

function AudioList({
  audios = [],
  onDeleteSuccess,
  onSelectAudio,
  selectedAudioId,
  selectedAudioUrl,
}) {
  const [selectedAudios, setSelectedAudios] = useState([])
  const [editMode, setEditMode] = useState(false)
  const { t } = useTranslation("audio")

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setSelectedAudios([])
  }

  const deleteAudios = async () => {
    await axios.delete("/api/user_audios/delete", {
      data: { idsToDelete: selectedAudios },
    })

    setSelectedAudios([])
    onDeleteSuccess() // 🔔 notify parent
  }

  const handleSelected = (id) => {
    setSelectedAudios((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  return (
    <section>
      <h2>{t("h2Audios")}</h2>
      <div className="grid-container">
        {audios.length === 0 && <p>{t("pRecordYourself")}</p>}

        {audios.map((audio, i) => (
          <div
            key={audio._id}
            className={`audiothumbnail ${audio._id === selectedAudioId ? "selected" : ""}`}
            onClick={() => onSelectAudio(audio)}
          >
            {editMode && (
              <input
                type="checkbox"
                checked={selectedAudios.includes(audio._id)}
                onChange={() => handleSelected(audio._id)}
              />
            )}

            <p>
              audio #{i + 1}: "{audio._script?.sentence}" {t("pRecordedOn")}{" "}
              {new Date(audio.createdAt).toLocaleDateString()}
            </p>
            {audio.transcript && <p>{t("pTranscript")}"{audio.transcript}"</p>}
            {audio.feedback && audio.feedback.length > 0 && (
              <div>
                <p>
                  <strong>Feedback:</strong>
                </p>
                <ul>
                  {audio.feedback.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                 {audio._id === selectedAudioId && selectedAudioUrl && (
                  <audio
                    controls
                    className="audioCtrls"
                    src={selectedAudioUrl}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {audios.length > 0 && (
        <>
          <button  className="largeBtn" onClick={toggleEditMode}>
            {editMode ? t("btnDisableEdit") : t("btnEnableEdit")}
          </button>

          {editMode && <button onClick={deleteAudios}>{t("btnDelete")}</button>}
        </>
      )}
    </section>
  )
}

export default AudioList
