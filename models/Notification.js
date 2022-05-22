const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
    userId:{
        type: String
    },
    title:{
        type: String
    },
    msg:{
        type: String
    },
   createdBy:{
    type: String
   },
isRead:
{
    type:Boolean,
    default: false
},
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'notification' });


module.exports = mongoose.model('Notification', notificationSchema);



