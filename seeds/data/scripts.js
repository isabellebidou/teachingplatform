export default [

  // =========================
  // 🔁 PAIRS (noun vs verb)
  // =========================

  {
    sentence: "I record a new record",
    visual: "I reCORD a new REcord",
    difficulty: "A2",
    partsOfSpeech: { record: ["verb", "noun"] },
    targetVowels: [
      { word: "I", vowel: "I", targetVowel: "aɪ" },
    ],
  },

  {
    sentence: "She will present a present",
    visual: "She will preSENT a PREsent",
    difficulty: "A2",
    partsOfSpeech: { present: ["verb", "noun"] },
    targetVowels: [],
  },

  {
    sentence: "The project will project growth",
    visual: "The PROject will proJECT growth",
    difficulty: "B1",
    partsOfSpeech: { project: ["noun", "verb"] },
    targetVowels: [],
  },

  {
    sentence: "This object may object to change",
    visual: "This OBject may obJECT to change",
    difficulty: "B1",
    partsOfSpeech: { object: ["noun", "verb"] },
    targetVowels: [],
  },

  {
    sentence: "The contract will contract next year",
    visual: "The CONtract will conTRACT next year",
    difficulty: "B1",
    partsOfSpeech: { contract: ["noun", "verb"] },
    targetVowels: [],
  },

  {
    sentence: "His progress will progress quickly",
    visual: "His PROgress will proGRESS quickly",
    difficulty: "B1",
    partsOfSpeech: { progress: ["noun", "verb"] },
    targetVowels: [
      { word: "His", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🟢 RULE 1 – verbs (2 syllables)
  // =========================

  {
    sentence: "I record a short message",
    visual: "I reCORD a short MESsage",
    difficulty: "A2",
    partsOfSpeech: { record: "verb" },
    targetVowels: [
      { word: "I", vowel: "I", targetVowel: "aɪ" },
    ],
  },

  {
    sentence: "They prefer to relax at home",
    visual: "They preFER to reLAX at home",
    difficulty: "A2",
    partsOfSpeech: { prefer: "verb", relax: "verb" },
    targetVowels: [],
  },

  {
    sentence: "We decide to begin the lesson",
    visual: "We deCIDE to beGIN the LESson",
    difficulty: "A2",
    partsOfSpeech: { decide: "verb", begin: "verb" },
    targetVowels: [
      { word: "decide", vowel: "i", targetVowel: "aɪ" },
      { word: "begin", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "They discuss important topics",
    visual: "They disCUSS imPORtant TOPics",
    difficulty: "B1",
    partsOfSpeech: { discuss: "verb" },
    targetVowels: [
      { word: "discuss", vowel: "i", targetVowel: "ɪ" },
      { word: "important", vowel: "i", targetVowel: "ɪ" },
      { word: "topics", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🔴 Exceptions
  // =========================

  {
    sentence: "We open the door and follow him",
    visual: "We OPen the DOOR and FOllow him",
    difficulty: "A2",
    partsOfSpeech: { open: "verb", follow: "verb" },
    targetVowels: [
      { word: "him", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "They offer help and answer quickly",
    visual: "They OFfer HELP and ANswer QUICKly",
    difficulty: "B1",
    partsOfSpeech: { offer: "verb", answer: "verb" },
    targetVowels: [
      { word: "quickly", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🟡 RULE 2 – nouns/adjectives
  // =========================

  {
    sentence: "The problem is simple and clear",
    visual: "The PROblem is SIMple and CLEAR",
    difficulty: "A2",
    partsOfSpeech: { problem: "noun", simple: "adjective" },
    targetVowels: [
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "simple", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "We live in a quiet city",
    visual: "We LIVE in a QUIet CIty",
    difficulty: "A2",
    partsOfSpeech: { quiet: "adjective", city: "noun" },
    targetVowels: [
      { word: "live", vowel: "i", targetVowel: "ɪ" },
      { word: "in", vowel: "i", targetVowel: "ɪ" },
      { word: "city", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🔴 Exceptions
  // =========================

  {
    sentence: "She feels alone and afraid",
    visual: "She feels aLONE and aFRAID",
    difficulty: "A2",
    partsOfSpeech: { alone: "adjective", afraid: "adjective" },
    targetVowels: [],
  },

  {
    sentence: "He is polite and correct",
    visual: "He is poLITE and corRECT",
    difficulty: "A2",
    partsOfSpeech: { polite: "adjective", correct: "adjective" },
    targetVowels: [
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "polite", vowel: "i", targetVowel: "aɪ" },
    ],
  },


  // =========================
  // 🟣 RULE 3 – suffixes
  // =========================

  {
    sentence: "The information is important",
    visual: "The inforMAtion is imPORtant",
    difficulty: "A2",
    partsOfSpeech: { information: "noun", important: "adjective" },
    targetVowels: [
      { word: "information", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "important", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "Communication is essential today",
    visual: "CommuniCAtion is esSENtial toDAY",
    difficulty: "B1",
    partsOfSpeech: { communication: "noun" },
    targetVowels: [
      { word: "communication", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "This activity is scientific",
    visual: "This acTIvity is scienTIfic",
    difficulty: "B1",
    partsOfSpeech: { activity: "noun", scientific: "adjective" },
    targetVowels: [
      { word: "This", vowel: "i", targetVowel: "ɪ" },
      { word: "activity", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🔵 RULE 4 – 3 syllables
  // =========================

  {
    sentence: "I develop a beautiful idea",
    visual: "I deVELop a BEAUtiful iDEA",
    difficulty: "A2",
    partsOfSpeech: { develop: "verb", beautiful: "adjective" },
    targetVowels: [
      { word: "I", vowel: "I", targetVowel: "aɪ" },
    ],
  },

  {
    sentence: "They remember the holiday",
    visual: "They reMEMber the HOliday",
    difficulty: "A2",
    partsOfSpeech: { remember: "verb", holiday: "noun" },
    targetVowels: [
      { word: "holiday", vowel: "i", targetVowel: "ɪ" },
    ],
  },

  {
    sentence: "We consider a possible solution",
    visual: "We conSIDer a POSsible soLUtion",
    difficulty: "B1",
    partsOfSpeech: { consider: "verb", possible: "adjective" },
    targetVowels: [
      { word: "consider", vowel: "i", targetVowel: "ɪ" },
      { word: "possible", vowel: "i", targetVowel: "ɪ" },
    ],
  },


  // =========================
  // 🔴 C1 LONG TEXT
  // =========================

  {
    sentence: `In today’s political and economic environment, it is important to consider how individuals behave in different situations. A common problem is that people do not always analyse information carefully, especially when they are influenced by social media.

For example, a person might believe a particular idea without questioning its origin or validity. However, it is necessary to develop a more critical approach and to focus on reliable sources.

In conclusion, education plays a significant role in improving the way people think, communicate, and make decisions in modern society.`,

    visual: `In toDAY’s poLItical and ecoNOMic enVIronment, it is imPORtant to conSIDer how indiVIDuals beHAVE in DIfferent situaTIONS...
...eduCAtion plays a sigNIFicant ROLE in imPROving the WAY PEOple THINK...`,

    difficulty: "C1",

    partsOfSpeech: {
      consider: "verb",
      behave: "verb",
      analyse: "verb",
      develop: "verb",
      focus: "verb",

      political: "adjective",
      economic: "adjective",
      important: "adjective",
      critical: "adjective",
      reliable: "adjective",

      environment: "noun",
      information: "noun",
      education: "noun",
      society: "noun"
    },

    targetVowels: [
      { word: "In", vowel: "i", targetVowel: "ɪ" },
      { word: "political", vowel: "i", targetVowel: "ɪ" },
      { word: "it", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "important", vowel: "i", targetVowel: "ɪ" },
      { word: "consider", vowel: "i", targetVowel: "ɪ" },
      { word: "individuals", vowel: "i", targetVowel: "ɪ" },
      { word: "in", vowel: "i", targetVowel: "ɪ" },
      { word: "different", vowel: "i", targetVowel: "ɪ" },
      { word: "situations", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "information", vowel: "i", targetVowel: "ɪ" },
      { word: "especially", vowel: "i", targetVowel: "ɪ" },
      { word: "influenced", vowel: "i", targetVowel: "ɪ" },
      { word: "social", vowel: "i", targetVowel: "əʊ" },
      { word: "media", vowel: "i", targetVowel: "iː" },
      { word: "example", vowel: "i", targetVowel: "ɪ" },
      { word: "might", vowel: "i", targetVowel: "aɪ" },
      { word: "particular", vowel: "i", targetVowel: "ɪ" },
      { word: "idea", vowel: "i", targetVowel: "aɪ" },
      { word: "without", vowel: "i", targetVowel: "ɪ" },
      { word: "its", vowel: "i", targetVowel: "ɪ" },
      { word: "origin", vowel: "i", targetVowel: "ɪ" },
      { word: "validity", vowel: "i", targetVowel: "ɪ" },
      { word: "it", vowel: "i", targetVowel: "ɪ" },
      { word: "is", vowel: "i", targetVowel: "ɪ" },
      { word: "necessary", vowel: "i", targetVowel: "ɪ" },
      { word: "critical", vowel: "i", targetVowel: "ɪ" },
      { word: "reliable", vowel: "i", targetVowel: "ɪ" },
      { word: "In", vowel: "i", targetVowel: "ɪ" },
      { word: "significant", vowel: "i", targetVowel: "ɪ" },
      { word: "improving", vowel: "i", targetVowel: "ɪ" },
      { word: "think", vowel: "i", targetVowel: "ɪ" },
      { word: "decisions", vowel: "i", targetVowel: "ɪ" },
      { word: "society", vowel: "i", targetVowel: "ɪ" },
    ],
  },

];