const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker-full-stack', 'root', 'password', {
    dialect: 'mysql'
})

module.exports = sequelize;

