const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isPremiumUser: Sequelize.BOOLEAN
}, {
    timestamps: false
});

module.exports = User;