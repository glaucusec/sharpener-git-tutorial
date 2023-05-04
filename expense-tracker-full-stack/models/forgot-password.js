const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ForgotPasswordRequest = sequelize.define('forgot-password-requests', {
    id: {
        type: Sequelize.STRING, 
        allowNull: false,
        primaryKey: true
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = ForgotPasswordRequest