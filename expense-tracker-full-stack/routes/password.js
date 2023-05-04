const express  = require('express');

const router = express.Router();

const passwordController = require('../controllers/password');

router.get('/forgot-password', passwordController.getForgotPassword);

router.post('/forgot-password', passwordController.postForgotPassword);

router.get('/reset-password/:id', passwordController.getResetPassword);

router.post('/reset-password/', passwordController.postResetPassword);

module.exports = router;