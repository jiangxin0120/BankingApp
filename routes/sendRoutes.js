const express = require('express');
const router = express.Router();
const Account =require('../models/account');
const Transaction=require('../models/transaction');
router.get('/send', async (req, res) => {
    // Ensure the user is authenticated
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch accounts associated with the logged-in user's userId
        const userAccounts = await Account.find({ userId: req.session.user.userId });

        // Render the 'send' template with the user's accounts
        res.render('send', { accounts: userAccounts });
    } catch (error) {
        // Handle errors and possibly render an error message
        res.status(500).send("Error loading accounts: " + error.message);
    }
});


router.post('/sendmoney/account-transfer', async (req, res) => {
    try {
        const { fromAccount, toAccount, transferAmount } = req.body;

        // Convert transferAmount to a number
        const amount = parseFloat(transferAmount);

        if (fromAccount === toAccount) {
            return res.status(400).send("Cannot transfer to the same account.");
        }

        const sourceAccount = await Account.findOne({ accountId: fromAccount });
        const destinationAccount = await Account.findOne({ accountId: toAccount });

        if (!sourceAccount || !destinationAccount) {
            return res.status(404).send("One or both accounts not found.");
        }

        if (sourceAccount.balance < amount) {
            return res.status(400).send("Insufficient funds in the source account.");
        }

        sourceAccount.balance -= amount;
        destinationAccount.balance += amount;

        await sourceAccount.save();
        await destinationAccount.save();

        const newTransaction = new Transaction({
            transactionId: 'txn-' + Date.now(),
            userId: req.session.user.userId,
            from: sourceAccount.accountId,
            to: destinationAccount.accountId,
            amount: amount,
            timestamp: new Date()
        });
        console.log(newTransaction);
        await newTransaction.save();

        res.redirect('/transactions');
    } catch (error) {
        res.status(500).send("Error in account transfer: " + error.message);
    }
});


router.post('/sendmoney/e-transfer', async (req, res) => {
    try {
        console.log("Received e-transfer data:", req.body);
        const { fromAccountET, toEmail, amount } = req.body;

        // Convert amount to a number
        const amountET = parseFloat(amount);

        // Validate the amount
        if (isNaN(amountET) || amountET <= 0) {
            return res.status(400).send("Invalid transfer amount.");
        }

        const account = await Account.findOne({ accountId: fromAccountET });

        if (!account) {
            return res.status(404).send("Account not found.");
        }

        // Check for sufficient funds
        if (account.balance < amountET) {
            return res.status(400).send("Insufficient funds for the transfer.");
        }

        // Update the balance
        account.balance -= amountET;

        // Ensure the balance is not NaN
        if (isNaN(account.balance)) {
            throw new Error("Invalid balance after transfer.");
        }

        await account.save();

        const newTransaction = new Transaction({
            transactionId: 'txn-' + Date.now(),
            userId: req.session.user.userId,
            from: account.accountId,
            to: toEmail,
            amount: amountET,
            timestamp: new Date()
        });

        await newTransaction.save();

        res.redirect('/transactions');
    } catch (error) {
        console.error("Error in e-transfer:", error);
        res.status(500).send("Error in e-transfer: " + error.message);
    }
});




module.exports = router;