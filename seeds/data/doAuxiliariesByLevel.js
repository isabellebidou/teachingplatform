const doAuxiliariesByLevel = {
  A1: {
    affirmative: [],
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"]
  },

  A2: {
    affirmative: [],
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"]
  },

  B1: {
    affirmative: ["do", "does"], // emphasis: I do like it
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"],
    shortAnswers: ["do", "does", "don't", "doesn't"]
  },

  B2: {
    affirmative: ["do", "does"],
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"],
    emphasis: ["do"] // contrastive focus
  },

  C1: {
    affirmative: ["do", "does"],
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"],
    stylisticUses: ["do so"] // substitution
  },

  C2: {
    affirmative: ["do", "does"],
    negative: ["do not", "does not"],
    contractionsNegative: ["don't", "doesn't"],
    questions: ["do", "does"],
    stylisticVariation: ["I do", "we do", "they do"] // discourse emphasis
  }
};

export default doAuxiliariesByLevel;