const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

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

// GET all items
app.get('/items', async (req, res) => {
    const allItems= await Item.findAll()
    res.render('items', {allItems});
})

// app.get('/sauces/:id', async (req, res) => {
//     const sauce = await Sauce.findByPk(req.params.id)
//     res.render('sauce', {sauce}); 
// })

app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})