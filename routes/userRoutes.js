const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users to create a new user
router.post('/users', userController.createUser);

// GET /api/users to list all users
router.get('/users', userController.listAllUsers);

// GET /api/users/:userId to fetch a user
router.get('/users/:userId', userController.fetchUser);

// PUT /api/users/:userId to update a user
router.put('/users/:userId', userController.updateUser);

// DELETE /api/users/:userId to delete a user
router.delete('/users/:userId', userController.deleteUser);

// POST /auth/signin for user sign-in
router.post('/signin', userController.signIn);

// If you implemented a signout function, you would also add:
// router.get('/signout', userController.signOut);

module.exports = router;
