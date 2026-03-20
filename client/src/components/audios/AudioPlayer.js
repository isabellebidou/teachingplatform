//import React from "react";
import { fetchUserAudioUrl } from "../../actions";

//old audioPlayer
/*export default function AudioPlayer({ url,audioId, mimeType }) {

    const fetchNewUrl = async () => {
      try {
        console.log("fetchNewUrl called on: ",audioId)
        const data = await dispatch(fetchUserAudioUrl(audioId));
        setUrl(data.url || data); // your thunk must return the URL
        // play once URL is set
        setTimeout(() => audioRef.current?.play(), 50);
      } catch (err) {
        console.error("Error fetching audio URL:", err);
      }
  };
  return (
    <audio controls 
    onError={async () => {
    const newUrl = await fetchNewUrl(audioId);
    setUrl(newUrl);
  }}
    preload="metadata" style={{ width: "100%" }}>
      <source src={url} type={mimeType} />
      
      Your browser does not support the audio element.
    </audio>
  );
}*/

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";


export default function AudioPlayer({ initialUrl, audioId, mimeType }) {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(initialUrl);
  const audioRef = useRef(null);
  

  const fetchNewUrl = async () => {
    try {
      console.log("🔥 fetchNewUrl called for:", audioId);
      const data = await dispatch(fetchUserAudioUrl(audioId));
      const newUrl = data.url || data;

      setUrl(newUrl);

      setTimeout(() => {
        audioRef.current?.load();
        audioRef.current?.play();
      }, 50);

      return newUrl;
    } catch (err) {
      console.error("Error fetching audio URL:", err);
    }
  };

  return (
    <audio
      ref={audioRef}
      controls
      preload="metadata"
      style={{ width: "100%" }}
      onError={fetchNewUrl}
    >
      {url && <source src={url} type={mimeType} />}
      Your browser does not support the audio element.
    </audio>
  );
}



/*const AudioPlayer = ({ url, audioId, mimeType }) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(null);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
      try {
        console.log("handlePlay called on: ",audioId)
        const data = await dispatch(fetchUserAudioUrl(audioId));
        setUrl(data.url || data); // your thunk must return the URL
        // play once URL is set
        setTimeout(() => audioRef.current?.play(), 50);
      } catch (err) {
        console.error("Error fetching audio URL:", err);
      }
  };

  return (

    <div>
        
      <button onClick={handlePlay} disabled={loading}>
        {loading ? "Loading…" : url ? "Play" : "Fetch & Play"}
      </button>
      <audio
      ref={audioRef}
      controls
      preload="metadata"
      style={{ width: "100%" }}
      onPlay={handlePlay}
    >
      {url && <source src={url} type={mimeType} />}
      Your browser does not support the audio element.
    </audio>
    </div>
    
  );
};

export default AudioPlayer;*/