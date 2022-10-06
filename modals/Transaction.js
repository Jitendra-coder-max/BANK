const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    // user: {
    //     type: Schema.Types.ObjectId
    //   },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },

    

    // profile: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'profile'
    //     },
    // accountBalance: { type: Number,},
      // accountBalance: { type: Number,  },
    transactionType: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer'] },
    // accountNumber: { type: Number,  },
    sender: { type: Number },
    description: { type: String },
    // transactionAmount: { type: Number, required: true},
    transactionAmount: { type: Number, required: true},
    
    transactionTime: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model("transaction", transactionSchema);