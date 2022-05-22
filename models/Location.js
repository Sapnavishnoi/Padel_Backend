const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let locationSchema = new Schema({
    addressLine1:{
        type: String
    },
    addressLine2:{
            type: String
        },
    
          city:{
            type: String
        },
    
          country:{
            type: String
        },
    
          pincode:{
            type: String
        },  
        lat:{
            type: String
        },  
        
        long:{
            type: String
        },

    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'location' });


module.exports = mongoose.model('Location', locationSchema);



