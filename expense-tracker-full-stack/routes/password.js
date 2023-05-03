const express  = require('express');

const router = express.Router();

const passwordController = require('../controllers/password');

router.get('/forgot-password', passwordController.getForgotPassword);

router.post('/forgot-password', passwordController.postForgotPassword);

module.exports = router;