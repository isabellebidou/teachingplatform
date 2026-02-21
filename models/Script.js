const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring

const scriptSchema = new Schema ({
    sentence: String,
    difficulty: String,
    common_mistake_transcriptions:[{
    type: String
}]
    
})
mongoose.model("Script",scriptSchema);