import ListOfCards from "./components/ListOfCards.js";
import PRODUCTS from "./services/db.js";
import Categories from "./components/Categories.js";
import { Filters } from "./components/Filters.js";
import Cart from "./components/Cart.js";
import Detail from "./components/Detail.js";
import Menu from "./components/Menu.js";

import { createElement, getElement } from "./utilities.js";
import { CreatePaymentModal, closeModal } from "./components/PaymentModal.js";

const d = document;
const path = location.pathname;

function addOptions() {
  const $select = getElement({ selector: ".detail-card select" });
  const addToCartBtn = getElement({ selector: ".add-to-cart-btn" });
  const fragment = document.createDocumentFragment();

  const [{ sizes, pricing }] = JSON.parse(localStorage.getItem("product"));

  sizes.forEach((size) => {
    let option = createElement({
      elementType: "option",
      attributes: { value: size, id: size },
    });

    option.innerText = size;

    fragment.appendChild(option);
  });

  $select.appendChild(fragment);

  $select.addEventListener("change", (e) => {
    const price = getElement({ selector: "#price" });
    price.innerText = `$${pricing[e.target.value]}`;
    addToCartBtn.innerText = `Agregar al carrito talla: ${e.target.value}`;
  });
  return true;
}

d.addEventListener("click", (e) => {
  Menu(e);

  if (
    e.target.matches(".buy-products") ||
    e.target.matches(".buy-products *")
  ) {
    CreatePaymentModal({ insertAfter: ".main" });
  }

  if (
    e.target.matches("#payment-modal .close-dialog") ||
    e.target.matches("#payment-modal .close-dialog *")
  ) {
    closeModal("#payment-modal");
  }
});

document.addEventListener("submit", (e) => {
  if (path === "/pages/cart.html") {
    e.preventDefault();
    if (e.target.matches(".form")) {
      const { target } = e;
      submitCartForm({ target });
    }
  }
});

d.addEventListener("DOMContentLoaded", (e) => {
  if (path === "/index.html" || path === "/") {
    ListOfCards({
      element: ".products-cards",
      products: PRODUCTS,
      detailUrl: "/pages/detail.html",
      limitOfCards: 6,
    });
  }

  if (path === "/pages/products.html") {
    let inputSearchValue = null;
    let inputCategoryValue = null;

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

    renderListOfCards({
      category: inputCategoryValue,
      search: inputSearchValue,
    });
  }

  if (path === "/pages/products.html") {
    Categories({ PRODUCTS });
  }

  if (path === "/pages/cart.html") {
    Cart();
  }

  if (path === "/pages/detail.html") {
    Detail({ target: ".detail" });

    addOptions();
  }
});
