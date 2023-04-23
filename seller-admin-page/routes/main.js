const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getHomePage);

router.post('/', mainController.postHomePage);

router.get('/products', mainController.getProducts);

router.delete('/delete', mainController.deleteProduct);

module.exports = router;