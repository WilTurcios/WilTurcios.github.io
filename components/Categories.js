import { createElement, getElement } from "../utilities/utilities.js";

/**
 * Componente que muestra las categorías de productos como botones.
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.PRODUCTS - Array de productos.
 * @returns {HTMLElement} - Elemento contenedor de los botones de categoría.
 */
export default function Categories({ PRODUCTS }) {
  const $categoryBtns = getElement({ selector: ".products-categories" });

  // Crear un fragmento de documento para mejorar la eficiencia al agregar elementos al DOM
  const fragment = document.createDocumentFragment();

  // Obtener las categorías únicas de los productos
  const categories = PRODUCTS.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  // Crear un botón por cada categoría y agregarlo al fragmento
  categories.forEach((category) => {
    const $button = createElement({ elementType: "button" });
    $button.value = category;
    $button.innerText = category;
    fragment.append($button);
  });

  // Añadir los botones al elemento contenedor
  $categoryBtns.appendChild(fragment);

  // Devolver el elemento contenedor de los botones de categoría
  return $categoryBtns;
}

// Agregar un evento de clic al documento para cambiar la clase "active" en los botones de categoría
document.addEventListener("click", (e) => {
  if (e.target.matches(".products-categories button")) {
    const buttons = document.querySelectorAll(".products-categories button");

    // Remover la clase "active" de todos los botones
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    // Agregar la clase "active" al botón seleccionado
    e.target.classList.add("active");
  }
});
