import { getElement } from "../utilities/utilities.js";

/**
 * Controla el comportamiento del menú desplegable.
 * @param {Event} e - Evento de clic.
 */
export default function Menu(e) {
  const $navbar = getElement({ selector: ".navbar" });
  const $open = getElement({ selector: ".open" });
  const $close = getElement({ selector: ".close" });

  // Comprobar si se hizo clic fuera del menú desplegable
  if (
    !(
      e.target.matches(".hamburger-btn") ||
      e.target.matches(".hamburger-btn *") ||
      e.target.matches(".navbar")
    )
  ) {
    // Ocultar el menú desplegable y mostrar el botón de abrir
    $navbar.classList.remove("is-active");
    $close.classList.add("none");
    $open.classList.remove("none");
  }

  // Comprobar si se hizo clic en el botón de menú
  if (
    e.target.matches(".hamburger-btn") ||
    e.target.matches(".hamburger-btn *")
  ) {
    // Alternar la visibilidad del botón de abrir y cerrar, y activar/desactivar el menú desplegable
    $open.classList.toggle("none");
    $close.classList.toggle("none");
    $navbar.classList.toggle("is-active");
  }
}
