const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'user' // refering to the user model
  },
  accountType: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
},{ 
    collection: 'accounts'  // Specify the collection name
  });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
