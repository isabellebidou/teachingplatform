function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compareWords(expected, spoken) {
  const expectedSet = new Set(expected);
  const spokenSet = new Set(spoken);
  const missing = expected.filter(w => !spokenSet.has(w));
  const extra = spoken.filter(w => !expectedSet.has(w));
  const matched = expected.filter(w => spokenSet.has(w));
  const coverage = matched.length / expected.length;

  return { missing, extra, coverage };
}

function generateFeedback({ missing, extra, coverage }, text) {
  const feedback = [];
  if (missing.length === 0) {
    feedback.push("✅ You said all the expected words.");
  } else {
    feedback.push(
      `⚠️ You missed or mispronounced ${missing.length} word(s): ${missing.join(", ")}.`
    );

    const missingWordsWithHArray = checkMissingWithH(missing);
    if (missingWordsWithHArray.length > 0) {
      feedback.push(
        `Be careful: the "H" is pronounced in: ${missingWordsWithHArray.join(", ")}.`
      );
    }

    const missingWithS = checkMissingWithS(missing, text);
    if (missingWithS.length > 0) {
      feedback.push(
        `Be careful: You may have missed the -s ending. The final "S" is pronounced in the present simple with he, she, and it: ${missingWithS.join(", ")}.`
      );
    }
  }

  if (extra.length > 0) {
    feedback.push(`Extra word(s) found: ${extra.join(", ")}. That’s okay if it was intentional.`);

    if (coverage > 0.9) {
      feedback.push(`${coverage * 100}% - Very clear`);
    } else if (coverage > 0.7) {
      feedback.push(`${coverage * 100}% coverage - Mostly clear`);
    } else if (coverage > 0.3) {
      feedback.push(`${coverage * 100}% coverage - Please try again`);
    } else {
      feedback.push(`${coverage * 100}% coverage - Unclear - Please try again`);
    }
  }

  return Array.isArray(feedback) ? feedback : [feedback];
}

function checkMissingWithH(missing) {
  const silentHWordsSet = new Set(["hour", "honor", "honour", "honest"]);
  return missing.filter(word => word.startsWith("h") && !silentHWordsSet.has(word));
}

function checkMissingWithS(missing, text) {
  const verbsEndingInS = [];
  const verbFormsEndingInS = new Set([
    "plays", "lives", "gives", "does", "goes", "makes",
    "sings", "eats", "drinks", "likes", "loves", "reads"
  ]);

  const thirdPersonSet = new Set(["he", "she", "it"]);
  const textArray = text.split(" ");
  const thirdPerson = textArray.filter(w => thirdPersonSet.has(w));

  missing.forEach(word => {
    if (
      word.endsWith("s") &&
      (verbFormsEndingInS.has(word) ||
        (thirdPerson.length > 0 &&
          textArray.indexOf(thirdPerson[0]) < textArray.indexOf(word)))
    ) {
      verbsEndingInS.push(word);
    }
  });

  return verbsEndingInS;
}

// ✅ CommonJS export
module.exports = { normalize, compareWords, generateFeedback };