const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/', expenseController.getHomePage);

router.post('/', expenseController.postAddExpense);

router.get('/expenses', expenseController.getAllExpenses);

router.delete('/delete', expenseController.deleteExpense)

module.exports = router;