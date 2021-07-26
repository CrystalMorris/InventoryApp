const {Warehouse} = require('./warehouse');
const {sequelize} = require('../db');


describe('Warehouse Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});
	
	
	test('can create a Warehouse', async() => {	
		const testWarehouse1 = await Warehouse.create({name: 'West End', location:'123 Westview St., Someplace, USA'})	
		expect(testWarehouse1.name).toBe('West End')
	})

	test('warehouse has a locatinon', async() => {
		const testWarehouse2 = await Warehouse.create({name: 'South Side', location:'123 Southview Ln., Someplace, USA'})	
		expect(testWarehouse2.location).toBe('123 Southview Ln., Someplace, USA')
	})

	test('warehouse is added to the database', async() => {		
		const testWarehouse3 = await Warehouse.create({name: 'East End', location:'123 Eastview Ave., Someplace, USA'})	
		const foundItem = await Warehouse.findByPk(testWarehouse3.id)
		expect(foundItem.name).toBe('East End')
	}) 


})