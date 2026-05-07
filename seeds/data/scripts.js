export default [

  // =========================
  // 🔁 PAIRS (noun vs verb)
  // =========================

  {
    sentence: "I record a new record",
    visual: "I reCORD a new REcord",
    difficulty: "A2",
    partsOfSpeech: { record: ["verb", "noun"] }
  },
  {
    sentence: "She will present a present",
    visual: "She will preSENT a PREsent",
    difficulty: "A2",
    partsOfSpeech: { present: ["verb", "noun"] }
  },
  {
    sentence: "The project will project growth",
    visual: "The PROject will proJECT growth",
    difficulty: "B1",
    partsOfSpeech: { project: ["noun", "verb"] }
  },
  {
    sentence: "This object may object to change",
    visual: "This OBject may obJECT to change",
    difficulty: "B1",
    partsOfSpeech: { object: ["noun", "verb"] }
  },
  {
    sentence: "The contract will contract next year",
    visual: "The CONtract will conTRACT next year",
    difficulty: "B1",
    partsOfSpeech: { contract: ["noun", "verb"] }
  },
  {
    sentence: "His progress will progress quickly",
    visual: "His PROgress will proGRESS quickly",
    difficulty: "B1",
    partsOfSpeech: { progress: ["noun", "verb"] }
  },

  // =========================
  // 🟢 RULE 1 – verbs (2 syllables)
  // =========================

  {
    sentence: "I record a short message",
    visual: "I reCORD a short MESsage",
    difficulty: "A2",
    partsOfSpeech: { record: "verb" }
  },
  {
    sentence: "They prefer to relax at home",
    visual: "They preFER to reLAX at home",
    difficulty: "A2",
    partsOfSpeech: { prefer: "verb", relax: "verb" }
  },
  {
    sentence: "We decide to begin the lesson",
    visual: "We deCIDE to beGIN the LESson",
    difficulty: "A2",
    partsOfSpeech: { decide: "verb", begin: "verb" }
  },
  {
    sentence: "They discuss important topics",
    visual: "They disCUSS imPORtant TOPics",
    difficulty: "B1",
    partsOfSpeech: { discuss: "verb" }
  },

  // 🔴 Exceptions
  {
    sentence: "We open the door and follow him",
    visual: "We OPen the DOOR and FOllow him",
    difficulty: "A2",
    partsOfSpeech: { open: "verb", follow: "verb" }
  },
  {
    sentence: "They offer help and answer quickly",
    visual: "They OFfer HELP and ANswer QUICKly",
    difficulty: "B1",
    partsOfSpeech: { offer: "verb", answer: "verb" }
  },

  // =========================
  // 🟡 RULE 2 – nouns/adjectives
  // =========================

  {
    sentence: "The problem is simple and clear",
    visual: "The PROblem is SIMple and CLEAR",
    difficulty: "A2",
    partsOfSpeech: { problem: "noun", simple: "adjective" }
  },
  {
    sentence: "We live in a quiet city",
    visual: "We LIVE in a QUIet CIty",
    difficulty: "A2",
    partsOfSpeech: { quiet: "adjective", city: "noun" }
  },

  // 🔴 Exceptions
  {
    sentence: "She feels alone and afraid",
    visual: "She feels aLONE and aFRAID",
    difficulty: "A2",
    partsOfSpeech: { alone: "adjective", afraid: "adjective" }
  },
  {
    sentence: "He is polite and correct",
    visual: "He is poLITE and corRECT",
    difficulty: "A2",
    partsOfSpeech: { polite: "adjective", correct: "adjective" }
  },

  // =========================
  // 🟣 RULE 3 – suffixes
  // =========================

  {
    sentence: "The information is important",
    visual: "The inforMAtion is imPORtant",
    difficulty: "A2",
    partsOfSpeech: { information: "noun", important: "adjective" }
  },
  {
    sentence: "Communication is essential today",
    visual: "CommuniCAtion is esSENtial toDAY",
    difficulty: "B1",
    partsOfSpeech: { communication: "noun" }
  },
  {
    sentence: "This activity is scientific",
    visual: "This acTIvity is scienTIfic",
    difficulty: "B1",
    partsOfSpeech: { activity: "noun", scientific: "adjective" }
  },

  // =========================
  // 🔵 RULE 4 – 3 syllables
  // =========================

  {
    sentence: "I develop a beautiful idea",
    visual: "I deVELop a BEAUtiful iDEA",
    difficulty: "A2",
    partsOfSpeech: { develop: "verb", beautiful: "adjective" }
  },
  {
    sentence: "They remember the holiday",
    visual: "They reMEMber the HOliday",
    difficulty: "A2",
    partsOfSpeech: { remember: "verb", holiday: "noun" }
  },
  {
    sentence: "We consider a possible solution",
    visual: "We conSIDer a POSsible soLUtion",
    difficulty: "B1",
    partsOfSpeech: { consider: "verb", possible: "adjective" }
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
    }
  }

];