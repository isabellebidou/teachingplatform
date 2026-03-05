// grammar.rule.js
import verbsByLevel from "./verbsByLevel.js";
import verbsIngByLevel from "./verbsIngByLevel.js";
import beAuxiliariesByLevel from "./beAuxiliariesByLevel.js";
import doAuxiliariesByLevel from "./doAuxiliariesByLevel.js";
import irregularVerbsInfinitiveByLevel from "./irregularVerbsInfinitiveByLevel.js";
import irregularVerbsPastByLevel from "./irregularVerbsPastByLevel.js";

// Subject pronouns
const subjectPronouns = ["I","you","he","she","it","we","they"];

// -----------------------
// 1️⃣ Helper functions
// -----------------------
function toThirdPerson(verb) {
  if (verb === "be") return "is";
  if (verb === "have") return "has";
  if (verb.endsWith("y") && !/[aeiou]y$/.test(verb)) return verb.slice(0,-1) + "ies";
  if (/(s|sh|ch|x|z|o)$/.test(verb)) return verb + "es";
  return verb + "s";
}

function toEd(verb) {
  // like → liked
  if (verb.endsWith("e")) {
    return verb + "d";
  }
  // study → studied
  if (verb.endsWith("y") && !/[aeiou]y$/.test(verb)) {
    return verb.slice(0, -1) + "ied";
  }
  // stop → stopped
  if (/^[a-z]*[aeiou][^aeiouy]$/.test(verb) && verb.length > 2) {
    return verb + verb.slice(-1) + "ed";
  }
  // work → worked
  return verb + "ed";
}

// -----------------------
// 2️⃣ Generate Present Simple
// -----------------------
function generatePresentSimpleByLevel(verbsByLevel) {
  return Object.fromEntries(
    Object.entries(verbsByLevel).map(([level, verbs]) => [
      level,
      {
        base: verbs,
        thirdPerson: verbs.map(toThirdPerson)
      }
    ])
  );
}
const presentSimpleByLevel = generatePresentSimpleByLevel(verbsByLevel);

// -----------------------
// 3️⃣ Generate Past Simple
// -----------------------
function generatePastSimpleByLevel(verbsByLevel) {
  return Object.fromEntries(
    Object.entries(verbsByLevel).map(([level, verbs]) => [
      level,
      {
        base: verbs,
        ed: verbs.map(toEd)
      }
    ])
  );
}
const pastSimpleByLevel = generatePastSimpleByLevel(verbsByLevel);

// -----------------------
// 4️⃣ Build allowed BE auxiliaries
// -----------------------
const allowedBeAuxA1 = beAuxiliariesByLevel.A1.affirmative.flatMap(aux =>//["am walking", "am eating", "is walking", ...]
  verbsIngByLevel.A1_A2.map(v => `${aux} ${v}`)
);

const allowedBeAuxA2 = [
  ...beAuxiliariesByLevel.A2.questions,
  ...beAuxiliariesByLevel.A2.negative,
  ...beAuxiliariesByLevel.A2.contractionsNegative
].flatMap(aux =>
  verbsIngByLevel.A1_A2.map(v => `${aux} ${v}`)
);

// -----------------------
// 5️⃣ Build allowed DO auxiliaries
// -----------------------
const allowedDoAuxA1 = doAuxiliariesByLevel.A1.affirmative.flatMap(aux =>
  verbsIngByLevel.A1_A2.map(v => `${aux} ${v}`)
);

const allowedDoAuxA2 = [
  ...doAuxiliariesByLevel.A2.questions,
  ...doAuxiliariesByLevel.A2.negative,
  ...doAuxiliariesByLevel.A2.contractionsNegative
].flatMap(aux =>
  verbsIngByLevel.A1_A2.map(v => `${aux} ${v}`)
);

// -----------------------
// 6 Build pronoun + base verbs => you, to walk
// -----------------------
const allowedBaseVerbSuggestionsWithLeadingPronouns = subjectPronouns.flatMap(pronoun =>
  verbsByLevel.A1_A2.map(v => `${pronoun}, to ${v}`)
);

// -----------------------
// 6 Build pronoun + base verbs => you, to not walk
// -----------------------
const allowedBaseVerbSuggestionsWithLeadingPronounsNot = subjectPronouns.flatMap(pronoun =>
  verbsByLevel.A1_A2.map(v => `${pronoun}, to not ${v}`)
);

// -----------------------
// 7 Build pronoun + verbs ed => you walked
// -----------------------
const irregularVerbs = ["be","go","eat","drink","see","have","do","say","make","get"];

const correctPast = pastSimpleByLevel.A1_A2.ed.filter(v =>
  !["bed","haved","beed","maked","goed","eatted","drinked", "seed","seeed","haveed","doed","sayed","makeed","getted"].includes(v)
);

const incorrectPast = pastSimpleByLevel.A1_A2.ed.filter(v =>
  ["bed","haved","beed","maked","goed","eatted","drinked", "seed","seeed","haveed","doed","sayed","makeed","getted"].includes(v)
);
const allowedPastSimpleAnswersWithLeadingPronouns = subjectPronouns.flatMap(pronoun =>
  correctPast.map(v => `${pronoun} ${v}`)
);

const allowedIncorrectPastSimpleAnswersWithLeadingPronouns = subjectPronouns.flatMap(pronoun =>
  incorrectPast.map(v => `${pronoun} ${v}`)
);

// -----------------------
// 8 Build pronoun + contractionsNegative +base verbs => you didn't walk
// -----------------------
const allowedPastSimpleAnswersWithLeadingPronounsNot = subjectPronouns.flatMap(pronoun =>
  verbsByLevel.A1_A2
    .filter(v => v !== "be")
    .map(v => `${pronoun} didn't ${v}`)
);



export const grammarRules = {
  // ----- A1 -----
  "Present simple (affirmative, negative, interrogative)": {
    rule: "Use the present simple for habits, routines, and permanent situations in affirmative or negative sentences or questions. Use do/does for negatives and questions. Use the 's'in thr 3rd person in affirmative sentences",
    allowedAnswers: [...presentSimpleByLevel.A1_A2.base.concat(presentSimpleByLevel.A1_A2.thirdPerson)],
    allowedIncorrectAnswers:verbsIngByLevel.A1_A2,
    suggestions:verbsByLevel.A1_A2,
    numberOfOptions: 4,
    examples: [
      "I (to work)_________in London. => I work in London",
      "She doesn't (to like)__________ coffee.=> She doesn't like coffee.",
      "Do you (to play)_____________ tennis? => Do you play tennis?"
    ],
    commonErrors: [
      "Forgetting the -s in the third person singular",
      "Using the -s in negative sentences or questions",
      "Using present continuous for routines"
    ]
  },
  "Short answers in the Present simple": {
    rule: "Complete the short answers with do/does for present simple questions. Positive questions take negative short answers and vice versa.",
    allowedAnswers: doAuxiliariesByLevel.A1.negative,
    allowedIncorrectAnswers: beAuxiliariesByLevel.A1.affirmative,
    numberOfOptions: 4,
    examples: [
      "Do you like pizza? — Yes, ___________. => Do you like pizza? — Yes, I do.",
      "Does she play tennis? — No, ___________. => Does she play tennis? — No, she doesn't"
    ],
    commonErrors: [
      "Using the wrong auxiliary",
      "using do in the 3rd person"
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
    numberOfOptions: 2,
    examples: [
      "I ________ swim. => I can swim",
      "You ________ finish your homework.=> You must finish your homework."
    ],
    commonErrors: [
      "Using 'can' for obligation",
      "Forgetting negative forms"
    ]
  },
  "Present continuous (affirmative)": {
    rule: "Use present continuous for actions happening now or temporary situations. Use am/is/are + verb+ing.",
    allowedAnswers: allowedBeAuxA1,
    allowedIncorrectAnswers:verbsByLevel.A1_A2,
    suggestions:verbsByLevel.A1_A2,
    numberOfOptions: 3,
    examples: [
      "She (to read)_____________ a book.=> She is reading a book."
    ],
    commonErrors: [
      "Forgetting the auxiliary verb",
      "Using base verb form"
    ]
  },
  "Short answers in the present continuous tense": {
    rule: "Use short answers with am/is/are for present continuous questions.",
    allowedAnswers: ["I am", "you are", "she is", "he is", "it is", "we are", "they are", "I'm not", "you aren't", "she isn't", "it isn't", "we aren't", "they aren't"],
    allowedIncorrectAnswers:["I is", "we is", "she are", "you is", "you isn't"],
    numberOfOptions: 3,
    examples: [
      "Are you working now? — Yes, _______.=> Are you working now? — Yes, I am.",
      "Is she cooking? — No, ___________.=> Is she cooking? — No, she isn't."
    ],
    commonErrors: [
      "Using do/does instead of am/is/are",
      "Repeating the main verb"
    ]
  },
  "Question tags in the present continuous tense": {
    rule: "Form question tags by repeating am/is/are from the main sentence.",
    allowedAnswers: ["isn't she?","aren't they?", "aren't you?", "isn't he"],
    allowedIncorrectAnswers:["doesn't he?", "don't you?", "isn't you?", "isn't they?"],
    numberOfOptions: 3,
    examples: [
      "She is singing, _________  =>She is singing, isn't she?",
      "We are late, _________ => We are late, aren't we?"
    ],
    commonErrors: [
      "Using do/does for continuous",
      "Wrong polarity"
    ]
  },
  "Definite vs indefinite articles and the Ø article": {
    rule: "Use 'a/an' for singular countable nouns. 'an' when the next word starts with a vowel except for silent 'h' or u. Use'the' for specific or previously identified nouns. Use the zero article (Ø) for plural/general nouns.",
    allowedAnswers: ["a","an","the","Ø"],
    numberOfOptions: 3,
    examples: [
      "There is _________cat in the garden. => There is a cat in the garden.",
      "There are two cats in the garden, one of them is black another is white. ________ black cat is sleeping.=> There two cats in the garden, one of them is black another is white. The black cat is sleeping.",
      "________Dogs are friendly animals. => Ø Dogs are friendly animals."
    ],
    commonErrors: [
      "Confusing a/an with the",
      "Using 'the' for general nouns instead of Ø"
    ]
  },
  "Present simple vs present continuous": { 
    rule: "Use present simple for habits, routines, and permanent situations. Use present continuous for actions happening now or temporary situations.",
    allowedAnswers: [...allowedBeAuxA1 ,...allowedDoAuxA1],
    numberOfOptions: 2,
    examples: [
      "I usually ___________ to school but I am walking to school now. => I usually walk to school but I am walking to school now.",
      "She is __________ in London today, but she usually works from home.=> She is working in London today, but she usually works from home."
    ],
    commonErrors: [
      "Using present continuous for permanent situations",
      "Using present simple for actions happening now"
    ]
  },
  "Comparative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Short adjectives take -er, long adjectives use 'more'. Irregular forms must be memorized.",
    allowedAnswers: [],
     numberOfOptions: 3,
    examples: [
      "This car is (fast)_________ than mine. => This car is faster than mine.",
      "She is (intelligent)___________ than her sister. => She is more intelligent than her sister."
    ],
    commonErrors: [
      "Using -er with long adjectives",
      "Incorrect irregular forms"
    ]
  },
  "Superlative adjectives: short vs long adjectives, regular vs irreglar forms": {
    rule: "Short adjectives take 'the ....-est ', long adjectives use ' the .....most'. Irregular forms must be memorized.",
    allowedAnswers: [],
    numberOfOptions: 3,
    examples: [
      "He is (tall)___________ boy in the class.=> He is the tallest boy in the class.",
      "She is (beautiful)__________ singer.=> She is the most beautiful singer."
    ],
    commonErrors: [
      "Using -est with long adjectives",
      "Incorrect irregular forms"
    ]
  },
  "Countable vs uncountable nouns and when to use some and any": {
    rule: "Use some with uncoutable nouns and with countable nouns in the plural. Use a ou an for countable nouns in the singular. Use some in affirmative sentences . Use any in negative sentences. Use any in questions when you ask if there is something. Use some in questions when you offer something.",
    allowedAnswers: ["some","any","a","an"],
    numberOfOptions: 2,
    examples: [
      "I have _________ apples.=> I have some apples.",
      "Do you have ________ bread? => Do you have any bread?",
      "I need _______ banana => I need a banana."
    ],
    commonErrors: [
      "Using a/an with uncountables",
      "Using some in negative sentences",
      "Pluralising uncountables"
    ]
  },
  "Quantifiers: some vs any, a lot of vs many, little vs few": {
    rule: "Use quantifiers to express quantity.  affirmative sentences . Use any in negative sentences. Use any in questions when you ask if there is something. Use some in questions when you offer something. Many for countable nouns, a lot of for both, few for countable, little for uncountable.",
    allowedAnswers: ["some","any","a lot of","many","few","little"],
    numberOfOptions: 2,
    examples: [
      "I have _______ friends. => I have many friends.",
      "There is _______ water left.=> There is little water left",
      "________ students like maths. => Few students like maths"
    ],
    commonErrors: [
      "Using many with uncountables",
      "Using little with countables",
      "Confusing some/any usage"
    ]
  },
  "Past simple (regular verbs)": {
    rule: "Use past simple for completed actions. Regular verbs add -ed. Use did/didn't for questions and negatives.",
    allowedAnswers: [...allowedPastSimpleAnswersWithLeadingPronouns.concat(allowedPastSimpleAnswersWithLeadingPronounsNot)],
    allowedIncorrectAnswers: allowedIncorrectPastSimpleAnswersWithLeadingPronouns,
    suggestions:[...allowedBaseVerbSuggestionsWithLeadingPronouns.concat(allowedBaseVerbSuggestionsWithLeadingPronounsNot)],
    numberOfOptions: 3,
    examples: [
      "(I, to visit)________ my grandparents.=> I visited my grandparents.",
      "(you, to watch)________ the film? => Did you watch the film?",
      "(She, not to play)_________ tennis => She didn't play tennis."
    ],
    commonErrors: [
      "Forgetting -ed",
      "Using past form after did/didn't",
      "Confusing past simple and present perfect"
    ]
  },
  "Past simple - regular and irregular verbs": {
    rule: "Use past simple for completed actions. Regular verbs add -ed. Irregular verbs use specific past forms: was/were, had, went, saw, ate, drank. Use did/didn't for questions/negatives.",
    allowedAnswers: [...correctPast, ...irregularVerbsPastByLevel.A1_A2],
    allowedIncorrectAnswers:[...incorrectPast,...presentSimpleByLevel.A1_A2.thirdPerson],
    suggestions: [...verbsByLevel.A1_A2 ,...irregularVerbsInfinitiveByLevel.A1_A2],
    numberOfOptions: 3,
    examples: [
      "I (go) ________to school yesterday. => I went to school yesterday.=> .",
      "She (cook) ______ cooked lunch.=> She cooked lunch.",

    ],
    commonErrors: [
      "Regularizing irregular verbs",
      "Confusing was/were"
    ]
  },
    "Wh- questions: what, who, when, where in the present simple": {
    rule: "Read the answers and use the correct wh- words at the beginning of questions.",
    allowedAnswers: ["what", "who", "when", "where"],
    numberOfOptions: 3,
    examples: [
     "__________is the dog? - The dog is in the garden.=> Where is the dog? - The dog is in the garden.",
     "__________ is eating an ice-cream? -  My sister is eating an ice-cream => Who is eating an ice-cream? -  My sister is eating an ice-cream."
    ]
  }
  // ----- A2 -----

};