const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/account', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const userId = req.session.user.userId;
        const accounts = await userController.getUserAccounts(userId) || [];
        console.log("Session User:", req.session.user);
console.log("Accounts:", accounts);
        res.render('account', { accounts});
    } catch (error) {
        res.status(500).send("Error loading accounts: " + error.message);
    }
});





router.post('/create-account', async (req, res) => {
    try {
        // Assuming the user's ID is stored in the session upon login
        if (!req.session.user) {
            return res.status(401).send("User not authenticated");
        }

        const userId = req.session.user.userId;
        const accountType = req.body.accountType;

        const newAccount = await userController.createAccount(userId, accountType);

        res.redirect('/main'); 
    } catch (error) {
        res.status(500).send("Error creating account: " + error.message);
    }
});

module.exports = router;