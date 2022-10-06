const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    // _id: { type: Schema.Types.ObjectId },
    name: {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    password: {
        type:String,
        required:true
    }
    ,
    accountNumber: { type: Number, default: Math.floor(Math.random() * 10000000) + 1111111 },

    accountBalance: { type: Number },
    // accountBalance: { type: Number},
    accountType: { type: String, enum: ['savings', 'current'], default: 'savings' },
    
   
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = User = mongoose.model('user',UserSchema)