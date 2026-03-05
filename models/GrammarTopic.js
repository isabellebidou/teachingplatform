import mongoose from "mongoose";


const GrammarTopicSchema = new mongoose.Schema({
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
}, { timestamps: true });

GrammarTopicSchema.index({ level: 1 });

export default mongoose.model("GrammarTopic", GrammarTopicSchema);