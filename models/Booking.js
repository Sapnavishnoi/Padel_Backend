const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let BookingSchema = new Schema({

    transactionId: {
        type: String
    },
    planName:{
        type: String
    },
    month : {
        type: String
    },
    slotName: {
        type: String
    },
    timing: {
        type: String
    },
    slotsId:[{type: String}],
    kidsId: [{type: String}],
    status: {
        type: String,
        default: 0
    },
    amount:{
        type: Number
    },
    userId: {
        type: String
    },

    createdDate: {
        type: Date,
        default: Date.now
    }


}, { collection: 'Booking' });


module.exports = mongoose.model('Booking', BookingSchema);



