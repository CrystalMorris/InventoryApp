// const button = document.getElementById('btn');
// const itemName = document.getElementById('item-name');

// button.addEventListener('click', (e) => {
//     itemName.innerText += '🔥';
// })


const deleteBtn = document.getElementById('delete-btn')

// deleteBtn.addEventListener('click', async (e) => {
//     console.log('clicked' , window.location.href)
// 	await fetch(`/web/item/${window.location.href.slice(-1)}`, {method : 'DELETE'})
// 	window.history.back()
// })

deleteBtn.addEventListener('click', async (e) => {
	let id = deleteBtn.dataset.item;
	await fetch(`/item/${id}/delete`, {method : 'DELETE'})
	// window.location.pathname ='/warehouses' 
	window.history.go(-1)
})
