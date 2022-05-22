const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let kidSchema = new Schema({
    user_id: {
        type: String
    },
    name: {
        type: String
    },
    dateOfBirth: {
        type: Date,
    },

    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'kids' });


module.exports = mongoose.model('Kids', kidSchema);



