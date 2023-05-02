const express = require('express');

const router = new express.Router();

const middleware = require('../middleware/auth');

const premiumRouter = require('../controllers/premium');

router.post('/leaderboard', premiumRouter.leaderBoard);

module.exports = router;