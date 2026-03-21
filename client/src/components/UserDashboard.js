import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchUserAudios } from "../actions"
import { fetchScripts } from "../actions"
import { fetchUserAudioUrl } from "../actions"
import AudioRecorder from "./audios/AudioRecorder"
import AudioList from "./audios/AudioList"
import SelectSentence from "./SelectSentence"
import StarReview from "./StarReview";



function UserDashboard({
  audios = [],
  scripts = [],
  fetchUserAudios,
  fetchScripts,
  fetchUserAudioUrl,
}) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedScript, setSelectedScript] = useState(null)
  const [audio, setAudio] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  // 🔄 Fetch audios on mount AND when refreshKey changes
  useEffect(() => {
    fetchUserAudios()
  }, [fetchUserAudios, refreshKey])

  useEffect(() => {
    fetchScripts()
  }, [fetchScripts])

  useEffect(() => {
    if (scripts.length > 0) {
      setSelectedScript(scripts[0])
    }
  }, [scripts])

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }
  const handleSelectAudio = async (audioItem) => {
    console.log("click", audioItem._id)
    try {
      const { payload } = await fetchUserAudioUrl(audioItem._id)
      const url = payload.url
      setAudioUrl(url)
      setAudio({
        ...audioItem,
      })

    } catch (err) {
      console.error("Error fetching audio URL", err)
    }
  }
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
          onUploadSuccess={triggerRefresh}
        />
 
        <AudioList
          audios={audios}
          onDeleteSuccess={triggerRefresh}
          onSelectAudio={handleSelectAudio}
          selectedAudioId={audio?._id}  
          selectedAudioUrl = {audioUrl}  

        />
        <StarReview />
      </div>
    </>
  )
}

function mapStateToProps(state) {
  console.log(state.audios.length)

  return { audios: state.audios, scripts: state.scripts }
}

export default connect(mapStateToProps, {
  fetchUserAudios,
  fetchScripts,
  fetchUserAudioUrl,
})(UserDashboard)
