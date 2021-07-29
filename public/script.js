
const deleteBtn = document.getElementById('delete-btn')

deleteBtn.addEventListener('click', async (e) => {
	let id = deleteBtn.dataset.item;
	let warehouseid = deleteBtn.dataset.warehouse
	await fetch(`/item/${id}/delete`, {method : 'DELETE'})
	window.location.pathname ='/warehouses/' + warehouseid

})
