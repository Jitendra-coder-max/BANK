const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // account_number: {
  //   type: String
  // },

  
  pan: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }

  
});

module.exports = mongoose.model('profile', ProfileSchema);