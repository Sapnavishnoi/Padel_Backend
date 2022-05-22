const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let supportSchema = new Schema({
    query: {
        type: String
    },
    email: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'support' });


module.exports = mongoose.model('Support', supportSchema);



