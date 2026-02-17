import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUserAudios } from "../actions";
import AudioRecorder from "./audios/AudioRecorder";
import AudioList from "./audios/AudioList";

function UserDashboard({ audios = [], fetchUserAudios }) {
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔄 Fetch audios on mount AND when refreshKey changes
  useEffect(() => {
    fetchUserAudios();
  }, [fetchUserAudios, refreshKey]);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className="page">
        <AudioRecorder onUploadSuccess={triggerRefresh} />
        <AudioList
          audios={audios}
          onDeleteSuccess={triggerRefresh}
        />
      </div>
    </>
  );
}

function mapStateToProps(state) {
    console.log("mapStateToProps audios:", state.audios);
  return { audios: state.audios };
}

export default connect(mapStateToProps, { fetchUserAudios })(UserDashboard);
