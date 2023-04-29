const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.js')

router.get('/signup', userController.getSignUpPage);

router.post('/signup', userController.postSignUpData);

router.get('/login', userController.getLoginPage);

router.post('/login', userController.postLoginData);

router.get('/daily-expenses', userController.getDailyExpenses);

router.get('/expenses', userController.getExpenses);

router.post('/expenses', userController.postExpenses);

router.delete('/delete', userController.postDeleteExpense);


module.exports = router;