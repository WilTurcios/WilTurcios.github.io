import { createElement } from "../utilities/utilities.js";

export default function Card({ imgUrl, name, price, id, detailUrl }) {
  // Crear un elemento de artículo para la tarjeta
  const $card = createElement({
    elementType: "article",
    className: "card",
  });

  // Establecer el contenido HTML de la tarjeta
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
    <a href=${detailUrl} data-id=${id} class="primary-btn">
      <span data-id=${id}>Detalles</span>
      <svg data-id=${id} xmlns="http://www.w3.org/2000/svg"><path data-id=${id} d="m13.061 4.939-2.122 2.122L15.879 12l-4.94 4.939 2.122 2.122L20.121 12z"></path><path data-id=${id} d="M6.061 19.061 13.121 12l-7.06-7.061-2.122 2.122L8.879 12l-4.94 4.939z"></path></svg>
    </a>`;

  // Devolver el elemento de tarjeta generado
  return $card;
}
