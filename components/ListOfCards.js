import PRODUCTS from "../services/db.js";
import Card from "./Card.js";

export default function ListOfCards({
  element,
  products,
  detailUrl,
  limitOfCards = null,
}) {
  const $cards = document.querySelector(element);
  $cards.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let limitOfProducts = limitOfCards
    ? products.slice(0, limitOfCards)
    : products;

  limitOfProducts.forEach(({ imgUrl, id, productName: name, pricing }) => {
    fragment.appendChild(
      Card({ imgUrl, id, name, price: pricing.S, detailUrl })
    );
  });

  $cards.appendChild(fragment);
  return $cards;
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".card a")) {
    const ID = +e.target.getAttribute("data-id");
    const product = JSON.stringify(PRODUCTS.filter((p) => p.id === ID));

    localStorage.setItem("product", product);
  }
});
