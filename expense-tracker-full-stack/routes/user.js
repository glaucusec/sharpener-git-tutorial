const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.js')

router.get('/signup', userController.getSignUpPage);

router.post('/signup', userController.postSignUpData);


module.exports = router;