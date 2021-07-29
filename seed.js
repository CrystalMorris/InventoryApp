const {sequelize}=require('./db')
const {Warehouse, Item, Category} =  require('./models/index')
const path = require('path');
const fs = require('fs').promises;

    const seed = async () => {

        await sequelize.sync({ force: true });
    
        const seedPath = path.join(__dirname, 'inventory.json'); // creates path to seed data
        const buffer = await fs.readFile(seedPath); // reads json
        const {warehouses} = JSON.parse(String(buffer)); //parses data
        const {categories} = JSON.parse(String(buffer));
        const {items} = JSON.parse(String(buffer));
        const warehousePromises = warehouses.map(warehouse => Warehouse.create(warehouse))
        const categoryPromises = categories.map(category => Category.create(category))
        const itemPromises = items.map(item => Item.create(item))
        await Promise.all(warehousePromises,itemPromises,categoryPromises)
        console.log("db populated!")
    }
    

module.exports = seed;
