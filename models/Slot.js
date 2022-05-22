const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let slotSchema = new Schema({
    planId:{
        type:String
    },
    slotName: {
        type: String
    },
    timing: {
        type: String
    },

    totalSlot: {
        type: Number
    },
    month: {
        type: Number
    },
    leftslots:{
        type:Number
    },
    amount:
    {
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'slots' });


module.exports = mongoose.model('Slots', slotSchema);



