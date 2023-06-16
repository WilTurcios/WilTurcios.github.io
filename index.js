// Importar módulos y componentes necesarios
import ListOfCards from "./components/ListOfCards.js";
import PRODUCTS from "./services/db.js";
import Categories from "./components/Categories.js";
import { Filters } from "./components/Filters.js";
import Cart from "./components/Cart.js";
import Detail from "./components/Detail.js";
import Menu from "./components/Menu.js";
import { createElement, getElement } from "./utilities/utilities.js";
import {
  CreatePaymentModal,
  closeModal,
  submitCartForm,
} from "./components/PaymentModal.js";
import FormValidator from "./components/FormValidation.js";

// Obtener referencias al documento y la ubicación actual
const d = document;
const path = location.pathname;

// Función que agrega opciones al selector de tallas en la página de detalle del producto
function addOptions() {
  // Obtener elementos necesarios
  const $select = getElement({ selector: ".detail-card select" });
  const addToCartBtn = getElement({ selector: ".add-to-cart-btn" });
  const fragment = document.createDocumentFragment();

  // Obtener información del producto almacenada en el almacenamiento local
  const [{ sizes, pricing }] = JSON.parse(localStorage.getItem("product"));

  // Crear opciones para cada talla y agregarlas al fragmento
  sizes.forEach((size) => {
    let option = createElement({
      elementType: "option",
      attributes: { value: size, id: size },
    });

    option.innerText = size;

    fragment.appendChild(option);
  });

  // Agregar el fragmento con las opciones al selector de tallas
  $select.appendChild(fragment);

  // Evento que se ejecuta cuando se cambia la opción seleccionada en el selector de tallas
  $select.addEventListener("change", (e) => {
    const price = getElement({ selector: "#price" });
    price.innerText = `$${pricing[e.target.value]}`;
    addToCartBtn.innerText = `Agregar al carrito talla: ${e.target.value}`;
  });
  return true;
}

// Evento que se ejecuta cuando se hace clic en el documento
d.addEventListener("click", (e) => {
  // Ejecutar la funcionalidad del menú
  Menu(e);

  // Abrir el modal de pago cuando se hace clic en "Comprar productos"
  if (
    e.target.matches(".buy-products") ||
    e.target.matches(".buy-products *")
  ) {
    CreatePaymentModal({ insertAfter: ".main" });
    FormValidator({ target: ".form" });
  }

  // Cerrar el modal de pago cuando se hace clic en el botón de cerrar
  if (
    e.target.matches("#payment-modal .close-dialog") ||
    e.target.matches("#payment-modal .close-dialog *")
  ) {
    closeModal("#payment-modal");
  }
});

// Evento que se ejecuta cuando se envía un formulario
document.addEventListener("submit", (e) => {
  // Prevenir el comportamiento predeterminado en la página de carrito
  const { target } = e;
  e.preventDefault();
  if (path === "/pages/cart.html") {
    if (e.target.matches(".form")) {
      submitCartForm({ target });
    }
  }
});

// Evento que se ejecuta cuando el documento ha sido cargado
d.addEventListener("DOMContentLoaded", (e) => {
  // Cargar la lista de productos en la página de inicio
  if (path === "/index.html" || path === "/") {
    ListOfCards({
      element: ".products-cards",
      products: PRODUCTS,
      detailUrl: "/pages/detail.html",
      limitOfCards: 6,
    });
  }

  // Configurar la funcionalidad de búsqueda y filtrado en la página de productos
  if (path === "/pages/products.html") {
    let inputSearchValue = null;
    let inputCategoryValue = null;

    // Función para renderizar la lista de productos con los filtros aplicados
    const renderListOfCards = ({ category = "", search = null }) => {
      return ListOfCards({
        element: ".products-cards",
        products: Filters({
          PRODUCTS,
          byCategory: category,
          bySearch: search,
        }),
        detailUrl: "/pages/detail.html",
      });
    };

    // Evento que se ejecuta cuando se envía el formulario de búsqueda
    document.addEventListener("submit", (e) => {
      if (e.target.matches(".products-form form")) {
        e.preventDefault();
        inputSearchValue = e.target.search.value;
        inputCategoryValue = "";

        renderListOfCards({
          category: inputCategoryValue,
          search: inputSearchValue,
        });
        e.target.search.value = "";
      }
    });

    // Evento que se ejecuta cuando se hace clic en una categoría
    document.addEventListener("click", (e) => {
      if (e.target.matches(".products-categories button")) {
        inputSearchValue = null;
        inputCategoryValue = e.target.value;

        renderListOfCards({
          category: inputCategoryValue,
          search: inputSearchValue,
        });
      }
    });

    // Renderizar la lista de productos inicialmente sin filtros
    renderListOfCards({
      category: inputCategoryValue,
      search: inputSearchValue,
    });
  }

  // Cargar las categorías de productos en la página de productos
  if (path === "/pages/products.html") {
    Categories({ PRODUCTS });
  }

  // Cargar el carrito de compras en la página de carrito
  if (path === "/pages/cart.html") {
    Cart();
  }

  if (path === "/pages/contact.html") {
    FormValidator({ target: ".form" });
  }
  // Cargar los detalles del producto en la página de detalle del producto
  if (path === "/pages/detail.html") {
    Detail({ target: ".detail" });

    // Agregar las opciones al selector de tallas
    addOptions();
  }
});
