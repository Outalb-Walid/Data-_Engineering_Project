//TODO: open and close the products cart when clicking on cart button
function openCart(dropdown, overlay) {
  dropdown.style.display = 'block';

  setTimeout(() => {
    overlay.classList.add('show-overlay');
    dropdown.classList.add('show-cart');
  }, 10);
}

function closeCart(dropdown, overlay) {
  overlay.classList.remove('show-overlay');
  dropdown.classList.remove('show-cart');

  setTimeout(() => {
    dropdown.style.display = 'none';
  }, 300);
}

function showCart() {
  const cartBtn = document.querySelector('.navbar-cart');
  const pageOverlay = document.querySelector('.page-overlay');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const closeBtn = document.querySelector('.close-btn');

  cartBtn.addEventListener('click', () => {
    openCart(cartDropdown, pageOverlay);
  });

  closeBtn.addEventListener('click', () => {
    closeCart(cartDropdown, pageOverlay);
  });

  pageOverlay.addEventListener('click', () => {
    closeCart(cartDropdown, pageOverlay);
  });
}
showCart();

//TODO: setup the counter of the cart products
function cartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  const cartProducts = document.querySelectorAll(
    '.cart-products > .product'
  ).length;

  cartCounter.textContent = cartProducts;
}
cartCounter();
