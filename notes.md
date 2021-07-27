# Code Review

** add me as a github contributor @danceoval **

## Roses

* No merge conflicts (after Day I) (Ashley)
* Got framework done quickly, layout looks good (Stanley)
* Good use of "Pull Parties" (Dan)
* Pair, Trio Programming (Crystal)

## Thorns

* CSS (footer wont stick) (Ashley)
* Delete not working on front-end (Stanley + Crystal)

## Taskboard + Git

* Great use of Kanban, tickets, and deadlines for accountability
* Kanban= ticket board with 3x columns: Todo, In Progress, Done
* Consider organizing tickets by User Story
	* As an {X} I want to {Y} by {Z}
	* e.g, "As a User, I want to see all Items, by clicking 'all items' on the Nav Bar"
		* Item Model
		* Express GET Route
		* allItems handlebars component
* Use Semantic Commit messages
	* 2 parts:
		* Nature of commit (add, feature, fix, doc, test)
		* Description of commit
		* e.g, Adds Handlebars template for add-item form
		* e.g, Fixes refresh bug on delete form submission

## API

### Models

* Great Item model, love seeing Decimal for Price
* Good test coverage
* Don't forget to test associations too :)
```javascript

describe('associations', async () => {
	it('associates item to warehouse', () => {
		let item = await Item.create({name : 'ring'})
		let warehouse = await Warehouse.create({name : 'target'})

		//add item to warehouse
		warehouse.addItem(item)
		let items = await warehouse.getItems()
		expect(items.length).toBe(1)
	})
})

```
* great job augmenting Promise.all in seed file

### Routes

* Consider using Include statement to get Categories with Items
```js
app.get('/item/:id', async (req, res) => {
	//eager loading, allows you to get 2 things for price of 1 db visit
    const thisItem = await Item.findByPk(req.params.id, {include: Category})
})

```

* In our post route, can we redirect to the list of items with the new one added?
```js
app.post('/addItem/post', async (req, res) =>{    
    const newItem = await Item.create(req.body);
    const items = await Item.findAll()
    res.render("items", {items})
})

```

## Roadmap

* Deletes
```js
let deleteBtn = document.getElementById('delete-btn')

deleteBtn.addEventListener('click', async (e) => {
	await fetch(`/items/${window.location.pathname.slice(-1)}`, {method : Delete})
	window.reload()
})

```
* CSS
```css


footer {
	position: relative
	left: 50vw //50% of viewport width
}
```
