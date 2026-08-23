import React, { useEffect, useRef, useState } from "react"

const VideoPlayer = () => {
  const [videos, setVideos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null)

  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/api/videos")

        if (!response.ok) {
          throw new Error("Failed to load videos")
        }

        const data = await response.json()

        setVideos(data)
        setLoading(false)
      } catch (err) {
        console.error("Video loading error:", err)
        setError("Unable to load videos")
        setLoading(false)
      }
    }

    loadVideos()
  }, [])
  const currentVideo = videos[currentIndex]

  useEffect(() => {
    const loadVideoUrl = async () => {
      if (!currentVideo?._id) return

      try {
        const response = await fetch(`/api/video-url/${currentVideo._id}`)

        if (!response.ok) {
          throw new Error("Failed to load video URL")
        }

        const data = await response.json()

        setCurrentVideoUrl(data.url)
      } catch (err) {
        console.error("Video URL error:", err)
        setCurrentVideoUrl(null)
      }
    }

    loadVideoUrl()
  }, [currentVideo])

  const handleVideoEnded = () => {
    if (videos.length <= 1) {
      return
    }

    setCurrentIndex((previousIndex) => {
      return (previousIndex + 1) % videos.length
    })
  }

  if (loading) {
    return null
  }

  if (error || videos.length === 0) {
    return null
  }

  return (
    <>
      <div className="video-player">
        <video
          ref={videoRef}
          key={currentVideo._id}
          src={currentVideoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          aria-label={currentVideo.title}
        />
      </div>

      <div className="video-controls">
        <button
          onClick={() => {
            const video = document.querySelector("video")
            video.currentTime = 0
            video.play()
          }}
        >
          🔄 Replay
        </button>

        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "🔊 Play sound" : "🔇 Mute"}
        </button>
      </div>
    </>
  )
}

export default VideoPlayer
