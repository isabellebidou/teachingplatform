
// in terminal : node seeds/grammar.seed.js
import mongoose from "mongoose";
import keys from "../config/keys.js";
import GrammarTopic from "../models/GrammarTopic.js";

import {
  grammarA1,
  //grammarA2,
  //grammarB,
  //grammarC
} from "./data/grammar.data.js";

import { grammarRules } from "./data/grammar.rule.js";

const normalizeTopic = (topicName, level) => {
  const ruleConfig = grammarRules[topicName];

  if (!ruleConfig) {
    throw new Error(`❌ Missing grammar rule for: "${topicName}"`);
  }
  /*
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["A1", "A2", "B", "C"],
    required: true
  },
  rule:{
    type: String,
    required: true
  },
  allowedAnswers: {
    type: [String],
    default: []
  },
  allowedIncorrectAnswers: {
    type: [String],
    default: []
  },
  suggestions:{
    type: [String],
    default: []
  },
  numberOfOptions:{
    type: Number,
    default:null
  },
  examples: {
    type: [String], // optional teacher examples
    default: []
  },
  commonErrors: {
    type: [String],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  }
  */

  return {
    name: topicName,
    level,
    rule: ruleConfig.rule,
    allowedAnswers: ruleConfig.allowedAnswers || [],
    allowedIncorrectAnswers: ruleConfig.allowedIncorrectAnswers ||[],
    suggestions:ruleConfig.suggestions ||[],
    numberOfOptions: ruleConfig.numberOfOptions ||null,
    examples: ruleConfig.examples || [],
    commonErrors: ruleConfig.commonErrors || []
  };
};

// checking before seeding
/*
(async () => {
  try {
    const grammarTopics = [
      ...grammarA1.map(t => normalizeTopic(t, "A1"))
     
    ];
      console.log("grammarTopics",grammarTopics);

  } catch (error) {
    console.error("❌ Error checking grammar topics:", error.message);
    process.exit(1);
  }
}


)();
*/
// seeding

(async () => {
  try {
    await mongoose.connect(keys.mongoURI);

    const grammarTopics = [
      ...grammarA1.map(t => normalizeTopic(t, "A1")),
     // ...grammarA2.map(t => normalizeTopic(t, "A2")),
     // ...grammarB.map(t => normalizeTopic(t, "B")),
    //  ...grammarC.map(t => normalizeTopic(t, "C"))
    ];

    await GrammarTopic.deleteMany({});
    await GrammarTopic.insertMany(grammarTopics);

    console.log("✅ Grammar topics seeded successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding grammar topics:", error.message);
    process.exit(1);
  }
}


)();