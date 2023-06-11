export function createElement({ elementType, className, attributes = null }) {
  const element = document.createElement(elementType);

  if (className) element.classList.add(className);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}

export function getElement({ selector, all = false }) {
  let element;

  if (!all) return (element = document.querySelector(selector));

  return (element = document.querySelectorAll(selector));
}

export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
