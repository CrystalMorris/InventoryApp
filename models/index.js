const {sequelize} = require('../db')
const {Warehouse} = require('./warehouse')
const {Item} = require('./item')
const {Category} = require('./category')

Item.belongsTo(Warehouse)
Warehouse.hasMany(Item)

Item.belongsTo(Category)
Category.hasMany(Item)

module.exports = {Warehouse, Item, Category}