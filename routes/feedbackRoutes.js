module.exports = (app) => {
    app.post("/api/feedback", (req, res) => {
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({
          error: "No text provided",
        });
      }
  
      // Fake feedback logic (temporary)
      const feedback = {
        score: 7,
        errors: [],
        suggestion: "Good effort. Review past tense forms.",
        originalText: text,
      };
  
      // Very simple example rule
      if (text.toLowerCase().includes("goed")) {
        feedback.errors.push({
          error: "goed",
          correction: "went",
          explanation: "Past simple of 'go' is irregular.",
        });
        feedback.score = 5;
      }
  
      res.json(feedback);
    });
  };
  