const products = [
	{ name: "Apple", price: 0.99, description: "Yummy!", category: "Other", inStock: true },
	{ name: "Macbook", price: 1099.99, description: "You can't eat this one...", category: "Electronics", inStock: false },
	{ name: "Fridge", price: 1499.99, description: "Keeps your apples fresh!", category: "Appliances", inStock: true },
];
const productGridEl = document.querySelector('#productGrid');
const productForm = document.querySelector('#productForm');

function formatPrice(price) {
	return `$${price.toFixed(2)}`;
}

function createProductCard(product) {
	return `
	<section class = 'product-card'>
		<h2>${product.name}</h2>
		<div class = 'price'>${formatPrice(product.price)}</div>
		<p class = 'description'>${product.description}</p>
		<span class = 'category'>${product.category}</span>
		<span class = '${(product.inStock) ? "stock-status in-stock'>In Stock" : "stock-status out-of-stock'>Out of Stock"}</span>
	</section>
	`
}

function renderProducts() {
	productGridEl.innerHTML = '';
	for (const product of products) {
		let productCard = createProductCard(product);
		productGridEl.insertAdjacentHTML('beforeend', productCard);
	}
}

function addItemToList(event) {
	// Prevent the default form submission behavior (which would reload the page)
	event.preventDefault();
	// TODO: Add your code here
	const name = document.querySelector('#productName').value.trim();
	const price = parseFloat(document.querySelector('#productPrice').value);
	const description = document.querySelector('#productDescription').value;
	const category = document.querySelector('#productCategory').value;
	const inStock = document.querySelector('#productInStock').checked;
	const product = { name: name, price: price, description: description, category: category, inStock: inStock }
	products.push(product);
	renderProducts();
	productForm.reset();

}

productForm.addEventListener('submit', addItemToList);
renderProducts();
