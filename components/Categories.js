import PRODUCTS from "../services/db.js";
import { Filters } from "./Filters.js";
import { createElement, getElement } from "../utilities/utilities.js";

export default function Categories({ PRODUCTS }) {
  const $categoryBtns = getElement({ selector: ".products-categories" });
  const fragment = document.createDocumentFragment();

  const categories = PRODUCTS.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }

    return acc;
  }, []);

  categories.forEach((category) => {
    const $button = createElement({ elementType: "button" });
    $button.value = category;
    $button.innerText = category;
    fragment.append($button);
  });

  $categoryBtns.appendChild(fragment);

  return $categoryBtns;
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".products-categories button")) {
    const buttons = document.querySelectorAll(".products-categories button");

    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    e.target.classList.add("active");

    Filters({ PRODUCTS });
  }
});
