const {Inventory} = require('./inventory');
const {sequelize} = require('../db');

describe('Inventory Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a inventory', async() => {
		const testInventory = await Inventory.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testInventory.name).toBe('slinky')
	})

	test('inventory item has a price', async() => {
		const testInventory = await Inventory.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testInventory.price).toBe(2.50)
	})

	test('inventory item has an image url', async() => {
		const testInventory = await Inventory.create({name : 'slinky', image: 'URL',  decription: 'A bouncing sling toy', price: 2.50, category: 'spring toy'})
		expect(testInventory.image).toBe('URL')
	})

})