const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getHomePage);

router.post('/', mainController.postAddUser);

router.get('/users', mainController.getUserData);

router.post('/delete-user', mainController.postDeleteUser);

module.exports = router;