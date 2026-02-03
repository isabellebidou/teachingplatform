import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setFeedback(null);

    try {
      const res = await axios.post("/api/feedback", { text });
      setFeedback(res.data);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setFeedback({ suggestion: "Failed to get feedback." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Submit Text for Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>

      {feedback && (
        <div style={{ marginTop: "20px" }}>
          <h3>Feedback:</h3>
          <p><strong>Score:</strong> {feedback.score}</p>
          <p><strong>Suggestion:</strong> {feedback.suggestion}</p>
          <h4>Errors:</h4>
          <ul>
            {feedback.errors && feedback.errors.map((err, idx) => (
              <li key={idx}>
                <strong>{err.error}</strong> → {err.correction} ({err.explanation})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feedback;

  