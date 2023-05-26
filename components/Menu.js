import { getElement } from "../utilities.js";

export default function Menu(e) {
  const $navbar = getElement({ selector: ".navbar" });
  const $open = getElement({ selector: ".open" });
  const $close = getElement({ selector: ".close" });

  if (
    !(
      e.target.matches(".hamburger-btn") ||
      e.target.matches(".hamburger-btn *") ||
      e.target.matches(".navbar")
    )
  ) {
    $navbar.classList.remove("is-active");
    $close.classList.add("none");
    $open.classList.remove("none");
  }

  if (
    e.target.matches(".hamburger-btn") ||
    e.target.matches(".hamburger-btn *")
  ) {
    $open.classList.toggle("none");
    $close.classList.toggle("none");
    $navbar.classList.toggle("is-active");
  }
}
