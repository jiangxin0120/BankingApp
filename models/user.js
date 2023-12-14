const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true ,
  collection: 'users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;

