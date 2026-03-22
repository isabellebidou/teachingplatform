const mongoose = require('mongoose');
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  es2015 destructuring


const userSchema = new Schema ({
    googleId : String,
    numberOfDocuments: {type: Number, default: 0},
    type: {type: String, default: 'guest'},
    email: String,
    hasReviews: {type: Boolean, default: false},
    level:String,
    language:{type: String, default: 'en'}

})

mongoose.model('users',userSchema);