//* Start Reusable Functions
// This function opens the cart side dropdown menu
function openDropdown(dropdown, overlay, dropdownClass, overlayClass) {
  dropdown.style.display = 'block';
  overlay.style.display = 'block';
  setTimeout(() => {
    dropdown.classList.add(dropdownClass);
    overlay.classList.add(overlayClass);
  }, 10);
}

//  This function closes the cart side dropdown menu
function closeDropdown(dropdown, overlay, dropdownClass, overlayClass) {
  dropdown.classList.remove(dropdownClass);
  overlay.classList.remove(overlayClass);

  setTimeout(() => {
    dropdown.style.display = 'none';
    overlay.style.display = 'none';
  }, 300);
}

// This code makes the overlay close displayed model (dropdown)
function OverlayCloseAction(dropdown, overlay, dropdownClass, overlayClass) {
  overlay.addEventListener('click', () => {
    closeDropdown(dropdown, overlay, dropdownClass, overlayClass);
  });
}

// This code setup the purpose of the close button in the quick view window
function quickViewClose(window, overlay) {
  window.firstElementChild.lastElementChild.addEventListener('click', () => {
    closeDropdown(window, overlay, 'quick-view-show', 'show-overlay');
  });
}

// This code change the Add_To_Cart property in the products array in local storage
function changeProductStatus(productName) {
  const products = JSON.parse(localStorage.getItem('products'));
  products.forEach((product, id) => {
    if (product.Product_Name === productName) {
      products[id] = { ...product, Added_To_Cart: true };
    }
  });
  localStorage.setItem('products', JSON.stringify(products));
}

// This code displays the products from local storage to the cart side dropdown menu
function displayCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  const cartSection = document.querySelector('.cart-products');
  if (cartProducts.length) {
    cartProducts.forEach((product) => {
      cartSection.innerHTML += `
          <div class="product">
            <div class="product-image">
              <img src="${product.image}" alt="product image" />
            </div>
            <div class="product-proceed">
              <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-info-price">
                  Price: <span id="price">$${product.price}</span>
                </p>
                <p class="product-info-amount">
                  Amount: <span id="amount">${product.amount}</span>
                </p>
                <p class="product-info-total">
                  Total: <span id="total">$${product.total}</span>
                </p>
              </div>
              <div class="product-purchase">
                <button class="purchase-btn">$</button>
                <button class="remove-btn">X</button>
              </div>
            </div>
          </div>
      `;
    });
  } else {
    cartSection.innerHTML = `<div class='empty-cart'>Your Cart Is Empty!</div>`;
  }
}

// This code checks if the product is actually in the cart or not
function checkInStorage(name) {
  const cartStorage = JSON.parse(localStorage.getItem('cartProducts'));
  let checked = false;
  cartStorage.forEach((item) => {
    if (item.name === name) {
      checked = true;
    }
  });

  return checked;
}

//*** Add product to the local storage
function addToStorage(product) {
  const cartStorage = JSON.parse(localStorage.getItem('cartProducts'));
  cartStorage.push(product);
  localStorage.setItem('cartProducts', JSON.stringify(cartStorage));
  displayCartProducts();
  cartCounter();
}

// show message
function showMsg(msg, msgClass) {
  const message = document.querySelector('.product-msg');
  message.innerHTML = msg;
  message.classList.add(msgClass);
  setTimeout(() => {
    message.classList.remove(msgClass);
  }, 3000);
}

// This code removes the product from the cart
function removeFromCart(name) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

  const newProducts = cartProducts.filter((product) => {
    return product.name !== name;
  });
  localStorage.setItem('cartProducts', JSON.stringify(newProducts));
  updateProducts(name, false);
  showMsg('removing the product...', 'show-error');
}

function switchBtnContent(btn) {
  btn.classList.toggle('remove-btn');
  if (btn.classList.contains('remove-btn')) {
    btn.textContent = 'Remove From Cart';
  } else {
    btn.textContent = 'Add To Cart';
  }
}

//This code will add the product to the cart through add to cart button (with default choices for the user)
function addToCart() {
  const addToCartBtns = document.querySelectorAll(
    '.product-item .product-item-btns .add-to-cart:not(.remove-btn)'
  );
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cartSection = document.querySelector('.cart-products');
      const price =
        e.target.parentElement.previousElementSibling.lastElementChild.textContent.slice(
          1
        );
      const name =
        e.target.parentElement.parentElement.firstElementChild.textContent;
      const image =
        e.target.parentElement.parentElement.previousElementSibling.src;
      const productCart = {
        name,
        price,
        image,
        amount: 1,
        total: price,
      };
      if (!checkInStorage(productCart.name)) {
        const successMsg =
          'The product has been added to your cart successfully. Proceed to checkout and make your purchase now!';
        cartSection.innerHTML = '';
        changeProductStatus(name);
        addToStorage(productCart);
        showMsg(successMsg, 'show-msg');
        switchBtnContent(e.target, name);
        updateProducts(name, true);
        removeFromStorage();
      }
    });
  });
}

// This code add click event on remove buttons
function removeFromStorage() {
  const removeFromCartBtns = document.querySelectorAll(
    '.product-item .product-item-btns .remove-btn'
  );
  removeFromCartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productTitle =
        e.target.parentElement.parentElement.firstElementChild.textContent;
      console.log(productTitle);
      switchBtnContent(e.target);
      removeFromCart(productTitle);
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  });
}
//* End Reusable Functions

//TODO: Add Products To LocalStorage
function addProductsToStorage() {
  let products = [
    {
      id: 1,
      Product_Name: 'Macbook air',
      Product_Price: 999.99,
      Product_Image: '1.jpg',
      Added_To_Cart: false,
    },
    {
      id: 2,
      Product_Name: 'DYMO LabelWriter',
      Product_Price: 189.99,
      Product_Image: '2.jpg',
      Added_To_Cart: false,
    },
    {
      id: 3,
      Product_Name: 'GSKILL TRIDENT Z5 NEO',
      Product_Price: 10579.99,
      Product_Image: '3.jpg',
      Added_To_Cart: false,
    },
    {
      id: 4,
      Product_Name: 'ACER 23.8" MONTIROR',
      Product_Price: 5599.99,
      Product_Image: '4.jpg',
      Added_To_Cart: false,
    },
    {
      id: 5,
      Product_Name: 'A4TECH PK-910P',
      Product_Price: 29.99,
      Product_Image: '5.jpg',
      Added_To_Cart: false,
    },
    {
      id: 6,
      Product_Name: 'ACER WORKSTATION DESK',
      Product_Price: 999.99,
      Product_Image: '6.jpg',
      Added_To_Cart: false,
    },
  ];

  // if the products array is not in local storage, set it to the local storage
  if (!JSON.parse(localStorage.getItem('products'))) {
    localStorage.setItem('products', JSON.stringify(products));
  }
}
addProductsToStorage();

//TODO: Display the products in the page
function displayProducts() {
  let products = JSON.parse(localStorage.getItem('products'));
  const productSection = document.querySelector('.products-section');

  // Check if the products is actually in local storage or not, and if not then store it again
  if (!products) {
    addProductsToStorage();
  }

  products.forEach((product) => {
    productSection.innerHTML += `
          <div class="product-item" data-id="${product.id}">
            <img src="./assests/images/products/${product.Product_Image}" alt="product image ${product.id}" />
            <div class="product-item-info">
              <h3 class="product-item-name">${product.Product_Name}</h3>
              <p class="product-item-price">Price: <span>$${product.Product_Price}</span></p>
              <div class="product-item-btns">
                <button class="add-to-cart">Add To Cart</button>
                <button class="quick-view-btn">Quick View</button>
              </div>
            </div>
          </div>
    `;
  });
  addToCart();
  showQuickView();
}
displayProducts();
displayCartProducts();

//TODO: make the buttons switching classes depending on the products true or false from local storage
function checkAddToCartBtn() {
  const products = JSON.parse(localStorage.getItem('products'));
  const addToCartBtns = document.querySelectorAll(
    '.product-item .product-item-btns .add-to-cart'
  );

  for (let x = 0; x < addToCartBtns.length; x++) {
    const btn = addToCartBtns[x];
    const itemId =
      addToCartBtns[x].parentElement.parentElement.parentElement.dataset.id;
    for (let y = 0; y < products.length; y++) {
      if (products[y].id == itemId && products[y].Added_To_Cart) {
        btn.textContent = 'Remove From Cart';
        btn.classList.add('remove-btn');
        break;
      } else if (products[y].id == itemId && !products[y].Added_To_Cart) {
        btn.textContent = 'Add To Cart';
        btn.classList.remove('remove-btn');
        break;
      }
    }
  }
  removeFromStorage();
}
checkAddToCartBtn();

//TODO: check the cart status and update the products array in local storage
function updateProducts(name, boolean) {
  const products = JSON.parse(localStorage.getItem('products'));
  for (let x = 0; x < products.length; x++) {
    if (boolean && products[x].Product_Name === name) {
      products[x] = { ...products[x], Added_To_Cart: true };
      break;
    }

    if (!boolean && products[x].Product_Name === name) {
      products[x] = { ...products[x], Added_To_Cart: false };
    }
  }
  localStorage.setItem('products', JSON.stringify(products));
}

//TODO: open and close the products cart when clicking on cart button
function showCart() {
  const cartBtn = document.querySelector('.navbar-cart');
  const pageOverlay = document.querySelector('.page-overlay');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const closeBtn = document.querySelector('.close-btn');

  cartBtn.addEventListener('click', () => {
    openDropdown(cartDropdown, pageOverlay, 'show-cart', 'show-overlay');
  });

  closeBtn.addEventListener('click', () => {
    closeDropdown(cartDropdown, pageOverlay, 'show-cart', 'show-overlay');
  });

  OverlayCloseAction(cartDropdown, pageOverlay, 'show-cart', 'show-overlay');
}
showCart();

//TODO: setup the counter of the cart products
function cartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  cartCounter.textContent = cartProducts.length;
}
cartCounter();

//TODO: set the local storage cart array
function localStorageCart() {
  if (!localStorage.getItem('cartProducts')) {
    localStorage.setItem('cartProducts', JSON.stringify([]));
  }
}
localStorageCart();

//TODO: Show Quick View Model for each project
function showQuickView() {
  const quickViewBtn = document.querySelectorAll('.quick-view-btn');
  const quickView = document.querySelector('.quick-view');
  const pageOverlay = document.querySelector('.page-overlay');
  // Creating click events for quick view buttons on product pages to display a model structure
  quickViewBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productImage =
        e.target.parentElement.parentElement.previousElementSibling.src;
      const productPrice =
        e.target.parentElement.previousElementSibling.firstElementChild
          .textContent;
      const productName =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      const quickViewContent = `
      <div class="quick-view-title">
        <h3 id="quick-view-name">${productName}</h3>
        <button class="quick-view-close">X</button>
      </div>
      <div class="line"></div>
      <div class="quick-view-proceed">
        <div class="quick-view-image">
          <img src="${productImage}" alt="product image" />
        </div>
        <div class="quick-view-add">
          <div id="quick-view-price">Price: <span>${productPrice}</span></div>
          <input type="number" name="amount" id="amount" min="1"/>
          <button class="add-to-cart">Add To Cart</button>
        </div>
      </div>
      `;
      quickView.innerHTML = quickViewContent;
      openDropdown(quickView, pageOverlay, 'quick-view-show', 'show-overlay');

      // Add click event on the close button of the quick view window when it is created
      if (quickView.firstElementChild.lastElementChild) {
        quickViewClose(quickView, pageOverlay);
      }

      OverlayCloseAction(
        quickView,
        pageOverlay,
        'quick-view-show',
        'show-overlay'
      );
    });
  });
}
