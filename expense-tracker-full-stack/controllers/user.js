const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const rootDir = require('../util/path');
const User = require('../models/user');
const Expense = require('../models/expense');

require('dotenv').config();

function generateAccessToken(id, name) {
    return jwt.sign( { userId: id, name: name } , process.env.TOKEN_SECRET);
}

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
                console.log(err);
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
                    res.status(200).json( { message: "User login Successful" , success: true, token: generateAccessToken(result.id, result.name) }) // Just response `something`
                } else {
                    res.status(401).json({ error: "Incorrect Password" });
                }
            })
            .catch(err => {
                console.log(err);
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
    Expense.findAll( { 
        where: {
            userId: req.user.id
        }
    })
    .then(expenses => {
        res.json(expenses);
        res.end();
    })
    .catch(err => console.log(err));
}

exports.postExpenses = (req, res, next) => {
    const token = req.header('Authorization');
    const { amount, description, category } = req.body;
    const userDetails = jwt.verify(token, process.env.TOKEN_SECRET);

    User.findByPk(userDetails.userId)
    .then(user=> {
        return user.createExpense( { amount, description, category })
        .then(result => {
            console.log('Created Expense on Database');
            return User.findAll({
                attributes: ['totalAmount'],
                where: {
                    id: userDetails.userId
                }
            });
        })
        .then(result => {
            const curr_totalAmount = result[0].dataValues['totalAmount'];
            return curr_totalAmount
        })
        .then(curr_totalAmount => {
            const fin_totalAmount = curr_totalAmount + parseInt(amount);
            User.update( {
                totalAmount: fin_totalAmount
            }, {
                where: {
                    id: userDetails.userId
                }
            })
        })
        .then(() => {
            console.log('Total amount updated successfully')
            res.redirect('/user/expenses')
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postDeleteExpense = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userDetails = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = userDetails.userId;
        const expenseId = req.body.id;  
        Expense.destroy({
            where: {
                userId: userId,
                id: expenseId
            }
        })
        .then(res.redirect('/user/daily-expenses'))
        .catch(err => {
            console.log(err);
            res.status(500).json( {error: "Internal Server Error" });
        })
    } catch(err) {
        console.log(err);
        res.status(401).json( { error: "Operation Not Allowed" });
    }
}


