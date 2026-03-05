// seeds/data/grammar.rule.js

export const grammarRules = {
  /* ===================== A1 ===================== */

  "Present simple (affirmative, negative, interrogative)": {
    rule: "Use the present simple to talk about habits, routines, general facts, and permanent situations. Use do/does for questions and negatives.",
  },

  "Short answers in the Present simple": {
    rule: "Use short answers with do or does to respond briefly to present simple questions.",
    allowedAnswers: ["Yes, I do", "No, I don't", "Yes, we do", "No, we don't","Yes, he does", "No, she doesn't","No, he doesn't"]
  },

  "Question tags in the Present simple": {
    rule: "Use auxiliary verbs (do/does) to form question tags that match the tense and subject of the main clause.",
  },

  "Modal verb: can  vs must in questions, affirmative and negative sentences": {
    rule: "Use can to express ability or permission and must to express obligation or necessity.",
    allowedAnswers: ["can", "can't", "must", "mustn't"]
  },

  "Present continuous (affirmative, negative, interrogative)": {
    rule: "Use the present continuous to talk about actions happening now or temporary situations. Form it with be + verb-ing.",
  },
   "Short answers in the present continuous tense": {
    rule: "Use short answers with am, is, or are to reply briefly to present continuous questions.",
    allowedAnswers: ["Yes, I am", "No, I am not", "Yes, he is", "No, she isn't", "Yes, she is", "No, he isn't","Yes, they are", "No, they aren't"]
  },
  "Question tags in the present continuous tense": {
    rule: "Use  am, is, or are to form question tags that match the tense and subject of the main clause.",
  },

  "Definite vs indefinite articles and the Ø article": {
    rule: "Use a/an for non-specific singular nouns, the for specific nouns, and no article for general plural or uncountable nouns.",
    allowedAnswers: ["a", "an", "the", "Ø"]
  },
"Present simple vs present continuous": {
  rule: "Use the present simple for habits, routines, and permanent situations. Use the present continuous for actions happening now or temporary situations.",
  allowedAnswers: [
    "present simple",
    "present continuous"
  ],
  examples: [
    "She works in London, but she is working from home today.",
    "I usually get up at 7, but today I am getting up later."
  ],
  commonErrors: [
    "Using the present continuous for permanent situations",
    "Using the present simple for actions happening now",
    "Forgetting the auxiliary verb 'be' in the present continuous"
  ]
},
  "Comparative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Use -er or more to compare two things. Irregular adjectives have special forms.",
    allowedAnswers: ["-er", "more", "better", "worse"]
  },

  "Superlative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Use -est or most to describe the highest degree. Irregular adjectives have special forms.",
    allowedAnswers: ["-est", "most", "best", "worst"]
  },
  "Countable vs uncountable nouns and when to use some and any": {
  rule: "Use countable nouns with a/an and plural forms, and uncountable nouns without a plural. Use some in affirmative sentences and offers, and any in negative sentences and questions.",
  allowedAnswers: [
    "some",
    "any",
    "a",
    "an",
    "Ø"
  ],
  examples: [
    "I have some apples and some water.",
    "Do you have any bread?",
    "There isn't any milk.",
    "I need a banana."
  ],
  commonErrors: [
    "Using a/an with uncountable nouns",
    "Using some in negative sentences or questions",
    "Using any in affirmative sentences without reason",
    "Pluralising uncountable nouns"
  ]
},
"Quantifiers: some vs any, a lot of vs many, little vs few": {
  rule: "Use quantifiers to express quantity. Use some in affirmative sentences and offers, any in negative sentences and questions. Use many with countable nouns, a lot of with countable and uncountable nouns, few with countable nouns, and little with uncountable nouns.",
  allowedAnswers: [
    "some",
    "any",
    "a lot of",
    "many",
    "few",
    "little"
  ],
  examples: [
    "I have some friends.",
    "Do you have any questions?",
    "There are many people here.",
    "She drinks a lot of water.",
    "Few students understood the rule.",
    "There is little time left."
  ],
  commonErrors: [
    "Using many with uncountable nouns",
    "Using little with countable nouns",
    "Using some instead of any in questions or negatives",
    "Forgetting that a lot of works with both countable and uncountable nouns"
  ]
},
"Past simple (regular verbs)": {
  rule: "Use the past simple to talk about completed actions in the past. Form regular verbs by adding -ed to the base verb. Use did/didn't for questions and negatives.",
  allowedAnswers: [],
  examples: [
    "I visited my grandparents last weekend.",
    "She finished her homework yesterday.",
    "Did you watch the film?",
    "They didn't play football yesterday."
  ],
  commonErrors: [
    "Forgetting to add -ed to regular verbs",
    "Using the past form after did or didn't",
    "Confusing past simple with present perfect",
    "Incorrect spelling of -ed endings"
  ]
},
"Past simple - regular and irregular verbs(to be, to have, to go, to see, to eat, to drink) ": {
  rule: "Use the past simple to talk about completed actions in the past. Regular verbs end in -ed. Common irregular verbs have specific past forms such as was/were, had, went, saw, ate, and drank. Use did/didn't for questions and negatives.",
  allowedAnswers: [],
  examples: [
    "I went to school by bus.",
    "She ate lunch at noon.",
    "They drank water after the match.",
    "He had a meeting yesterday.",
    "We were tired after the trip.",
    "Did you see the film?"
  ],
  commonErrors: [
    "Using the base form instead of the past form",
    "Using the past form after did or didn't",
    "Confusing was and were",
    "Regularising irregular verbs (eated, goed, drinked)"
  ]
},

  "Wh- questions: what, who, when, where in the present simple": {
    rule: "Use wh- words at the beginning of questions to ask for specific information.",
    allowedAnswers: ["what", "who", "when", "where"]
  },

  /* ===================== A2 ===================== */
  "Short answers in the Present simple vs continuous": {
  rule: "Use short answers with do/does for present simple questions and with am/is/are for present continuous questions. The auxiliary verb must match the tense of the question.",
  allowedAnswers: [
    "Yes, I do",
    "No, I don't",
    "Yes, he does",
    "No, she doesn't",
    "Yes, I am",
    "No, I'm not",
    "Yes, he is",
    "No, he isn't",
    "Yes, they are",
    "No, they aren't"
  ],
  examples: [
    "Do you like coffee? — Yes, I do.",
    "Is she working today? — No, she isn't.",
    "Are they coming now? — Yes, they are."
  ],
  commonErrors: [
    "Using do/does with the present continuous",
    "Using am/is/are with the present simple",
    "Repeating the main verb instead of using a short answer",
    "Using the wrong auxiliary for the subject"
  ]
},
"Question tags in the Present simple vs continuous": {
  rule: "Form question tags by repeating the auxiliary verb from the main sentence and matching the subject. Use do/does for present simple and am/is/are for present continuous. Positive sentences take negative tags, and negative sentences take positive tags.",
  allowedAnswers: [
    "aren't you?",
    "isn't she?",
    "isn't he?",
    "aren't they?",
    "don't you?",
    "doesn't he?",
    "doesn't she?",
    "don't they?"
  ],
  examples: [
    "You like coffee, don't you?",
    "She is working hard, isn't she?",
    "They are coming now, aren't they?"
  ],
  commonErrors: [
    "Using the wrong auxiliary in the tag",
    "Using a positive tag for a positive sentence",
    "Using a negative tag for a negative sentence incorrectly",
    "Mismatching the subject in the tag"
  ]
},


"Modal verbs: can vs be able to in the future and the past tenses": {
  rule: "Use 'can' to express present or general ability, and 'be able to' to express ability in the past or future. In questions and negatives, use the correct auxiliary structure for each tense.",
  allowedAnswers: [
    "can",
    "can't",
    "be able to",
    "was able to",
    "were able to",
    "will be able to"
  ],
  examples: [
    "I can swim.",
    "She was able to finish her homework yesterday.",
    "Will you be able to come tomorrow?",
    "They can't attend the meeting."
  ],
  commonErrors: [
    "Using 'can' in past tense sentences",
    "Using 'be able to' in present simple without auxiliary",
    "Confusing 'can' and 'be able to' in questions",
    "Incorrect subject-verb agreement with 'be able to'"
  ]
},
"Modal verbs: can vs have  to in the future and the past tenses": {
  rule: "Use 'can' to express ability and 'have to' to express obligation. In past tense, use 'could' for ability and 'had to' for obligation. In the future, use 'will be able to' for ability and 'will have to' for obligation. Negatives and questions must use the correct auxiliary form.",
  allowedAnswers: [
    "can",
    "can't",
    "could",
    "couldn't",
    "have to",
    "don't have to",
    "had to",
    "didn't have to",
    "will be able to",
    "won't be able to",
    "will have to",
    "won't have to"
  ],
  examples: [
    "I can swim.",
    "She had to finish her homework yesterday.",
    "Will you be able to attend the meeting?",
    "They don't have to come if they don't want to.",
    "He couldn't solve the problem."
  ],
  commonErrors: [
    "Using 'can' for past obligations instead of 'could' or 'had to'",
    "Using 'have to' for past ability instead of 'could'",
    "Confusing future forms: 'will have to' vs 'will be able to'",
    "Incorrect negative or question forms"
  ]
},

  "Past continuous: be in the past simple and verb+ing in affirmative sentences and questions": {
    rule: "Use the past continuous to describe an action in progress in the past. Form it with was/were + verb-ing.",
    allowedAnswers: ["was -ing", "were -ing"]
  },

  "Possessive adjectives vs possessive pronouns": {
    rule: "Use possessive adjectives before nouns and possessive pronouns to replace nouns.",
    allowedAnswers: ["my", "mine", "your", "yours", "his", "hers", "ours", "theirs"]
  },

  "subject vs object pronouns": {
    rule: "Use subject pronouns as the subject of a sentence and object pronouns after verbs or prepositions.",
    allowedAnswers: ["I", "me", "he", "him", "she", "her", "we", "us", "they", "them"]
  },

  "Relative pronouns in relative clauses : who, which, that : using them to avoid repetitions and turn two sentence into one": {
    rule: "Use relative pronouns to join two sentences and avoid repetition. Who refers to people, which to things, and that to people or things.",
    allowedAnswers: ["who", "which", "that"]
  },

  /* ===================== B ===================== */

  "Present perfect vs past simple": {
    rule: "Use the present perfect for life experience or actions with present relevance. Use the past simple for finished past actions with a specific time.",
  },

  "Time markers: Present perfect vs past simple, since vs ago": {
    rule: "Use since with a starting point, ago with a finished time in the past.",
    allowedAnswers: ["since", "ago"]
  },

  "Relative pronoun in relative clauses who, which, that, where, when : using them to avoid repetitions and turn two sentence into one": {
    rule: "Use relative pronouns and adverbs to give extra information about people, places, and times.",
    allowedAnswers: ["who", "which", "that", "where", "when"]
  },

  "Modal verbs: possibility": {
    rule: "Use modal verbs to express possibility in the present or future.",
    allowedAnswers: ["might", "may", "could"]
  },

  /* ===================== C ===================== */

  "Relative pronouns in relative clauses: who, which, that, where, when, whose, whom : using them to avoid repetitions and turn two sentence into one": {
    rule: "Use a full range of relative pronouns to create precise and complex relative clauses.",
    allowedAnswers: ["who", "which", "that", "where", "when", "whose", "whom"]
  },

  "If/ when clauses in the future and past tenses: using the proper verb forms": {
    rule: "Use correct verb forms in conditional and time clauses to express real or hypothetical situations.",
  },

  "linking words: but, however, although, on the other hand, then, before, while, finally, in order to": {
    rule: "Use linking words to connect ideas logically and structure discourse.",
    allowedAnswers: ["but", "however", "although", "while", "before", "finally", "in order to"]
  }
};