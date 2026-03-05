// grammar.rules.js
export const grammarRules = {
  // ----- A1 -----
  "Present simple (affirmative, negative, interrogative)": {
    rule: "Use the present simple for habits, routines, and permanent situations in affirmative or negative sentences or questions. Use do/does for negatives and questions.",
    allowedAnswers: [],
    numberOfOptions: 4,
    examples: [
      "I work in London.",
      "She doesn't like coffee.",
      "Do you play tennis?"
    ],
    commonErrors: [
      "Forgetting the -s in the third person singular",
      "Using present continuous for routines"
    ]
  },
  "Short answers in the Present simple": {
    rule: "Complete the short answers with do/does for present simple questions. Positive questions take negative short answers and vice versa.",
    allowedAnswers: ["do, does, doesn't, don't"],
    allowedIncorrectAnswers: ["am, am not, isn't , is, are, aren't"],
    numberOfOptions: 4,
    examples: [
      "Do you like pizza? — Yes, I do.",
      "Does she play tennis? — No, she doesn't."
    ],
    commonErrors: [
      "Using the wrong auxiliary"
    ]
  },
  "Question tags in the Present simple": {
    rule: "Use question tags by repeating the auxiliary from the main sentence. Positive sentences take negative tags, negative take positive.",
    allowedAnswers: ["don't you?","doesn't he?","doesn't she?, don't we? don't they?"],
    allowedIncorrectAnswers: ["aren't you?","isn't he?","isn't she?, aren't we? aren't they?"],
    numberOfOptions: 3,
    examples: [
      "You like coffee, don't you?",
      "She doesn't eat meat, does she?"
    ],
    commonErrors: [
      "Using wrong auxiliary",
      "Wrong polarity",
      "using don't instead of doesn't"
    ]
  },
  
  "Modal verb: can vs must in questions, affirmative and negative sentences": {
    rule: "Use 'can' for ability, 'must' for obligation. Negatives and questions require correct auxiliary forms.",
    allowedAnswers: ["can","can't","must","mustn't"],
    numberOfOptions: 3,
    examples: [
      "I can swim.",
      "You must finish your homework."
    ],
    commonErrors: [
      "Using 'can' for obligation",
      "Forgetting negative forms"
    ]
  },
  "Present continuous (affirmative, negative, interrogative)": {
    rule: "Use present continuous for actions happening now or temporary situations. Use am/is/are + verb+ing.",
    allowedAnswers: ["am eating, are sleeping, "] ,
    numberOfOptions: 3,
    examples: [
      "She is reading a book.",
      "They aren't playing outside."
    ],
    commonErrors: [
      "Forgetting the auxiliary verb",
      "Using base verb form"
    ]
  },
  "Short answers in the present continuous tense": {
    rule: "Use short answers with am/is/are for present continuous questions.",
    allowedAnswers: ["am","'m not","is"," isn't"," are"," aren't"],
    examples: [
      "Are you working now? — Yes, I am.",
      "Is she cooking? — No, she isn't."
    ],
    commonErrors: [
      "Using do/does instead of am/is/are",
      "Repeating the main verb"
    ]
  },
  "Question tags in the present continuous tense": {
    rule: "Form question tags by repeating am/is/are from the main sentence.",
    allowedAnswers: ["isn't she?","aren't they?","am I not?"],
    examples: [
      "She is singing, isn't she?",
      "We are late, aren't we?"
    ],
    commonErrors: [
      "Using do/does for continuous",
      "Wrong polarity"
    ]
  },
  "Definite vs indefinite articles and the Ø article": {
    rule: "Use 'a/an' for singular countable nouns, 'the' for specific nouns, and zero article (Ø) for plural/general nouns.",
    allowedAnswers: ["a","an","the","Ø"],
    examples: [
      "I saw a cat.",
      "The book on the table is mine.",
      "Dogs are friendly animals."
    ],
    commonErrors: [
      "Confusing a/an with the",
      "Using 'the' for general nouns"
    ]
  },
  "Present simple vs present continuous": {
    rule: "Use present simple for habits, routines, and permanent situations. Use present continuous for actions happening now or temporary situations.",
    allowedAnswers: ["present simple","present continuous"],
    examples: [
      "I usually walk to school. — I am walking to school now.",
      "She works in London, but today she is working from home."
    ],
    commonErrors: [
      "Using present continuous for permanent situations",
      "Using present simple for actions happening now"
    ]
  },
  "Comparative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Short adjectives take -er, long adjectives use 'more'. Irregular forms must be memorized.",
    allowedAnswers: [],
    examples: [
      "This car is faster than mine.",
      "She is more intelligent than her sister."
    ],
    commonErrors: [
      "Using -er with long adjectives",
      "Incorrect irregular forms"
    ]
  },
  "Superlative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Short adjectives take -est, long adjectives use 'most'. Irregular forms must be memorized.",
    allowedAnswers: [],
    examples: [
      "He is the tallest boy in the class.",
      "She is the most beautiful singer."
    ],
    commonErrors: [
      "Using -est with long adjectives",
      "Incorrect irregular forms"
    ]
  },
  "Countable vs uncountable nouns and when to use some and any": {
    rule: "Use countable nouns with a/an and plural forms, uncountable without plural. Use some in affirmative and any in negatives/questions.",
    allowedAnswers: ["some","any","a","an","Ø"],
    examples: [
      "I have some apples.",
      "Do you have any bread?",
      "I need a banana."
    ],
    commonErrors: [
      "Using a/an with uncountables",
      "Using some in negative sentences",
      "Pluralising uncountables"
    ]
  },
  "Quantifiers: some vs any, a lot of vs many, little vs few": {
    rule: "Use quantifiers to express quantity. Some/any for affirmative/negative/questions. Many for countable nouns, a lot of for both, few for countable, little for uncountable.",
    allowedAnswers: ["some","any","a lot of","many","few","little"],
    examples: [
      "I have many friends.",
      "There is little water left.",
      "Few students understood."
    ],
    commonErrors: [
      "Using many with uncountables",
      "Using little with countables",
      "Confusing some/any usage"
    ]
  },
  "Past simple (regular verbs)": {
    rule: "Use past simple for completed actions. Regular verbs add -ed. Use did/didn't for questions and negatives.",
    allowedAnswers: [],
    examples: [
      "I visited my grandparents.",
      "Did you watch the film?",
      "She didn't play tennis."
    ],
    commonErrors: [
      "Forgetting -ed",
      "Using past form after did/didn't",
      "Confusing past simple and present perfect"
    ]
  },
  "Past simple - regular and irregular verbs": {
    rule: "Use past simple for completed actions. Regular verbs add -ed. Irregular verbs use specific past forms: was/were, had, went, saw, ate, drank. Use did/didn't for questions/negatives.",
    allowedAnswers: [],
    examples: [
      "I went to school.",
      "She ate lunch.",
      "Did you see the film?",
      "He had a meeting."
    ],
    commonErrors: [
      "Regularizing irregular verbs",
      "Not using base form after did/didn't",
      "Confusing was/were"
    ]
  },
    "Wh- questions: what, who, when, where in the present simple": {
    rule: "Use wh- words at the beginning of questions to ask for specific information.",
    allowedAnswers: ["what", "who", "when", "where"]
  },
  // ----- A2 -----
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

  "Present simple (affirmative, negative, interrogative)": {
    rule: "Use present simple for habits, routines, permanent situations. Do/does for negatives and questions.",
    allowedAnswers: [],
    examples: [
      "I usually get up at 7.",
      "She doesn't like coffee.",
      "Do you play tennis?"
    ],
    commonErrors: [
      "Forgetting -s for third person singular",
      "Using present continuous for routines"
    ]
  },
  "Wh- questions: what, who, when, where, how+adj, what+noun in the present and past tenses": {
  rule: "Use Wh- questions to ask for specific information. Use 'what', 'who', 'when', 'where' for people, things, time, and place. Use 'how + adjective/adverb' to ask about manner. Form questions correctly with auxiliary verbs for present and past tenses.",
  allowedAnswers: [],
  examples: [
    "What is your name?",
    "Who called you yesterday?",
    "When did they arrive?",
    "Where are you going?",
    "How old are you?",
    "What book did you read?"
  ],
  commonErrors: [
    "Omitting the auxiliary verb in present/past questions",
    "Misplacing the main verb after the subject",
    "Using wrong tense for the auxiliary",
    "Confusing 'who' and 'whom' (optional for C)"
  ]
},
  "Short answers in the Present simple vs continuous": {
    rule: "Use short answers with do/does for present simple and am/is/are for present continuous. Must match auxiliary tense.",
    allowedAnswers: [
      "Yes, I do","No, I don't","Yes, he does","No, she doesn't",
      "Yes, I am","No, I'm not","Yes, he is","No, he isn't",
      "Yes, they are","No, they aren't"
    ],
    examples: [
      "Do you like coffee? — Yes, I do.",
      "Is she working now? — No, she isn't."
    ],
    commonErrors: [
      "Using wrong auxiliary",
      "Repeating main verb"
    ]
  },
  "Question tags in the Present simple vs continuous": {
    rule: "Form question tags using correct auxiliary and polarity. Positive sentences take negative tags, negative sentences take positive tags.",
    allowedAnswers: ["aren't you?","isn't she?","don't you?","doesn't he?"],
    examples: [
      "You are coming, aren't you?",
      "She doesn't eat meat, does she?"
    ],
    commonErrors: [
      "Wrong auxiliary",
      "Wrong polarity"
    ]
  },
  "Modal verbs: can vs be able to in the future and the past tenses": {
    rule: "Use 'can' for present ability, 'be able to' for past/future ability. Negatives/questions use correct auxiliaries.",
    allowedAnswers: ["can","can't","be able to","was able to","were able to","will be able to"],
    examples: [
      "She was able to finish her homework.",
      "Will you be able to attend?"
    ],
    commonErrors: [
      "Using 'can' in past",
      "Using 'be able to' incorrectly"
    ]
  },
  "Modal verbs: can vs have  to in the future and the past tenses": {
    rule: "Use 'can' for ability, 'have to' for obligation. Past: 'could'/'had to'. Future: 'will be able to'/'will have to'. Correct negative/question forms.",
    allowedAnswers: [
      "can","can't","could","couldn't",
      "have to","don't have to","had to","didn't have to",
      "will be able to","won't be able to","will have to","won't have to"
    ],
    examples: [
      "I could swim yesterday.",
      "She will have to finish it tomorrow."
    ],
    commonErrors: [
      "Using wrong form for tense",
      "Confusing ability and obligation"
    ]
  },
  "past vs present participles": {
  rule: "Use present participles (verb+ing) for continuous tenses and as adjectives to describe ongoing actions. Use past participles (usually verb+ed or irregular forms) for perfect tenses and as adjectives for completed actions.",
  allowedAnswers: [],
  examples: [
    "I am reading a book. (present participle)",
    "The broken window needs repair. (past participle)",
    "She has eaten lunch. (past participle in present perfect)",
    "They are playing football. (present participle in present continuous)"
  ],
  commonErrors: [
    "Confusing past and present participles",
    "Using base verb instead of participle",
    "Using -ed forms for ongoing actions",
    "Incorrect formation of irregular past participles"
  ]
},
"The passive voice: use the correct past participle": {
  rule: "Form the passive voice using the correct form of 'to be' + past participle. Use the tense of the original active sentence to choose the appropriate form of 'to be'. The subject of the active sentence becomes the agent in a 'by' phrase (optional).",
  allowedAnswers: [],
  examples: [
    "The book was written by J.K. Rowling. (past simple passive)",
    "The windows are cleaned every week. (present simple passive)",
    "A new bridge will be built next year. (future simple passive)",
    "The homework has been done by the students. (present perfect passive)"
  ],
  commonErrors: [
    "Using base verb instead of past participle",
    "Using wrong form of 'to be' for the tense",
    "Omitting 'by' when necessary",
    "Confusing active and passive subject positions"
  ]
},
"Adverbs of frequency and their correct placement in affirmative sentences: never, usually, always, sometimes": {
  rule: "Place adverbs of frequency (never, sometimes, usually, always, seldom, hardly ever) before the main verb in affirmative sentences, but after the verb 'to be'.",
  allowedAnswers: ["never","sometimes","usually","always","seldom","hardly ever"],
  examples: [
    "I always eat breakfast in the morning.",
    "She is usually very busy.",
    "They never go to the cinema.",
    "We sometimes play football on Sundays."
  ],
  commonErrors: [
    "Placing the adverb after the main verb instead of before",
    "Placing the adverb incorrectly with 'to be'",
    "Confusing the order with negatives",
    "Omitting the adverb entirely"
  ]
},
"Short answers in the Present simple and present continuous": {
  rule: "Use short answers by repeating the auxiliary verb from the main question. For present simple, use do/does. For present continuous, use am/is/are. Positive questions take negative short answers, and negative questions take positive short answers.",
  allowedAnswers: [
    "Yes, I do","No, I don't",
    "Yes, he does","No, he doesn't",
    "Yes, I am","No, I'm not",
    "Yes, he is","No, he isn't",
    "Yes, they are","No, they aren't"
  ],
  examples: [
    "Do you like coffee? — Yes, I do.",
    "Does she play tennis? — No, she doesn't.",
    "Are they coming now? — Yes, they are.",
    "Is he working? — No, he isn't."
  ],
  commonErrors: [
    "Using the full verb instead of a short answer",
    "Using wrong auxiliary for the tense",
    "Mismatching subject and auxiliary",
    "Incorrect polarity (positive/negative)"
  ]
},
"Question tags in the Present simple and present continuous": {
  rule: "Form question tags by repeating the auxiliary verb from the main sentence. Positive sentences take negative tags, negative sentences take positive tags. Use do/does for present simple and am/is/are for present continuous. The subject must match the main sentence.",
  allowedAnswers: [
    "aren't you?","isn't he?","isn't she?","aren't they?",
    "don't you?","doesn't he?","doesn't she?","don't they?"
  ],
  examples: [
    "You like coffee, don't you?",
    "She is working hard, isn't she?",
    "They aren't coming, are they?",
    "He plays tennis, doesn't he?"
  ],
  commonErrors: [
    "Using wrong auxiliary in the tag",
    "Incorrect polarity (positive/negative)",
    "Mismatching subject in the tag",
    "Confusing present simple and continuous forms"
  ]
},
  // ----- Continue similarly for B and C topics -----
  "Present simple & continuous": {
  rule: "Use the present simple for routines, habits, and permanent situations. Use the present continuous for actions happening now or temporary situations. Make sure the auxiliary 'am/is/are' is used correctly in continuous forms and 'do/does' in negatives or questions in present simple.",
  allowedAnswers: [],
  examples: [
    "I usually go to school by bus. (present simple)",
    "She works in London. (present simple)",
    "He is reading a book now. (present continuous)",
    "They are playing football at the moment. (present continuous)"
  ],
  commonErrors: [
    "Using present continuous for routines",
    "Using present simple for actions happening now",
    "Forgetting auxiliary verbs in questions or negatives",
    "Misplacing 'not' in negatives"
  ]
},
"Comparative and superlative adjectives short vs long adjectives and regular and irreglar forms": {
  rule: "Use short adjectives (one syllable, sometimes two) with -er for comparatives and -est for superlatives. Use 'more' for long adjectives for comparatives and 'most' for superlatives. Irregular adjectives have specific forms that must be memorized.",
  allowedAnswers: [],
  examples: [
    "This car is faster than mine. (comparative, short adjective)",
    "She is the tallest in the class. (superlative, short adjective)",
    "He is more intelligent than his brother. (comparative, long adjective)",
    "She is the most beautiful singer. (superlative, long adjective)",
    "Good → better → best (irregular forms)"
  ],
  commonErrors: [
    "Adding -er/-est to long adjectives",
    "Forgetting irregular forms",
    "Using 'more' with short adjectives unnecessarily",
    "Incorrect spelling for comparatives/superlatives"
  ]
},
"Past simple (regular & irregular) in affirmative sentences and questions": {
  rule: "Use the past simple for completed actions in the past. Regular verbs add -ed; irregular verbs have specific past forms (e.g., was/were, had, went, saw, ate, drank). Use 'did' for questions and 'did not'/'didn't' for negatives. Ensure subject-verb agreement and correct tense usage.",
  allowedAnswers: [],
  examples: [
    "I visited my grandparents yesterday. (regular verb)",
    "She ate lunch at noon. (irregular verb)",
    "Did you watch the film last night? (question)",
    "He didn't play tennis. (negative)"
  ],
  commonErrors: [
    "Regularizing irregular verbs",
    "Using base form after 'did/didn't'",
    "Forgetting -ed on regular verbs",
    "Confusing past simple with present perfect"
  ]
},"Present perfect vs past simple": {
  rule: "Use past simple for actions completed at a specific time in the past. Use present perfect for actions that happened in the past but are relevant to the present or have unspecified time. Ensure correct use of 'have/has + past participle' for present perfect.",
  allowedAnswers: [],
  examples: [
    "I visited Paris last year. (past simple, specific time)",
    "She has visited Paris many times. (present perfect, unspecified time)",
    "Did you see that movie yesterday? (past simple)",
    "I have already eaten lunch. (present perfect)"
  ],
  commonErrors: [
    "Using past simple when present perfect is required",
    "Using present perfect with a specific past time",
    "Incorrect past participle forms",
    "Forgetting 'have/has' in present perfect"
  ]
},
"Time markers: Present perfect vs past simple, since vs ago": {
  rule: "Use 'ago' with past simple to indicate a specific time before now. Use 'since' with present perfect to indicate the starting point of an action continuing to the present. Ensure correct tense and auxiliary usage.",
  allowedAnswers: [],
  examples: [
    "I met her two years ago. (past simple + ago)",
    "She has lived here since 2010. (present perfect + since)",
    "We finished the project three days ago. (past simple + ago)",
    "I have known him since we were children. (present perfect + since)"
  ],
  commonErrors: [
    "Using 'since' with past simple",
    "Using 'ago' with present perfect",
    "Incorrect auxiliary usage in present perfect",
    "Misplacing time markers in the sentence"
  ]
},
"Relative pronoun in relative clauses who, which, that, where, when : using them to avoid repetitions and turn two sentence into one": {
  rule: "Use relative pronouns to combine two clauses and avoid repetition. 'Who' refers to people, 'which' to things, 'that' to people or things, 'where' to places, and 'when' to times. Ensure correct placement and agreement with the antecedent.",
  allowedAnswers: [],
  examples: [
    "The man who called you is my uncle.",
    "This is the book which I bought yesterday.",
    "She visited the town where she was born.",
    "I remember the day when we met.",
    "The movie that we watched was fantastic."
  ],
  commonErrors: [
    "Using 'which' for people",
    "Omitting the relative pronoun",
    "Misplacing the relative clause",
    "Using the wrong relative pronoun for time or place"
  ]
},
"Relative pronoun in relative clauses who, which, that, where, when : using them to avoid repetitions and turn two sentence into one": {
  rule: "Use relative pronouns to combine two clauses and avoid repetition. 'Who' refers to people, 'which' to things, 'that' to people or things, 'where' to places, and 'when' to times. Ensure correct placement and agreement with the antecedent.",
  allowedAnswers: [],
  examples: [
    "The man who called you is my uncle.",
    "This is the book which I bought yesterday.",
    "She visited the town where she was born.",
    "I remember the day when we met.",
    "The movie that we watched was fantastic."
  ],
  commonErrors: [
    "Using 'which' for people",
    "Omitting the relative pronoun",
    "Misplacing the relative clause",
    "Using the wrong relative pronoun for time or place"
  ]
},"Modal verbs: possibility": {
  rule: "Use modal verbs to express possibility. 'May' and 'might' are used for uncertain present or future actions. 'Could' is used for present, future, or hypothetical situations. Ensure correct subject-verb agreement and placement.",
  allowedAnswers: ["may","might","could"],
  examples: [
    "It may rain tomorrow.",
    "She might be at the library now.",
    "They could be late for the meeting.",
    "You could try asking him for help."
  ],
  commonErrors: [
    "Using 'can' instead of 'may/might' for possibility",
    "Omitting the modal verb",
    "Using wrong tense with the modal",
    "Incorrect word order in the sentence"
  ]
},
"Modal verbs: permission": {
  rule: "Use modal verbs to ask for or give permission. 'Can' and 'may' are used in present/future contexts. 'Could' is used for polite requests. Ensure correct word order and auxiliary usage.",
  allowedAnswers: ["can","may","could"],
  examples: [
    "Can I borrow your book?",
    "May we leave early today?",
    "Could I open the window, please?",
    "You may use my computer if you like."
  ],
  commonErrors: [
    "Using 'must' instead of 'may/can' for permission",
    "Omitting the modal verb",
    "Incorrect word order in questions",
    "Using past tense modal incorrectly for present/future permission"
  ]
},
"Possessive adjectives, possessive pronouns, reflexive pronouns": {
  rule: "Use possessive adjectives (my, your, his, her, its, our, their) before nouns to show ownership. Use possessive pronouns (mine, yours, his, hers, ours, theirs) to replace nouns. Use reflexive pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) when the subject and object are the same person or thing.",
  allowedAnswers: [
    "my","your","his","her","its","our","their",
    "mine","yours","his","hers","ours","theirs",
    "myself","yourself","himself","herself","itself","ourselves","yourselves","themselves"
  ],
  examples: [
    "This is my book. (possessive adjective)",
    "This book is mine. (possessive pronoun)",
    "She taught herself to play the piano. (reflexive pronoun)",
    "We enjoyed ourselves at the party. (reflexive pronoun)"
  ],
  commonErrors: [
    "Using possessive adjective instead of possessive pronoun and vice versa",
    "Using reflexive pronoun when not needed",
    "Forgetting agreement with the subject",
    "Confusing 'its' and 'it's'"
  ]
},
"Reported speech: use the correct verb form when reporting speech": {
  rule: "In reported speech, change the verb tense back one step (backshift) when the reporting verb is in the past. Adjust pronouns, time expressions, and word order as needed. Questions and commands require auxiliary or modal adjustments.",
  allowedAnswers: [],
  examples: [
    `"I am tired," she said. → She said she was tired.`,
    `"I will call you tomorrow," he promised. → He promised he would call me the next day.`,
    `"Do you like pizza?" asked Tom. → Tom asked if I liked pizza.`,
    `"Please close the door," she said. → She asked me to close the door.`
  ],
  commonErrors: [
    "Not backshifting the tense when reporting past speech",
    "Failing to change pronouns correctly",
    "Leaving questions in direct word order",
    "Incorrectly using 'will' instead of 'would' in past reporting"
  ]
},"Past simple - regular verbs and irregular verbs in affirmative or negative sentences and questions ": {
  rule: "Use past simple for completed actions in the past. Regular verbs add -ed; irregular verbs have specific past forms (e.g., was/were, had, went, saw, ate, drank). Use 'did' for questions and 'did not'/'didn't' for negatives. Ensure correct subject-verb agreement and verb forms.",
  allowedAnswers: [],
  examples: [
    "I visited my grandparents yesterday. (affirmative, regular)",
    "She ate lunch at noon. (affirmative, irregular)",
    "I did not watch TV last night. (negative, regular)",
    "Did you see the film yesterday? (question, irregular)"
  ],
  commonErrors: [
    "Using base form for past actions",
    "Regularizing irregular verbs",
    "Forgetting -ed on regular verbs",
    "Incorrect auxiliary usage in questions/negatives"
  ]
},"Adverbs of frequency and their correct placement in affirmative sentences: often, never, usually, always, sometimes, seldom, hardly ever": {
  rule: "Place adverbs of frequency (often, never, usually, always, sometimes, seldom, hardly ever) before the main verb in affirmative and negative sentences, but after the verb 'to be'.",
  allowedAnswers: ["often","never","usually","always","sometimes","seldom","hardly ever"],
  examples: [
    "I often go to the gym. (affirmative)",
    "She never eats meat. (negative)",
    "He is usually on time. (with 'to be')",
    "They hardly ever watch TV. (negative)"
  ],
  commonErrors: [
    "Placing the adverb after the main verb incorrectly",
    "Placing the adverb incorrectly with 'to be'",
    "Omitting the adverb entirely",
    "Confusing affirmative and negative sentence placement"
  ]
},

//  ====================== C----------------------------
"Short answers in the Present simple and present continuous": {
  rule: "Use short answers by repeating the auxiliary verb from the main question. For present simple, use do/does; for present continuous, use am/is/are. Affirmative questions take negative short answers, negative questions take positive short answers. Ensure subject-verb agreement and correct auxiliary usage for complex subjects.",
  allowedAnswers: [
    "Yes, I do","No, I don't",
    "Yes, he does","No, he doesn't",
    "Yes, she does","No, she doesn't",
    "Yes, we do","No, we don't",
    "Yes, they are","No, they aren't",
    "Yes, he is","No, he isn't",
    "Yes, she is","No, she isn't"
  ],
  examples: [
    "Do you like coffee? — Yes, I do.",
    "Does she play tennis? — No, she doesn't.",
    "Are they coming now? — Yes, they are.",
    "Is he working? — No, he isn't."
  ],
  commonErrors: [
    "Using the full verb instead of a short answer",
    "Incorrect auxiliary for the tense",
    "Mismatching subject and auxiliary",
    "Incorrect polarity (positive/negative)"
  ]
},"Question tags in the Present simple and present continuous": {
  rule: "Form question tags by repeating the auxiliary verb from the main sentence. Positive sentences take negative tags, negative sentences take positive tags. Use do/does for present simple, am/is/are for present continuous. The subject must match the main sentence, including compound subjects or collective nouns.",
  allowedAnswers: [
    "aren't you?","isn't he?","isn't she?","aren't they?",
    "don't you?","doesn't he?","doesn't she?","don't they?",
    "isn't it?","aren't we?","doesn't it?"
  ],
  examples: [
    "You like coffee, don't you?",
    "She is working hard, isn't she?",
    "They aren't coming, are they?",
    "The team is ready, isn't it?",
    "We are going, aren't we?"
  ],
  commonErrors: [
    "Using wrong auxiliary in the tag",
    "Incorrect polarity (positive/negative)",
    "Mismatching subject in the tag",
    "Confusing present simple and continuous forms"
  ]
},"Present simple vs continuous": {
  rule: "Use the present simple for routines, habits, and permanent situations. Use the present continuous for actions happening now or temporary situations. Ensure correct auxiliary 'am/is/are' in continuous forms, 'do/does' in negatives and questions, and proper subject-verb agreement, especially with complex subjects.",
  allowedAnswers: [],
  examples: [
    "I usually go to school by bus. (present simple, routine)",
    "She works in London. (present simple, permanent)",
    "He is reading a book now. (present continuous, action happening now)",
    "They are playing football at the moment. (present continuous, temporary action)"
  ],
  commonErrors: [
    "Using present continuous for routines",
    "Using present simple for actions happening now",
    "Forgetting auxiliary verbs in questions or negatives",
    "Mismatching subject-verb agreement"
  ]
},"Comparative and superlative adjectives short vs long adjectives and regular and irreglar forms": {
  rule: "Use short adjectives (one syllable, sometimes two) with -er for comparatives and -est for superlatives. Use 'more' for long adjectives for comparatives and 'most' for superlatives. Irregular adjectives have specific forms that must be memorized. Ensure correct spelling and agreement, especially in complex sentences.",
  allowedAnswers: [],
  examples: [
    "This car is faster than mine. (comparative, short adjective)",
    "She is the tallest in the class. (superlative, short adjective)",
    "He is more intelligent than his brother. (comparative, long adjective)",
    "She is the most beautiful singer. (superlative, long adjective)",
    "Good → better → best (irregular forms)"
  ],
  commonErrors: [
    "Adding -er/-est to long adjectives",
    "Using 'more/most' with short adjectives unnecessarily",
    "Forgetting irregular forms",
    "Incorrect spelling for comparatives/superlatives"
  ]
},"Past simple (regular & irregular) in affirmative sentences and questions": {
  rule: "Use past simple for completed actions in the past. Regular verbs add -ed; irregular verbs have specific past forms. Use 'did' for questions and 'did not'/'didn't' for negatives. Ensure correct subject-verb agreement and consistency with past time markers. Apply correctly in complex sentences and with compound subjects.",
  allowedAnswers: [],
  examples: [
    "I visited my grandparents yesterday. (affirmative, regular)",
    "She ate lunch at noon. (affirmative, irregular)",
    "I did not watch TV last night. (negative, regular)",
    "Did you see the film yesterday? (question, irregular)",
    "They didn't go to the museum, but they visited the park. (negative + compound sentence)"
  ],
  commonErrors: [
    "Using base form instead of past form",
    "Regularizing irregular verbs",
    "Incorrect auxiliary in questions/negatives",
    "Mismatching subject and verb in complex sentences"
  ]
},"Present perfect vs past simple with for, since, ago, during": {
  rule: "Use past simple for completed actions at a specific time in the past. Use present perfect for actions with relevance to the present or continuing actions. Use 'since' for the starting point of an ongoing action, 'for' for duration, 'ago' for a completed past action, and 'during' for a period in the past. Ensure correct auxiliary 'have/has + past participle' in present perfect.",
  allowedAnswers: [],
  examples: [
    "I met her two years ago. (past simple + ago)",
    "She has lived here since 2010. (present perfect + since)",
    "We have studied French for three years. (present perfect + for)",
    "He visited Paris during his holidays. (past simple + during)",
    "I have known him since we were children. (present perfect + since)"
  ],
  commonErrors: [
    "Using 'since' with past simple",
    "Using 'ago' with present perfect",
    "Omitting 'have/has' in present perfect",
    "Confusing 'for' and 'during'"
  ]
},"Relative pronouns in relative clauses: who, which, that, where, when, whose, whom : using them to avoid repetitions and turn two sentence into one": {
  rule: "Use relative pronouns to combine two clauses and avoid repetition. 'Who' refers to people, 'which' to things, 'that' to people or things, 'where' to places, 'when' to times, 'whose' for possession, 'whom' refers to people when they are objects of of a verb or preposition usually in formal contexts. If you can replace it with him or her (or another object pronoun), use whom. Ensure correct placement and agreement with the antecedent, especially in complex sentences.",
  allowedAnswers: [],
  examples: [
    "The man who called you is my uncle.",
    "This is the book which I bought yesterday.",
    "She visited the town where she was born.",
    "I remember the day when we met.",
    "The student whose bag was stolen is here.",
    "The person whom I met yesterday is a teacher."
  ],
  commonErrors: [
    "Using 'which' for people",
    "Omitting the relative pronoun",
    "Misplacing the relative clause",
    "Using the wrong relative pronoun for possession or object"
  ]
},
"If/ when clauses in the future and past tenses: using the proper verb forms": {
  rule: "Use 'if' or 'when' to introduce conditional clauses. For first conditional (future real), use present simple in the 'if' clause and 'will + base verb' in the main clause. For past conditions (second conditional), use past simple in the 'if' clause and 'would + base verb' in the main clause. Ensure correct subject-verb agreement and time markers.",
  allowedAnswers: [],
  examples: [
    "If it rains tomorrow, we will stay at home. (first conditional, future)",
    "When she arrives, we will start the meeting. (future time clause)",
    "If I won the lottery, I would travel the world. (second conditional, past hypothetical)",
    "If he had studied harder, he would have passed the exam. (third conditional, past perfect)"
  ],
  commonErrors: [
    "Using 'will' in the 'if' clause of first conditional",
    "Mismatching tenses in conditional clauses",
    "Omitting auxiliary 'would' in second/third conditionals",
    "Incorrect subject-verb agreement in 'if' clause"
  ]
},
"Modal verbs and expressions: permission vs obligation in the present, past and future": {
  rule: "Use modal verbs to express permission ('can', 'may', 'could') and obligation ('must', 'have to', 'should') in present, past, and future contexts. Adjust tense and auxiliary correctly. Ensure correct word order and polarity in statements and questions.",
  allowedAnswers: [
    "can","may","could","must","have to","should"
  ],
  examples: [
    "You can leave early today. (present permission)",
    "She had to finish her homework yesterday. (past obligation)",
    "We may attend the meeting tomorrow. (future permission)",
    "He must complete the report by Friday. (present obligation)",
    "Could I borrow your notes? (polite past/future permission)"
  ],
  commonErrors: [
    "Using wrong modal for permission/obligation",
    "Incorrect tense with modals",
    "Incorrect word order in questions",
    "Mixing permission and obligation modals"
  ]
},
"Modal verbs and expressions: possibility vs certainty in the present, past and future": {
  rule: "Use modal verbs to express possibility ('may', 'might', 'could') and certainty ('must', 'can't') in present, past, and future contexts. Ensure correct auxiliary and tense, and match polarity to the meaning (affirmative, negative, or question).",
  allowedAnswers: [
    "may","might","could","must","can't"
  ],
  examples: [
    "It may rain tomorrow. (future possibility)",
    "She might have forgotten the meeting. (past possibility)",
    "He must be at work now. (present certainty)",
    "That can't be true! (present impossibility)",
    "They could be late for the train. (present/future possibility)"
  ],
  commonErrors: [
    "Confusing modals for possibility and certainty",
    "Using incorrect tense with modals",
    "Incorrect polarity for certainty/possibility",
    "Omitting modal auxiliary"
  ]
},
"Reported speech: use the correct verb form when reporting speech": {
  rule: "In reported speech, backshift the tense when the reporting verb is in the past. Adjust pronouns, time expressions, and word order as needed. Questions, commands, and requests require auxiliary or modal adjustments. Ensure consistency in complex sentences and indirect speech with multiple clauses.",
  allowedAnswers: [],
  examples: [
    `I am tired," she said. → She said she was tired.`,
    `I will call you tomorrow," he promised. → He promised he would call me the next day.`,
    `Do you like pizza?" asked Tom. → Tom asked if I liked pizza.`,
    `Please close the door," she said. → She asked me to close the door.`,
    `I have been working hard," he said. → He said he had been working hard.`
  ],
  commonErrors: [
    "Not backshifting the tense for past reporting verbs",
    "Incorrect pronoun adjustments",
    "Failing to change word order in reported questions",
    "Mixing direct and indirect speech in complex sentences"
  ]
},
"linking words: but, however, although, on the other hand, then, before, while, finally, in order to": {
  rule: "Use linking words to connect ideas, show contrast, sequence events, or indicate purpose. Choose the appropriate word depending on meaning and sentence structure. Ensure correct punctuation, tense, and clause placement for clarity and cohesion.",
  allowedAnswers: [],
  examples: [
    "I wanted to go, but I was too tired.",
    "He studied hard; however, he didn't pass the exam.",
    "Although it was raining, we went for a walk.",
    "On the other hand, we could stay home.",
    "First we went shopping, then we had lunch.",
    "She left early before the meeting started.",
    "While I was reading, the phone rang.",
    "Finally, we finished the project.",
    "He studied hard in order to pass the exam."
  ],
  commonErrors: [
    "Using the wrong linking word for the context",
    "Incorrect punctuation with connectors",
    "Misplacing the connector in the sentence",
    "Mixing tenses or clauses incorrectly"
  ]
},
"Adverbs of frequency and their correct placement in affirmative or negative sentences: often, never, usually, always, sometimes, seldom, hardly ever": {
  rule: "Place adverbs of frequency (often, never, usually, always, sometimes, seldom, hardly ever) before the main verb in affirmative and negative sentences, but after the verb 'to be'. Ensure correct placement in complex and compound sentences.",
  allowedAnswers: ["often","never","usually","always","sometimes","seldom","hardly ever"],
  examples: [
    "I often go to the gym. (affirmative)",
    "She never eats meat. (negative)",
    "He is usually on time. (with 'to be')",
    "They hardly ever watch TV. (negative)",
    "We seldom eat out, but when we do, we enjoy it. (complex sentence)"
  ],
  commonErrors: [
    "Placing the adverb after the main verb incorrectly",
    "Placing the adverb incorrectly with 'to be'",
    "Omitting the adverb entirely",
    "Confusing affirmative and negative sentence placement"
  ]
}

};