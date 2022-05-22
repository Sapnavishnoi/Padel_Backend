const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type: String
    },
    mobileNumber:{
            type: String
        },
    
          secondaryMobileNumber:{
            type: String
        },
    
          email:{
            type: String
        },
    
          password:{
            type: String
        },  
        otp:{
            type: String
        },  
        
        validate:{
            type: Boolean,
            default: "false"
        },
        deviceId:{
            type: String,
            default:null
        },

     
    createdDate: {
        type: Date,
        default: Date.now
    }

}, { collection: 'users' });


module.exports = mongoose.model('Users', userSchema);



