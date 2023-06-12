import { createElement, delay, getElement } from "../utilities/utilities.js";

let isBought = false;

/**
 * Obtiene el monto total de los productos en el carrito.
 * @returns {number} - Monto total.
 */
function getTotalAmount() {
  const cartElements = JSON.parse(localStorage.getItem("cartElements"));

  let totalAmount = 0;

  const listOfSizes = cartElements
    .map((element) => element.cartProductsSizes)
    .flat();
  const pricing = cartElements[0].pricing;

  listOfSizes.forEach((size) => {
    totalAmount += pricing[size];
  });

  return totalAmount;
}

/**
 * Crea el elemento del carrito de compra.
 * @param {object} param - Parámetros del producto.
 * @returns {HTMLElement} - Elemento del carrito de compra.
 */
function createCartElement({ product }) {
  const {
    id,
    generalCategory,
    imgUrl,
    pricing,
    productName,
    quantity,
    cartProductsSizes,
  } = product;

  const total = cartProductsSizes.reduce(
    (sum, size) => (sum += pricing[size]),
    0
  );

  const $cartItem = createElement({
    elementType: "article",
    className: "cartItem",
  });

  const uniqueSizes = cartProductsSizes.join(", ");

  $cartItem.innerHTML = `
    <img class="cartItem-img" src=${imgUrl} alt=${productName}>
    <div class="cartItem-text">
      <div>
        <small>Categoria</small>
        <span>${generalCategory}</span>
      </div>
      <div>
        <small>Tallas:</small>
        <span>${uniqueSizes}</span>
      </div>
      <div>
        <small>Cantidad:</small>
        <span>${quantity}</span>
      </div>
      <div>
        <small>Subtotal:</small>
        <span>$${total}</span>
      </div>
      <div>
        <button class="del-item" id=${id}>
          <svg style="fill: #ffffff;" id=${id} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path id=${id} d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  return $cartItem;
}

/**
 * Crea los elementos de acción del carrito de compra.
 * @returns {HTMLElement} - Elementos de acción del carrito de compra.
 */
function createCartActionElements() {
  const $actions = createElement({
    elementType: "div",
    className: "cart-actions",
  });

  const total = getTotalAmount();

  $actions.innerHTML = `
    <button class="clear-cart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: #ffffff;">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
      </svg>
      <span>Limpiar Carrito</span>
    </button>
    <div>
        <strong>Total</strong>
        <span>$${total}</span>
    </div>
    <button class="buy-products">Comprar</button>
  `;

  return $actions;
}

/**
 * Vacía el carrito de compra y recarga la página.
 * @param {HTMLElement} param - Parámetros del elemento del carrito de compra.
 * @returns {HTMLElement} - Elemento del carrito vacío.
 */
function emptyCart({ element }) {
  return (element.outerHTML = `
    <div class="empty-cart">
      <h2>
        Tu carrito está vacío :(. Pero no te preocupes, tenemos muchos productos que esperan por ti
      </h2>
      <a href="../pages/products.html" class="call-to-action" style="--color: var(--second-color)">
        Productos
      </a>
    </div>
    
    `);
}

/**
 * Controla el comportamiento del carrito de compra.
 */
export default function Cart() {
  const $cart = getElement({ selector: ".cart" });
  const products = JSON.parse(localStorage.getItem("cartElements"));
  const fragment = document.createDocumentFragment();

  if (products.length <= 0 && !isBought) {
    emptyCart({ element: $cart });
  } else {
    products.forEach((product) => {
      fragment.appendChild(createCartElement({ product }));
    });

    $cart.append(fragment);
    $cart.insertAdjacentElement("afterend", createCartActionElements());
  }
}

/**
 * Limpia el carrito de compra y recarga la página.
 */
export function clearCart() {
  localStorage.setItem("cartElements", JSON.stringify([]));
  location.reload();
}

/**
 * Elimina un elemento del carrito de compra y recarga la página.
 * @param {object} param - Parámetros del elemento a eliminar.
 */
function deleteCartItem({ id }) {
  let cartItems = JSON.parse(localStorage.getItem("cartElements"));

  const filteredItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cartElements", JSON.stringify(filteredItems));
  location.reload();
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".clear-cart") || e.target.matches(".clear-cart *")) {
    clearCart();
  }

  if (e.target.matches(".del-item") || e.target.matches(".del-item *")) {
    const id = +e.target.id;
    deleteCartItem({ id });
  }
});
