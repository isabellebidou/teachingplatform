import React, { useState } from "react"
import axios from "axios"
//import colour from "sharp/lib/colour"
import { useTranslation } from "react-i18next"

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

  const renderScriptWithHighlights = (audio) => {
    const scriptText = audio._script?.sentence || audio.transcript || ""
    const rawStressFeedback = audio.stressFeedback
    const stressLines = Array.isArray(rawStressFeedback)
      ? rawStressFeedback
      : typeof rawStressFeedback === "string"
        ? rawStressFeedback.split(/\n+/).filter(Boolean)
        : []

    if (!scriptText) {
      return null
    }

    const wordsToHighlight = stressLines.flatMap((line) => {
      if (typeof line !== "string") {
        return []
      }

      const beforeArrow = line.split("→")[0] || ""
      const cleaned = beforeArrow.replace(/\([^)]*\)/g, "").trim()
      const tokens = cleaned.split(/\s+/).filter(Boolean)
      const targetWord = tokens[tokens.length - 1]

      return targetWord ? [targetWord.toLowerCase()] : []
    })

    if (wordsToHighlight.length === 0) {
      return <span className="stressScriptPreview">{scriptText}</span>
    }

    const sentenceParts = scriptText.split(/(\s+)/).map((part) => ({
      text: part,
      normalized: part.toLowerCase().replace(/[^a-z']/g, ""),
    }))

    const highlightedIndexes = []
    let sentenceCursor = 0

    wordsToHighlight.forEach((word) => {
      let matched = false

      for (
        let index = sentenceCursor;
        index < sentenceParts.length;
        index += 1
      ) {
        const part = sentenceParts[index]
        if (!part.normalized) continue

        if (part.normalized === word) {
          highlightedIndexes.push(index)
          sentenceCursor = index + 1
          matched = true
          break
        }
      }

      if (!matched) {
        const fallbackIndex = sentenceParts.findIndex(
          (part) =>
            part.normalized === word &&
            !highlightedIndexes.includes(sentenceParts.indexOf(part)),
        )

        if (fallbackIndex >= 0) {
          highlightedIndexes.push(fallbackIndex)
        }
      }
    })

    return (
      <p className="stressScriptPreview">
        {sentenceParts.map((part, index) => {
          const isHighlighted = highlightedIndexes.includes(index)
          return (
            <span
              key={`${index}-${part.text}`}
              className={isHighlighted ? "stressMismatchWord" : undefined}
            >
              {part.text}
            </span>
          )
        })}
      </p>
    )
  }

  return (
    <section className="audioList">
      <fieldset>
        <legend>{t("h2Audios")}</legend>
        <div className="grid-container">
          {audios.length === 0 && <p>{t("pRecordYourself")}</p>}

          {audios.map((audio, i) => (
            <div
              key={audio._id}
              className={`audiothumbnail ${audio._id === selectedAudioId ? "selected" : ""}`}
              onClick={() => onSelectAudio(audio)}
            >
              <div className="audioDetails">
                <p>
                  audio #{i + 1}: {t("pRecordedOn")}{" "}
                  {new Date(audio.createdAt).toLocaleDateString()} -{" "}
                  {new Date(audio.createdAt).toLocaleTimeString()}
                  <br></br>
                  {audio._script?.visual && (
                    <span className="stressVisual">
                      {audio._script?.visual}
                    </span>
                  )}
                </p>
                {audio.transcript && (
                  <span>
                    {t("pTranscript")}"{audio.transcript}"
                  </span>
                )}

                {audio.feedback && audio.feedback.length > 0 && (
                  <div>
                    <h3>Feedback:</h3>

                    <ul>
                      {audio.feedback.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {audio.feedback && audio.feedback.length > 0 && (
                  <>
                    {renderScriptWithHighlights(audio)}
                    <ul>
                      {audio.stressFeedback.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              {audio._id === selectedAudioId && selectedAudioUrl && (
                <audio controls src={selectedAudioUrl} />
              )}

              {editMode && (
                <input
                  className="audioCheckbox"
                  type="checkbox"
                  checked={selectedAudios.includes(audio._id)}
                  onChange={() => handleSelected(audio._id)}
                />
              )}
            </div>
          ))}
        </div>
        {audios.length > 0 && (
          <>
            <button className="largeBtn" onClick={toggleEditMode}>
              {editMode ? t("btnDisableEdit") : t("btnEnableEdit")}
            </button>

            {editMode && (
              <button className="deletebutton" onClick={deleteAudios}>
                {t("btnDelete")}
              </button>
            )}
          </>
        )}
      </fieldset>
    </section>
  )
}

export default AudioList
