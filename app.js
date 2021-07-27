const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const {sequelize} = require('./db');
const {Item, Warehouse, Category} = require('./models/index');
const seed = require('./seed')

const PORT = 3000;

const app = express();

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

// serve static assets from the public/ folder
app.use(express.static('public'));

seed();

// // GET all items

app.get('/items', async (req, res) => {
    const items = await Item.findAll()    
	res.render('items', {items})
  //res.json({items})
})

//GET one item at a time

app.get('/item/:id', async (req, res) => {
    const thisItem = await Item.findByPk(req.params.id)
    const thisCategory = await Category.findByPk(thisItem.CategoryId)
	res.render('item', {item: thisItem, thisCategory: thisCategory})
})
app.get('/warehouses', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll();
    res.render('warehouses', {allWarehouses})
})


app.post('warehouses/:id/addItem', async (req, res) =>{
    const newItem = await Item.create(req.body);
    const foundItem = await Item.findByPk(newItem.id)
    if(foundItem){
        res.status(201).send('New Item Added!')
    } else { 
        console.log("New Item not added")
        res.send("Error: New Item was not added")
    }
})


app.get('/warehouses/:id', async (req, res) =>{
    const thisWarehouse = await Warehouse.findByPk(req.params.id)
    const localItems = await Item.findAll({
        where: {
            WarehouseId: req.params.id
        }
    })
    
    res.render('warehouse', {thisWarehouse: thisWarehouse, localItems:localItems})

    });



app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})