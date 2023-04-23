const Sequelize = require('sequelize');

const sequelize = new Sequelize('seller-admin', 'root', 'password', {
    dialect: 'mysql'
})

module.exports = sequelize;