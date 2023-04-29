const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.BIGINT,
        allowNull: false
    }, 
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Expense;