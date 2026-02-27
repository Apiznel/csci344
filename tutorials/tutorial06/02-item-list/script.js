
const items = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
const itemListEl = document.querySelector('#itemList');

function displayItems() {
	for (let i = 0; i < items.length; i++) {
		itemListEl.insertAdjacentHTML('beforeend', `<li>${items[i]}</li>`);
	}
}

displayItems();
