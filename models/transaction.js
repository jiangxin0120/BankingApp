const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'Account'
  },
  from: {
    type: String,
    required: true 
  },
  to: {
    type: String,
    required: true 
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'transactions'  
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
