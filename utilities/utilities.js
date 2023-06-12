export function createElement({ elementType, className, attributes = null }) {
  const element = document.createElement(elementType); // Crear un nuevo elemento utilizando el tipo de elemento especificado

  if (className) element.classList.add(className); // Agregar la clase CSS al elemento si se proporciona

  if (attributes) {
    // Si se proporcionan atributos
    Object.entries(attributes).forEach(([key, value]) => {
      // Recorrer los pares clave-valor del objeto de atributos
      element.setAttribute(key, value); // Establecer cada atributo en el elemento
    });
  }

  return element; // Retornar el elemento creado
}

export function getElement({ selector, all = false }) {
  let element; // Variable para almacenar el elemento o la lista de elementos seleccionados

  if (!all) return (element = document.querySelector(selector)); // Si all es false, seleccionar y retornar el primer elemento que coincide con el selector

  return (element = document.querySelectorAll(selector)); // Si all es true, seleccionar y retornar todos los elementos que coinciden con el selector
}

export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
