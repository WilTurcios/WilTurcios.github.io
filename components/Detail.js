import PRODUCTS from "../services/db.js";
import { getElement } from "../utilities/utilities.js";

/**
 * Componente que muestra los detalles de un producto.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.target - Selector del elemento contenedor de los detalles.
 * @returns {HTMLElement} - Elemento contenedor de los detalles del producto.
 */
export default function Detail({ target }) {
  const $detail = getElement({ selector: target });

  // Obtener el producto almacenado en el almacenamiento local y convertirlo de nuevo a objeto
  const product = JSON.parse(localStorage.getItem("product"));

  // Desestructurar el primer elemento del array de productos (se asume que solo hay uno)
  const [{ id, imgUrl, productName, pricing, productDescription }] = product;

  // Agregar la clase "detail-card" al elemento contenedor de los detalles
  $detail.classList.add("detail-card");

  // Establecer el contenido HTML de los detalles del producto
  $detail.innerHTML = `
    <button class="back">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"/></svg>
    </button>
    <div class="detail-header">
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
          <button id=${id} style="--color: var(--first-color)" class="call-to-action add-to-cart-btn">
            Agregar al carrito talla: S
          </button>
          <div style="--color: var(--second-color);" class="call-to-action">
            <label for="sizes">
              Talla:
            </label>
            <select id="sizes">
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  // Devolver el elemento contenedor de los detalles del producto
  return $detail;
}

// Obtener los elementos del carrito desde el almacenamiento local o inicializar un array vacío
const cartElements = JSON.parse(localStorage.getItem("cartElements")) || [];

// Escuchar eventos de clic en el documento
document.addEventListener("click", (e) => {
  if (e.target.matches(".back") || e.target.matches(".back *")) {
    // Navegar hacia atrás en el historial del navegador
    history.back(1);
  }
  if (e.target.matches(".add-to-cart-btn")) {
    // Obtener el ID del producto seleccionado desde el atributo "id" del botón
    const productID = +e.target.id;

    // Encontrar el producto seleccionado en la lista de productos
    const selectedProduct = PRODUCTS.find((p) => p.id === productID);

    // Obtener el valor seleccionado del elemento <select> de tallas
    const size = getElement({ selector: "#sizes" }).value;

    // Buscar el índice del producto existente en el carrito
    const existingProductIndex = cartElements.findIndex(
      (p) => p.id === productID
    );

    if (selectedProduct && existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad y agregar la talla
      const existingProduct = cartElements[existingProductIndex];
      existingProduct.quantity++;
      existingProduct.cartProductsSizes.push(size);
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1 y la talla
      selectedProduct.quantity = 1;
      selectedProduct.cartProductsSizes = [size];
      cartElements.push(selectedProduct);
    }

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem("cartElements", JSON.stringify(cartElements));
  }
});
