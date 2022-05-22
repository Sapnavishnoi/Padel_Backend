const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let homeSchema = new Schema({
    title:{
        type: String
    },
    tagLine:[{type: String}]
    ,
   

    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'home' });


module.exports = mongoose.model('Home', homeSchema);



