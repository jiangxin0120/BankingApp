const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      // Create a new user instance with the plain password
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Storing the password as received (not secure)
      });
  
      // Save the new user to the database
      await user.save();
  
      // Respond with the new user (excluding the password)
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Authenticate a user
  signIn: async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
  
      // Check if the password is correct (comparing plain text passwords)
      const isPasswordMatch = req.body.password === user.password;
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
  
      // Respond with user (excluding the password) and token
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
};

module.exports = userController;
