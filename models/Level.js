
const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring


const LevelSchema = new Schema ({
  cefr: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    required: true,
    unique: true
  },
  frenchLabels: {
    type: [String], // ["5e", "4e"]
    default: []
  },
  description: String
}, { timestamps: true });
mongoose.model('Level',LevelSchema);
