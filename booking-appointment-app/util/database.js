const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;