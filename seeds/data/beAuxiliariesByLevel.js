const beAuxiliariesByLevel = {
  A1: {
    affirmative: ["am", "is", "are"],
    negative: [],
    questions: []
  },

  A2: {
    affirmative: ["am", "is", "are"],
    negative: ["am not", "is not", "are not"],
    contractionsNegative: ["isn't", "aren't"],
    questions: ["am", "is", "are"]
  },

  B1: {
    affirmative: ["am", "is", "are"],
    negative: ["am not", "is not", "are not"],
    contractionsNegative: ["isn't", "aren't"],
    questions: ["am", "is", "are"],
    shortAnswers: ["am", "is", "are", "am not", "isn't", "aren't"]
  },

  B2: {
    affirmative: ["am", "is", "are"],
    negative: ["am not", "is not", "are not"],
    contractionsNegative: ["isn't", "aren't"],
    questions: ["am", "is", "are"],
    emphasis: ["do be"] // stylistic / contrastive (rare, advanced)
  },

  C1: {
    affirmative: ["am", "is", "are"],
    negative: ["am not", "is not", "are not"],
    contractionsNegative: ["isn't", "aren't"],
    alternativeNegatives: ["ain't"], // receptive competence
    questions: ["am", "is", "are"],
    discourseUses: ["being"] // nominalisation / discourse
  },

  C2: {
    affirmative: ["am", "is", "are"],
    negative: ["am not", "is not", "are not"],
    contractionsNegative: ["isn't", "aren't"],
    alternativeNegatives: ["ain't"],
    questions: ["am", "is", "are"],
    stylisticVariation: ["I'm", "you're", "he's", "she's", "we're", "they're"]
  }
};

export default beAuxiliariesByLevel;