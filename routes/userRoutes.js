const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
// POST /api/users to create a new user
router.post('/users',userController.createUser);

// GET /api/users to list all users
router.get('/users',auth ,userController.listAllUsers);

// GET /api/users/:userId to fetch a user
router.get('/users/:userId',auth, userController.fetchUser);

// PUT /api/users/:userId to update a user
router.put('/users/:userId',auth,userController.updateUser);

// DELETE /api/users/:userId to delete a user
router.delete('/users/:userId',auth,userController.deleteUser);

// POST /auth/signin for user sign-in
router.post('/signin',userController.signIn);


module.exports = router;
