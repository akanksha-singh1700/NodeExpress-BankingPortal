const express = require('express');
const router = express.Router();

const data = require('../data');

const accounts = data.accounts;
const writeJSON = data.writeJSON;

router.get('/transfer', function (req, res) {
    res.render('transfer');
});

router.get('/payment', function (req, res) {
    res.render('payment', { account: accounts.credit });
});

router.post('/transfer', function (req, res) {
    accounts[req.body.from].balance = (accounts[req.body.from].balance - req.body.amount);
    accounts[req.body.to].balance = (parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount));
    writeJSON();
    res.render('transfer', { message: "Transfer Completed" });
});

router.post('/payment', function (req, res) {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);
    writeJSON();
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports=router;
