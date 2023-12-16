const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Handling login
router.post('/login', async (req, res) => {
    try {
      const { user, token } = await userController.signIn(req);
      req.session.user = user;
      req.session.token = token;
      res.redirect('/main');
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });

// Handlle the main page after login
router.get('/main', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send("User not authenticated");
        }

        const userId = req.session.user.userId;
        const username = req.session.user.username;
        const accounts = await userController.getUserAccounts(userId);
        res.render('index', { username, accounts });
    } catch (error) {
        res.status(500).send("Error loading page: " + error.message);
    }
});

router.get('/account', (req, res) => {
    res.render('account');
});

router.get('/logout', (req, res) => {
  if (req.session) {
      // Destroy the session
      req.session.destroy(err => {
          if (err) {
              // Handle error
              res.status(500).send('Could not log out, please try again.');
          } else {
              // Redirect to the login page or home page after successful logout
              res.redirect('/login');
          }
      });
  } else {
      // If there's no session, just redirect to the login page or home page
      res.redirect('/login');
  }
});

module.exports = router;
