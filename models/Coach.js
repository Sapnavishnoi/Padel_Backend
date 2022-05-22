const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let coachSchema = new Schema({
    profile:{
        type: String
    },
    name:{
        type: String
    },
    bio:{
        type: String
    },
    rating:{
        type: Number
    },
   

    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'coach' });


module.exports = mongoose.model('Coach', coachSchema);



