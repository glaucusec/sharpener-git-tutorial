const express = require('express');

const router = new express.Router();

const middleware = require('../middleware/auth');

const premiumRouter = require('../controllers/premium');

router.post('/leaderboard', premiumRouter.leaderBoard);

router.post('/ispremium', middleware.authenticate ,premiumRouter.isPremium);

router.get('/download-report', middleware.authenticate, premiumRouter.downloadReport);

router.get('/fileurls', middleware.authenticate, premiumRouter.fileUrls);

module.exports = router;