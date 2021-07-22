const {Item} = require('./item');
const {sequelize} = require('../db');


describe('Item Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a item', async() => {
		const testItem = await Item.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testItem.name).toBe('slinky')
	})

	test('item has a price', async() => {
		const testItem = await Item.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testItem.price).toBe(2.50)
	})

	test('item has an image url', async() => {
		const testItem = await Item.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testItem.image).toBe('URL')
	})

	test('item is inserted in the database', async() => {
		const testItem = await Item.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		const foundItem = await Item.findByPk(testItem.id)
		expect(foundItem.name).toBe('slinky')
	})


})