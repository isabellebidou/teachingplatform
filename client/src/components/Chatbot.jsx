import React, { useState } from "react"
// Optional: for styling your floating widget

export default function HFChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle the chat window visibility
  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <div className="hf-chat-container">
      {/* 1. The Conditional Chat Window */}
      {isOpen && (
        <div className="hf-chat-window">
          <div className="hf-chat-header">
            <h3 className="chattitle">Izzy Speak English</h3>
            <button className="hf-close-btn" onClick={toggleChat}>
              ✕
            </button>
          </div>
          {/* Note the use of /+/embed in the URL for a clean, borderless layout */}
          <iframe
            src="https://isabellebidou-izzy-speak-english.hf.space"
            className="hf-chat-body"
            width="100%"
            height="100%"
            title="Izzy Speak English Chat"
            allow="microphone; clipboard-write" // Allows mic input if your RAG uses voice
          ></iframe>
        </div>
      )}

      {/* 2. The Floating Action Toggle Button */}
      <button
        className={`hf-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
      >
        {isOpen ? "💬 Close Chat" : "💬 Chat with Izzy"}
      </button>
    </div>
  )
}
