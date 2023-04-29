const path = require('path');
const bcrypt = require('bcrypt');

const rootDir = require('../util/path');
const User = require('../models/user');
const Expense = require('../models/expense');

exports.getSignUpPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
}

exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
}

exports.postSignUpData = (req, res, next) => {
    const { name, email, password } = req.body;

    const saltrounds = 10;
    bcrypt
        .hash(password, saltrounds)
        .then(hash => {
            User.create( {
                name: name, 
                email: email, 
                password: hash
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(403).json({ error: 'Email is already taken' });
            })
        })
        .catch(err => console.log(err));
}

exports.postLoginData = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({
        where: {
            email: email
        }
    })
    .then(result => {
        bcrypt
            .compare(password, result.password)
            .then(passwordsMatch => {
                if(passwordsMatch) {
                    res.redirect('/user/daily-expenses'); // Just response `something`
                } else {
                    res.status(401).json({ error: "Incorrect Password" });
                }
            })
            .catch(err => {
                res.status(500).json( { error: "Internal Server Error" });
            })
    })
    .catch(err => {
        res.status(403).json( {error: "User not found"});
    });
}

exports.getDailyExpenses = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'expenses.html'))
}

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.json(expenses);
            res.end();
        })
        .catch(err => console.log(err));
}

exports.postExpenses = (req, res, next) => {
    const { amount, description, category } = req.body;

    Expense.create( { amount, description, category })
        .then(result => {
            console.log('Created Expense on Database');
            res.redirect('/user/expenses');
        })
        .catch(err => console.log(err));
}

exports.postDeleteExpense = (req, res, next) => {
    const id = req.body.id;

    Expense.destroy({
        where: {
            id: id
        }
    })
    .then(res.redirect('/user/daily-expenses'))
    .catch(error => res.status(500).json( {error: "Internal Server Error" }));
}