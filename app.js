const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const {Warehouse} = require('./models/warehouse')
const {sequelize} = require('./db');
const {Item} = require('./models/item');
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
	const item = await Item.findByPk(req.params.id)
	res.render('item', {item})
})
app.get('/warehouses', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll();
    res.render('warehouses', {allWarehouses})
})


app.post('/:warehouseId/addItem', async (req, res) =>{
    const newItem = await Item.create(req.body);
    const foundItem = await Item.findByPk(newItem.id)
    if(foundItem){
        res.status(201).send('New Item Added!')
    } else { 
        console.log("New Item not added")
        res.send("Error: New Item was not added")
    }
})


app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})