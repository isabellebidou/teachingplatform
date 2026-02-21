import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUserAudios } from "../actions";
import { fetchScripts } from "../actions";
import AudioRecorder from "./audios/AudioRecorder";
import AudioList from "./audios/AudioList";
import SelectSentence from "./SelectSentence";

function UserDashboard({ audios = [],  scripts = [],fetchUserAudios ,fetchScripts}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedScript, setSelectedScript] = useState(null);

  // 🔄 Fetch audios on mount AND when refreshKey changes
  useEffect(() => {
    fetchUserAudios();
  }, [fetchUserAudios, refreshKey]);

  useEffect(() => {
    fetchScripts();
  }, [fetchScripts]);

  useEffect(() => {
    if (scripts.length > 0) {
      setSelectedScript(scripts[0]);
    }
  }, [scripts]);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className="page">
        <SelectSentence
        scripts={scripts}
        selectedScript={selectedScript}
        onChange={setSelectedScript}
      />

        <AudioRecorder 
          script={selectedScript} 
          onUploadSuccess={triggerRefresh} />
        <AudioList
          audios={audios}
          onDeleteSuccess={triggerRefresh}
        />
      </div>
    </>
  );
}

function mapStateToProps(state) {
    console.log("mapStateToProps scripts:", state.scripts);
  
  return { audios: state.audios , scripts: state.scripts};
}

export default connect(mapStateToProps, { fetchUserAudios,fetchScripts })(UserDashboard);
