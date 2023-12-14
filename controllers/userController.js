const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Account = require('../models/account');
const userController = {
  createUser: async (req) => { 
    try {
      const userId = new mongoose.Types.ObjectId().toString();

      const user = new User({
        userId: userId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
      });

      await user.save();

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
,


  // Authenticate a user
  signIn: async (req) => {
    try {
    

      // Find the user by email or username
      const user = await User.findOne({
        $or: [
          { email: req.body.email},
          { username: req.body.username}
        ]
      });
      if (!user) {
        throw new Error('Invalid login credentials');
      }
  
      // Check if the password is correct (comparing plain text passwords)
      const isPasswordMatch = req.body.password === user.password;
      if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
      }
  
      // Create a JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
  
      // Prepare user data (excluding the password) to return
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
  
      // Return the user data and token
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error; // Propagate the error to be caught by the route
    }
  }
  ,

  // List all users
  listAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // Excluding the password field
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fetch a user
  fetchUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId, '-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  getUserAccounts: async (userId) => {
    try {
      const accounts = await Account.find({ userId: userId });
      return accounts;
    } catch (error) {
      throw error;
    }
  }};
  

module.exports = userController;
