const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  transactionType: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer'] },

  sender: { type: Number },
  description: { type: String },

  transactionAmount: { type: Number, required: true },

  transactionTime: { type: Date, default: Date.now },

});

module.exports = mongoose.model("transaction", transactionSchema);