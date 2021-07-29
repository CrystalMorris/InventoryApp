# Code Review II

## Roses

* We deployed! Thanks Crystal! (Stanley + Ashley)
* Deploying on Heroku/Github integration (Crystal)

## Thorns

* Ensuring Delete route is RESTful (Stanley + Crystal)
* We're done! No Thorns (Ashley)

## Deployed App

* [Deployed App](https://durian-toys.herokuapp.com/warehouses)

* Looks amazing!! Tiers 1-4 complete with no bugs!!!


## Product Roadmap

* Try updating Delete functionality to be RESTful
* Pair program a tiny bit on Bootstrap to share knowledge
* Write Documentation on 1-2 Routes, Models, templates you didnt write
* Implement Update functionality

#### Delete Route

* Change `app.get` to `app.delete` on line 74.
* In handlebars `<a href="/item/{{thisItem.id}}/delete" class="deleteButton">delete this item</a>` implicitly makes a GET request
* Very tricky, to override an anchor tag `<a>` to make any other kind of HTTP req

* in main.handlebars
`<script src="/script.js"></script>`

* in item.handlebars
```html
<!-- add id, and data-attribute to button tag -- !>

<button class="deleteButton" id="delete-btn" data-item={{thisItem.id}}>delete this item</button>

```

* In public/script.js
```js

// Grab delete button by id
const deleteBtn = document.getElementById('delete-btn');

//add click event listener, that makes a fetch request to our delete route
deleteBtn.addEventListener('click', async (e) => {
	let id = deleteBtn.dataset.item;
    await fetch(`/item/${id}/delete`, {method : 'DELETE'})
})

```

* Further Reading: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes


#### Update Route

* in app.js
```
app.put('/item/:id', async (req, res) => {
	await Item.update(req.body, {
		where: {id: req.params.id}
	})

	let updatedItem = Item.findByPk(req.params.id)
	res.render('item', {item: updatedItem})
})

```

* in handlebars
```html

<form method="PUT" action="/items/{{item.id}}">
	<input name=name placeholder={{item.name}} />
</form>

```


