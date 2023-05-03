const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.leaderBoard = async (req, res, next) => {
    await User.findAll({
        attributes: ['name', 'totalAmount'],
        order: [[sequelize.col('totalAmount'), 'DESC']]
    })
    .then(result => res.status(200).json(result));
}

// #1
// exports.leaderBoard = (req, res, next) => {
//     Expense.findAll( {
//         attributes: ['userId', 'amount']
//     })
//         .then(expenses => {
//             console.log(expenses);
//             let totalexpenses = {}
//             expenses.forEach(expense => {
//                 totalexpenses[expense.userId] = (totalexpenses[expense.userId] || 0) + expense.amount
//             });
//             return totalexpenses
//         })
//         .then(totalexpenses => {
//             finalObj = {}
//             const promise = Object.keys(totalexpenses).map(userid => {
//                 return User.findOne( {
//                     attributes: ['name'],
//                     where: {
//                         id: userid
//                     }
//                 })
//                 .then(user => {
//                     finalObj[user.name] = totalexpenses[userid]
//                 })
//                 .catch(err => console.log(err));
//             })
//             return Promise.all(promise).then(() => finalObj);
//         })
//         .then(results => {
//             console.log(results);
//             res.status(200).json(results);
//         })
//         .catch(err => res.status(500).json({ 'message': 'Internal Server Error' }));
// }
// #2
// exports.leaderBoard = async (req, res, next) => {
//     await Expense.findAll( {
//         attributes: ['userId', [sequelize.fn('sum', sequelize.col('amount')), 'total_cost']], group: ['userId']
//     })
//     .then(totalexpenses => {
//         finalObj = {}
//         const promise = Object.keys(totalexpenses).map(expense => {
//             return User.findOne( {
//                 attributes: ['name'], 
//                 where: {
//                     id: totalexpenses[expense].userId
//                 }
//             })
//             .then(user => {
//                 finalObj[user.name] = totalexpenses[expense].getDataValue('total_cost')
//             })
//             .catch(err => console.log(err));
//         })
//         return Promise.all(promise).then(() => finalObj);
//     })
//     .then(result => {
//         console.log(result);
//         res.status(200).json(result);
//     })
//     .catch(err => res.status(500).json(err));

// #3
// exports.leaderBoard = async (req, res, next) => {
//     await Expense.findAll( {
//         attributes: [
//             [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
//         ],
//         include: [{
//             model: User,
//             attributes: ['name'],
//         }],
//         group: ['User.id'],
//         order:[[sequelize.col('totalAmount'), 'DESC']]
//     })
//     .then(result => {
//         res.status(200).json(result);
//     })
//     .catch(err => res.status(500).json(err));
// }