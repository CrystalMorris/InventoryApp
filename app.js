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
    const thisItem = await Item.findByPk(req.params.id)
    const categoryId = thisItem.CategoryId  
    const thisCategory = await Category.findByPk(categoryId)
    console.log(thisItem.name)
	res.render('item', {thisItem: thisItem, thisCategory: thisCategory})
})
app.get('/warehouses', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll();
    res.render('warehouses', {allWarehouses})
})
app.get('/addItem', async (req, res)=>{
    const allWarehouses = await Warehouse.findAll()
    const allCategories = await Category.findAll()
    res.render('addItem',{allWarehouses: allWarehouses, allCategories:allCategories});
})

app.post('/addItem/post', async (req, res) =>{    
    const newItem = await Item.create(req.body);
    const foundItem = await Item.findByPk(newItem.id)
    console.log(newItem) 
    if(foundItem){
        res.status(201).send('New Item Added!')
    } else { 
        console.log("New Item not added")
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