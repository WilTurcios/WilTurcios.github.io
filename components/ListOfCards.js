import PRODUCTS from "../services/db.js";
import Card from "./Card.js";

/**
 * Componente que muestra una lista de tarjetas de productos.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.element - Selector del elemento contenedor de las tarjetas.
 * @param {Array} props.products - Array de productos a mostrar.
 * @param {string} props.detailUrl - URL de detalles de los productos.
 * @param {number|null} props.limitOfCards - Límite opcional de tarjetas a mostrar.
 * @returns {HTMLElement} - Elemento contenedor de las tarjetas.
 */
export default function ListOfCards({
  element,
  products,
  detailUrl,
  limitOfCards = null,
}) {
  const $cards = document.querySelector(element);

  // Limpiar contenido previo del contenedor
  $cards.innerHTML = "";

  const fragment = document.createDocumentFragment();
  let limitOfProducts = limitOfCards
    ? products.slice(0, limitOfCards)
    : products;

  // Generar tarjetas para cada producto y añadirlas al fragmento
  limitOfProducts.forEach(({ imgUrl, id, productName: name, pricing }) => {
    fragment.appendChild(
      Card({ imgUrl, id, name, price: pricing.S, detailUrl })
    );
  });

  // Añadir el fragmento al contenedor de las tarjetas
  $cards.appendChild(fragment);

  // Devolver el elemento contenedor de las tarjetas
  return $cards;
}

// Escuchar eventos de clic en el documento
document.addEventListener("click", (e) => {
  if (e.target.matches(".card a") || e.target.matches(".card a *")) {
    const ID = +e.target.getAttribute("data-id");

    // Filtrar y convertir a JSON el producto seleccionado
    const product = JSON.stringify(PRODUCTS.filter((p) => p.id === ID));

    // Almacenar el producto en el almacenamiento local
    localStorage.setItem("product", product);
  }
});
