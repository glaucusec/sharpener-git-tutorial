const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Filesuploaded = sequelize.define('filesuploaded', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fileURL: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { timestamps: false } )

module.exports = Filesuploaded