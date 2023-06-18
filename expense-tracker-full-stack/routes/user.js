const express = require('express');

const router = express.Router();

const userController = require('../controllers/user')

const userAuthentication = require('../middleware/auth');

router.get('/login', userController.getLoginPage);

router.get('/signup', userController.getSignUpPage);

router.post('/signup', userController.postSignUpData);

router.post('/login', userController.postLoginData);

router.get('/daily-expenses',userController.getDailyExpenses);

router.get('/expenses', userAuthentication.authenticate, userController.getExpenses);

router.post('/expenses', userController.postExpenses);

router.delete('/delete', userController.postDeleteExpense);


module.exports = router;