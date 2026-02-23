import React, { useState } from "react";
import axios from "axios";
import AudioPlayer from "../AudioPlayer";

function AudioList({ audios = [], onDeleteSuccess }) {
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setSelectedAudios([]);
  };

  const deleteAudios = async () => {
    await axios.delete("/api/user_audios/delete", {
      data: { idsToDelete: selectedAudios }
    });

    setSelectedAudios([]);
    onDeleteSuccess(); // 🔔 notify parent
  };

  const handleSelected = (id) => {
    setSelectedAudios(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <section>
      <h2>Audios</h2>
      <div className="grid-container" >

        {audios.length === 0 && <p>You may record yourself</p>}

        {audios.map((audio, i) => (
          <div key={audio._id} className="photothumbnail">
            <AudioPlayer src={audio.url} />

            {editMode && (
              <input
                type="checkbox"
                checked={selectedAudios.includes(audio._id)}
                onChange={() => handleSelected(audio._id)}
              />
            )}

            <p>audio #{i + 1 }: "{audio._script?.sentence}" recorded on {new Date(audio.createdAt).toLocaleDateString()}</p>
            {audio.transcript && (
             <p>transcript:  "{audio.transcript}"</p>
             )}
            {audio.feedback && audio.feedback.length > 0 && (
              <div>
                <p><strong>Feedback:</strong></p>
                <ul>
                  {audio.feedback.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        ))}
        </div>
        {audios.length > 0 && (
          <>
            <button onClick={toggleEditMode}>
              {editMode ? "Disable edit" : "Enable edit"}
            </button>

            {editMode && (
              <button onClick={deleteAudios}>
                Delete selected
              </button>
            )}
          </>
        )}
      
    </section>
  );
}

export default AudioList;
