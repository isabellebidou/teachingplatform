import i18n from "../i18n.js";
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

export function generateFeedback(lang ,{ missing, extra, coverage }, text) {
  const feedback = [];
  const t = i18n.getFixedT(lang);
  if (missing.length === 0) {
    feedback.push(`${t("feedback:allWords")}`);
  } else {
    feedback.push(`${t("feedback:missed", { lng: lang })} ${missing.length} ${t("feedback:numMissed", { lng: lang })} ${missing.join(", ")}.`
    );

    const missingWordsWithHArray = checkMissingWithH(missing);
    if (missingWordsWithHArray.length > 0) {
      feedback.push(
        `${t("feedback:h", { lng: lang })} ${missingWordsWithHArray.join(", ")}.`
      );
    }

    const missingWithS = checkMissingWithS(missing, text);
    if (missingWithS.length > 0) {
      feedback.push(
        `${t("feedback:s")} ${missingWithS.join(", ")}.`
      );
    }
  }

  if (extra.length > 0) {
    feedback.push(`${t("feedback:xWords", { lng: lang })}${extra.join(", ")}${t("feedback:intentional", { lng: lang })}`);

    if (coverage > 0.9) {
      feedback.push(`${coverage * 100}${t("feedback:vClear", { lng: lang })}`);
    } else if (coverage > 0.7) {
      feedback.push(`${coverage * 100}${t("feedback:mClear", { lng: lang })}`);
    } else if (coverage > 0.3) {
      feedback.push(`${coverage * 100}${t("feedback:tryAgain", { lng: lang })}`);
    } else {
      feedback.push(`${coverage * 100}${t("feedback:unclear", { lng: lang })}`);
    }
  }

  return Array.isArray(feedback) ? feedback : [feedback];
}

export function checkMissingWithH(missing) {
  const silentHWordsSet = new Set(["hour", "honor", "honour", "honest"]);
  return missing.filter(word => word.startsWith("h") && !silentHWordsSet.has(word));
}

export function checkMissingWithS(missing, text) {
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
