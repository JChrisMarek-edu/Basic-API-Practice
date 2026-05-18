const tableBody = document.querySelector('#products-body');
const form = document.querySelector('#product-form');
const message = document.querySelector('#message');

function ShowMessage(text) {
  message.textContent = text;
}

function AddProductRow(product) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><a href="/api/products/${product._id}">${product.name}</a></td>
    <td>${product.year}</td>
    <td>${product.minutes}</td>
    <td>${product.director}</td>
  `;
  tableBody.appendChild(row);
}

async function LoadProducts() {
  tableBody.innerHTML = '';
  const response = await fetch('/api/products');
  const products = await response.json();
  products.forEach(AddProductRow);
  ShowMessage(`Loaded ${products.length} movie(s).`);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const product = {
    name: formData.get('name'),
    year: Number(formData.get('year')),
    minutes: Number(formData.get('minutes')),
    director: formData.get('director')
  };

  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  if (!response.ok) {
    const error = await response.json();
    ShowMessage(error.error || 'Could not add movie.');
    return;
  }

  form.reset();
  await LoadProducts();
});

LoadProducts().catch(error => ShowMessage(error.message));
