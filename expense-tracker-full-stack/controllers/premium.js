const User = require('../models/user');
const Expense = require('../models/expense');
const FilesUploaded = require('../models/filesuploaded');
const sequelize = require('../util/database');

require('dotenv').config();

const UserServices = require('../services/userservices')
const S3Services = require('../services/s3services');

exports.downloadReport = async (req, res, next) => {
    try {
        const expenses = await UserServices.getExpenses(req);
        const stringifiedExpenses = JSON.stringify(expenses);
    
        const userId = req.user.id;
        const fileName = `expense${userId}/${new Date()}.txt`;
        
        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);
        FilesUploaded.create ({ fileURL: fileURL, userId: userId })
        res.status(200).json({ fileURL: fileURL, success: true})

    } catch(err) {
        console.log(err);
        res.status(200).json( { fileURL : '', success:false, err: err})
    }
}

exports.fileUrls = async (req, res, next) => {
    const userId = req.user.id
    try {
        const prevFiles = await FilesUploaded.findAll( { where: { userId: userId } })
        res.status(200).json(JSON.stringify(prevFiles))
    } catch(err) {
        res.status(404).json({'message': 'Error in the FIlesUrl()', success: false});
    }
    
}

exports.leaderBoard = async (req, res, next) => {
    await User.findAll({
        attributes: ['name', 'totalAmount'],
        order: [[sequelize.col('totalAmount'), 'DESC']]
    })
    .then(result => res.status(200).json(result));
}


exports.isPremium = (req, res, next) => {
    if(req.user.isPremiumUser) {
        res.status(200).json({'isPremium': true})
    } else {
        res.status(401).json({ 'isPremium': false })
    }
    
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