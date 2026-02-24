const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring



const documentSchema = new Schema ({
    _user: {type:Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    path: String,
    title: String,
    
})

mongoose.model('documents',documentSchema);