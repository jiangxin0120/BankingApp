const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/transactions', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const userId = req.session.user.userId; 
        const transactions = await Transaction.find({ userId: userId });
        res.render('transactions', { transactions: transactions });
    } catch (error) {
        res.status(500).send("Error loading transactions: " + error.message);
    }
});



module.exports = router;