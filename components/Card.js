import { createElement } from "../utilities.js";

export default function Card({ imgUrl, name, price, id, detailUrl }) {
  const $card = createElement({
    elementType: "article",
    className: "card",
    // attributes: {
    //   style: `--card-delay: ${id / 0.3};`,
    // },
  });

  $card.innerHTML = `
  <div class="card-img">
    <img src=${imgUrl} alt=${name}>
  </div>
  <div class="card-text">
    <p>
      ${name}
    </p>
    <span>$${price}</span>
  </div>
  <a href=${detailUrl} data-id=${id} class="primary-btn">Detalles</a>`;

  return $card;
}
