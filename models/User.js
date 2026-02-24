const mongoose = require('mongoose');
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  es2015 destructuring


const userSchema = new Schema ({
    googleId : String,
    numberOfReadings: {type: Number, default: 0},
    type: {type: String, default: 'guest'},
    email: String,
    hasReviews: {type: Boolean, default: false},
    level:String,

})

mongoose.model('users',userSchema);