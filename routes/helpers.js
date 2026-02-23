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
export function generateFeedback( {missing, extra, coverage}, text) {
  const feedback = [];
  if (missing.length === 0) {
    feedback.push("✅ You said all the expected words.");
  } else {
    feedback.push(
      `⚠️ You missed ${missing.length} word(s): ${missing.join(", ")}.`
    );
    // TODO: check if missing words end in 's'  
//a missing word ends in "s" AND the base form exists as a verb AND the previous word is a 3rd person subject (he, she, it, name) 
//👉 Then you can say:“You may have forgotten to pronounce the -s of the verb (3rd person singular).” 
// TODO: check if missing words start with 'h' 

//If:missing word starts with h AND is not in silent-H list AND transcript shows vowel start / missing word 

// 👉 Feedback: “Be careful: the H is pronounced in this word.” 
    const missingWordsWithHArray = checkMissingWithH(missing);
    if (missingWordsWithHArray){
      feedback.push( `Be careful: the H is pronounced in : ${missingWordsWithHArray.join(", ")}.`)
    }
    //const missingWordsWithSArray = checkMissingWithS(missing, text);


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

function missingWordsStartWithChar(missing, char){
  const list =[];
  const result = false;
  for (let index = 0; index < array.length; index++) {
    const element = missing[index];
    if (typeof element == String && element[0] === char ){
      result = true;
    }
  }
  return (result, list);
}
function checkMissingWithH(missing){
  const silentHWordsSet= new Set(["hour", "honor", "honour", "honest"]);
  const wordsStartingInH = [];
  missing.forEach(element => {
  if (element.startsWith("h") && !silentHWordsSet.has(element))
    wordsStartingInH.push (element);
});
return wordsStartingInH.length >= 1 ? wordsStartingInH: false;
}

function checkMissingWithS(missing, text){
  const baseVerForm=["play", "give", "do", "go","make", "sing", "eat", "drink", "like", "love", "read"];
  const verbsEndingInS = [];

  missing.forEach(element => {
   // if (element.toLowerCase.endsWith("s") && () &&())
     // verbsEndingInS.push (element);
  });
return verbsEndingInS.length >= 1 ? verbsEndingInS: false;
}