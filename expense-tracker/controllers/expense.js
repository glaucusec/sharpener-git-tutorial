const path = require('path')

const rootDir = require('../util/path');
const Expense = require('../models/expense');

exports.getHomePage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'main.html'));
}

exports.postAddExpense = (req, res, next) => {
    const id = req.body.id;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if (id) {
        Expense.update( {
            amount: amount,
            description: description,
            category: category
        }, {
            where: {
                id: id
            }
        })
        .then(result => {
            console.log('Updated User on Database');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        Expense.create( {
            amount: amount,
            description: description,
            category: category
        })
        .then(result => {
            console.log("Expense created to database");
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.json(expenses);
            res.end();
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteExpense = (req, res, next) => {
    const id = req.body.id;
    Expense.destroy( {
        where: {
            id: id
        }
    })
    .then(res.redirect('/'))
    .catch(err => console.log(err));
}
