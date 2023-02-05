const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const data = require('./data');

const accounts= data.accounts;
const users=data.users;
const writeJSON= data.writeJSON;

const accountRoutes= require('./routes/accounts.js');
const servicesRoutes= require('./routes/services.js');
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);
app.get('/', function (req, res) {
    res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/profile', function (req, res) {
    res.render('profile', { user: users[0] });
});


app.listen(3000, function () {
    console.log('PS Project Running on port 3000!');
});
