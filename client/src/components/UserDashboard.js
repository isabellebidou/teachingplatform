import React from "react";
import AudioList from "./audios/AudioList";
import AudioRecorder from "./audios/AudioRecorder";

const UserDashboard = () => {
  return (
    <div className="container">
      <fieldset>
        <legend>New recording</legend>
        <AudioRecorder />
      </fieldset>

      <fieldset>
        <legend>Your recordings</legend>
        <AudioList />
      </fieldset>
    </div>
  );
};

export default UserDashboard;
