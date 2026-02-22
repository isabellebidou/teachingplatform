export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
export function compareWords(expected, spoken) {
  const expectedSet = new Set(expected);
  const spokenSet = new Set(spoken);

  const missing = expected.filter(w => !spokenSet.has(w));
  const extra = spoken.filter(w => !expectedSet.has(w));
  const matched = expected.filter(w => spokenSet.has(w));
  const coverage = matched.length / expected.length;

  return { missing, extra, coverage };
}
export function generateFeedback( {missing, extra, coverage}) {
  const feedback = [];
  if (missing.length === 0) {
    feedback.push("✅ You said all the expected words.");
  } else {
    feedback.push(
      `⚠️ You missed ${missing.length} word(s): ${missing.join(", ")}.`
    );
  }

  if (extra.length > 0) {
    feedback.push(
      `You added extra word(s): ${extra.join(", ")}. That’s okay if it was intentional.`
    );

    switch (coverage) {
        case coverage > 90: 
        feedback.push(`${coverage} % - Very clear`);
            break;
        case coverage <= 90 && coverage > 70:
            feedback.push(`${coverage}  % coverage - Mostly clear`);
        case coverage <= 70 && coverage > 30:
            feedback.push(`${coverage} % coverage - Please try again`)
        default:
            feedback.push(`${coverage} % coverage - Unclear - Please try again`)

            break;
    }
  }
  const feedbackArray = Array.isArray(feedback) ? feedback : [feedback];
  return feedbackArray;
}