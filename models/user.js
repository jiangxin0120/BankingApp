const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
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
  timestamps: true // Automatically create createdAt and updatedAt fields
}, { 
  collection: 'project.users'  // Specify the collection name
});

const User = mongoose.model('User', userSchema);

module.exports = User;
