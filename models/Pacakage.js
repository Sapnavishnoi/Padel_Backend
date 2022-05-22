const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PacakageSchema = new Schema({
   month:{
        type: String
    },
    plan_name:{
        type: String
    },
    days:{
        type: String

    },
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'pacakages' });


module.exports = mongoose.model('Pacakages',PacakageSchema);



