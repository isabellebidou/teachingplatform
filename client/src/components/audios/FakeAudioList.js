import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchUserAudios } from "../../actions";
import axios from "axios";
import AudioPlayer from "../AudioPlayer";

function AudioList({ audios, fetchUserAudios }) {

  // Run once when component mounts
  useEffect(() => {
    fetchUserAudios();
  }, [fetchUserAudios]);

  // Remove duplicates by audio id
  const uniqueAudios = Array.from(new Set(audios.map(a => a.id)))
                           .map(id => audios.find(a => a.id === id));

  return (
    <div>
      <h2>My Audios</h2>
      <ul>
        {uniqueAudios.map(audio => (
          <li key={audio.id}>
            {audio.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Take data from Redux store and pass as props
function mapStateToProps(state) {
  return { audios: state.audios };
}

// Connect the component to Redux
export default connect(mapStateToProps, { fetchUserAudios })(AudioList);
