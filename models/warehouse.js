const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Warehouse extends Model {}

Warehouse.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});
 

module.exports = {Warehouse};