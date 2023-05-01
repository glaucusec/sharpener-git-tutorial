const express = require('express');

const router = new express.Router();

const middleware = require('../middleware/auth');

const purchaseController = require('../controllers/purchase');

router.post('/premium', middleware.authenticate ,purchaseController.purchasePremium);

router.post('/updatetransactionstatus', middleware.authenticate ,purchaseController.updateTransactionStatus);

module.exports = router;