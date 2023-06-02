import PRODUCTS from "../services/db.js";
import { getElement } from "../utilities.js";

export default function Detail({ target }) {
  const $detail = getElement({ selector: target });
  const product = JSON.parse(localStorage.getItem("product"));

  const [{ id, imgUrl, productName, pricing, sizes, productDescription }] =
    product;

  $detail.classList.add("detail-card");

  $detail.innerHTML = `
  <button class="back">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"/></svg>
  </button>
  <div class="detail-header">
    <div class="detail-card-title">
    <h1>${productName}</h1>
    </div>
    <div class="detail-card-img">
      <img src=${imgUrl} alt=${productName}>
    </div>
  </div>
  <div class="detail-body">
    <div class="detail-card-content-container">
      <div class="detail-card-content">
      <h2>${productName}</h2>
      <span id="price" >$${pricing.S}</span>
      <p>${productDescription}</p>
    </div>
    <div class="detail-card-actions">
      <button id=${id} style="--color: var(--first-color)"  class="call-to-action add-to-cart-btn" >
        Agregar al carrito
      </button>
      <div style="--color: var(--second-color);"  class="call-to-action">
        <label for="sizes">
          Talla:
        </label>
        <select id="sizes">
        </select>
      </div>
    </div>
  </div>
  `;
  return $detail;
}

const cartElements = JSON.parse(localStorage.getItem("cartElements")) || [];

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-to-cart-btn")) {
    const productID = +e.target.id;
    const addBtn = e.target;
    const selectedProduct = PRODUCTS.find((p) => p.id === productID);
    const size = getElement({ selector: "#sizes" }).value;

    addBtn.innerText = "+";

    const existingProductIndex = cartElements.findIndex(
      (p) => p.id === productID
    );

    if (selectedProduct && existingProductIndex !== -1) {
      const existingProduct = cartElements[existingProductIndex];
      existingProduct.quantity++;
      existingProduct.cartProductsSizes.push(size);
    } else {
      selectedProduct.quantity = 1;
      selectedProduct.cartProductsSizes = [size];
      cartElements.push(selectedProduct);
    }

    localStorage.setItem("cartElements", JSON.stringify(cartElements));
  }

  if (!(e.target.matches(".back") || e.target.matches(".back *"))) return false;

  if (e.target.matches(".back") || e.target.matches(".back *")) {
    history.back(1);
  }
});
