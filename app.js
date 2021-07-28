const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const {sequelize} = require('./db');
const {Item, Warehouse, Category} = require('./models/index');
const seed = require('./seed')
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

seed();

// // GET all items

app.get('/items', async (req, res) => {
    const items = await Item.findAll()    
	res.render('items', {items})
  //res.json({items})
})

//GET one item at a time

app.get('/item/:id', async (req, res) => {
    const thisItem = await Item.findByPk(req.params.id,{include:{all:true}})
    console.log("This warehouse's  " + thisItem.Warehouse)
    res.render('item', {thisItem})
})

//GET all Warehouses

app.get('/warehouses', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll();
    res.render('warehouses', {allWarehouses})
})

//GET add item form
app.get('/addItem', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll()
    const allCategories = await Category.findAll()
    res.render('addItem',{allWarehouses: allWarehouses, allCategories:allCategories});
})

//POST the info from form to create a new item in db.sqlite
app.post('/items', async (req, res) =>{    
    const newItem = await Item.create(req.body);
    const thisWarehouse = await Warehouse.findByPk(newItem.WarehouseId)
    const items = await Item.findAll()  
   //res.redirect("/items")
   res.redirect('/warehouses/'+ thisWarehouse.id)
})

//GET a single warehouse and it's inventory

app.get('/warehouses/:id', async (req, res) =>{
    const thisWarehouse = await Warehouse.findByPk(req.params.id, {include: {all:true}})
    res.render('warehouse', {thisWarehouse})
});

//Delete an item from an inventory

app.get('/item/:id/delete', async(req, res)=>{
    const thisItem =await Item.findByPk(req.params.id)    
    const thisWarehouse = await Warehouse.findByPk(thisItem.WarehouseId)
    Item.destroy({where: {id: req.params.id}});
    const foundItem = await Item.findByPk(req.params.id)
        console.log("this is app.js:79 " +JSON.stringify(thisWarehouse))
        res.redirect('/warehouses/'+ thisWarehouse.id)
    })



app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})