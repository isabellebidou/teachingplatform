import { useState, useEffect } from "react";
import axios from "axios";
import { logError } from "../utils/utils";
import { connect } from "react-redux";
import { fetchUser } from "../actions";


function Settings({ visible, onClose, auth ,fetchUser}) {
  const [language, setLanguage] = useState("en");

  // Load user language when component opens
  useEffect(() => {
    if (auth?.language) {
      setLanguage(auth.language);
    }
  }, [auth]);

  const handleSubmit = async () => {
    try {
    console.log("handleSubmit",language)
      await axios.post("/api/settings", { language });
      await fetchUser();
      onClose(); // close modal after save
    } catch (error) {
      logError(error);
    }
  };

  if (!visible) return null;

  return (
    <div className="settings-overlay">
      <div className="content">

        <span className="close-btn" onClick={onClose}>×</span>

        <h2>Select your language</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>

        <button id= "settingsSubmitButton" onClick={handleSubmit}>
          Save
        </button>

      </div>
    </div>
  );
}

export default connect(null, { fetchUser })(Settings);