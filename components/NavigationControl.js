import { createElement, getElement } from "../utilities.js";

export default function NavigationControl() {
  const body = getElement({ selector: "body" });
  const backButton = createElement({
    elementType: "button",
    className: "go-back",
  });
  const forwardButton = createElement({
    elementType: "button",
    className: "go-forward",
  });
  backButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
  `;
  forwardButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
  `;

  body.append(backButton);
  if (history.length > 1 && history) {
    body.append(forwardButton);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".go-back") || e.target.matches(".go-back *")) {
    history.go(-1);
  }
  if (e.target.matches(".go-forward") || e.target.matches(".go-forward *")) {
    history.go(1);
  }
});
