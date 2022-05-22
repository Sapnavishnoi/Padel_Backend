const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TermSchema = new Schema({
   content:{
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'terms' });


module.exports = mongoose.model('Terms',TermSchema);



