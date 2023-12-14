const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Handling GET request for the register page
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration page view
});

// Handling POST request for user registration
router.post('/register', (req, res) => {
    userController.createUser(req, res)
      .then(result => {
        if (result.success) {
          res.redirect('/login'); // Redirect to login on success
        }
      })
      .catch(error => {
        res.status(500).send("Error during registration: " + error.message);
      });
  });
  
  

module.exports = router;
