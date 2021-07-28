// const button = document.getElementById('btn');
// const itemName = document.getElementById('item-name');

// button.addEventListener('click', (e) => {
//     itemName.innerText += '🔥';
// })


let deleteBtn = document.getElementById('delete-btn')

deleteBtn.addEventListener('click', async (e) => {
    console.log('clicked' , window.location.href)
	await fetch(`/web/item/${window.location.href.slice(-1)}`, {method : 'DELETE'})
	window.history.back()
})