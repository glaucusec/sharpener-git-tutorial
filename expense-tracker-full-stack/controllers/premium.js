const User = require('../models/user');
const Expense = require('../models/expense');

exports.leaderBoard = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            let totalexpenses = {}
            expenses.forEach(expense => {
                totalexpenses[expense.userId] = (totalexpenses[expense.userId] || 0) + expense.amount
            });
            return totalexpenses
        })
        .then(totalexpenses => {
            finalObj = {}
            const promise = Object.keys(totalexpenses).map(userid => {
                console.log(userid);
                return User.findOne( {
                    attributes: ['name'],
                    where: {
                        id: userid
                    }
                })
                .then(user => {
                    finalObj[user.name] = totalexpenses[userid]
                })
                .catch(err => console.log(err));
            })
            return Promise.all(promise).then(() => finalObj);
        })
        .then(results => {
            console.log(results);
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json({ 'message': 'Internal Server Error' }));
}

