const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    paymentId: Sequelize.STRING,
    orderId: Sequelize.STRING,
    status: Sequelize.STRING

}, {
    timestamps: false
})

module.exports = order;