# Manual de desarrollador (Documentación de codigo JavaScript)

## IMPLEMENTACIÓN DE FUNCIONES ESENCIALES

### index.js

Este archivo es el punto de entrada de nuestro sitio web, es decir, en el se mandan a llamar todos los módulos que dan funcionalidad a la web.

El código que contiene es el siguiente:

```javascript
import ListOfCards from "./components/ListOfCards.js";
import PRODUCTS from "./services/db.js";
import Categories from "./components/Categories.js";
import { Filters } from "./components/Filters.js";
import Cart from "./components/Cart.js";
import Detail from "./components/Detail.js";
import Menu from "./components/Menu.js";

import { createElement, getElement } from "./utilities/utilities.js";
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
```

1. Importa los diferentes componentes y funciones necesarios para la aplicación, incluyendo _**'ListOfCards', 'PRODUCTS', 'Categories', 'Filters', 'Cart', 'Detail', 'Menu', 'createElement', 'getElement´´, 'CreatePaymentModal' y 'closeModal'**_.

2. Define una función addOptions que agrega las opciones de tamaño a un campo de selección en la página de detalle del producto. Dentro de esta función:

- Obtiene el campo de selección y el botón "Agregar al carrito".
- Crea un fragmento de documento para almacenar las opciones.
- Obtiene los tamaños y precios del producto desde el almacenamiento local.
- Itera sobre los tamaños y crea una opción para cada uno utilizando la función createElement.
- Agrega el texto y los atributos correspondientes a cada opción.
- Agrega cada opción al fragmento.
- Agrega el fragmento al campo de selección.
- Agrega un evento de cambio al campo de selección para actualizar el precio y el texto del botón "Agregar al carrito" según el tamaño seleccionado.

3. Agrega eventos de clic y envío en el documento principal (d). Dentro de estos eventos:

- Llama a la función Menu para manejar los eventos relacionados con el menú.
- Si se hace clic en un elemento con la clase "buy-products" o cualquier elemento secundario, llama a la función CreatePaymentModal para crear y mostrar el modal de pago después del elemento principal.
- Si se hace clic en el botón de cierre del modal de pago, llama a la función closeModal para cerrar el modal.
- Si se envía un formulario y la ruta actual es "/pages/cart.html", previene el comportamiento predeterminado del formulario y verifica si el formulario tiene la clase "form". Si es así, llama a la función submitCartForm pasando el objetivo del formulario.

4. Agrega un evento "DOMContentLoaded" al documento principal. Dentro de este evento:

- Si la ruta actual es "/index.html" o "/", llama a la función ListOfCards para mostrar una lista de tarjetas de productos en el elemento ".products-cards". También limita la cantidad de tarjetas mostradas.
- Si la ruta actual es "/pages/products.html", inicializa las variables inputSearchValue e inputCategoryValue y define una función renderListOfCards que renderiza la lista de tarjetas de productos según los filtros de categoría y búsqueda. También agrega eventos de envío y clic para actualizar los valores de búsqueda y categoría y renderizar las tarjetas correspondientes.
- Llama a la función Categories para mostrar las categorías de productos.
- Si la ruta actual es "/pages/cart.html", llama a la función Cart para mostrar el contenido del carrito de compras.
- Si la ruta actual es "/pages/detail.html", llama a la función Detail para mostrar los detalles del producto y luego llama a la función addOptions para agregar las opciones de tamaño al campo de selección.

### Carpeta utilities

Esta carpeta, además de contener componentes y utilidades CSS, también guarda en ella un archivo con un par de utilidades JavaScript:

#### utilities.js

Dentro de este archivo se encuentran las utilidades JavaScript implementadas en todo el proyecto. Al ir trabajando en el proyecto nos dimos cuenta que habían ciertas interacciones con el DOM que se repetían, por lo que decidimos separar esa porción de código en funciones útiles. A continuación se describirá cada una de ellas:

1. **createElement**:
   La función createElement es una función exportada que se utiliza para crear y retornar un nuevo elemento HTML con opciones de configuración. Toma un objeto como argumento con las siguientes propiedades:

- elementType: El tipo de elemento HTML que se desea crear, por ejemplo, "div", "p", "img", etc.
- className (opcional): Una cadena que representa la clase CSS que se aplicará al elemento.
- attributes (opcional): Un objeto que contiene los atributos y sus valores que se establecerán en el elemento.

La función crea un nuevo elemento utilizando document.createElement(elementType), donde elementType es el tipo de elemento especificado. Luego, se aplican las opciones de configuración al elemento creado.

Si se proporciona un className, se agrega esa clase al elemento utilizando element.classList.add(className).

Si se proporcionan attributes, se recorren los pares clave-valor del objeto utilizando Object.entries(attributes) y se establece cada atributo en el elemento utilizando element.setAttribute(key, value).

Finalmente, se retorna el elemento creado con todas las configuraciones aplicadas.

```javascript
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
```

2. **getElement**

La función getElement es una función exportada que se utiliza para seleccionar y retornar uno o varios elementos del DOM según un selector especificado. Toma un objeto como argumento con las siguientes propiedades:

- selector: El selector CSS utilizado para seleccionar los elementos del DOM.
- all (opcional): Un valor booleano que indica si se deben seleccionar todos los elementos coincidentes con el selector o solo el primer elemento. El valor predeterminado es false.

La función verifica el valor de all. Si es false, se utiliza document.querySelector(selector) para seleccionar y retornar el primer elemento que coincide con el selector.

Si all es true, se utiliza document.querySelectorAll(selector) para seleccionar y retornar todos los elementos que coinciden con el selector. Los elementos se devuelven en forma de una lista NodeList.

Finalmente, se retorna el elemento o la lista de elementos seleccionados.

```javascript
export function getElement({ selector, all = false }) {
  let element; // Variable para almacenar el elemento o la lista de elementos seleccionados

  if (!all) return (element = document.querySelector(selector)); // Si all es false, seleccionar y retornar el primer elemento que coincide con el selector

  return (element = document.querySelectorAll(selector)); // Si all es true, seleccionar y retornar todos los elementos que coinciden con el selector
}
```

3. **delay**
   La función _**delay**_ es una función exportada que se utiliza para crear una promesa que se resuelve después de un cierto período de tiempo especificado en milisegundos. Toma un parámetro _**milliseconds**_ que representa la cantidad de tiempo de retraso deseado.

Dentro de la función, se crea una nueva instancia de la clase _**Promise**_ que recibe una función callback con un parámetro _**resolve**_. Dentro de esta función callback, se utiliza la función _**setTimeout**_ para programar la resolución de la promesa después de que transcurra el tiempo especificado en _**milliseconds**_. Una vez que el tiempo de retraso haya pasado, se llama a la función _**resolve**_ para cumplir la promesa.

Finalmente, la función delay devuelve la promesa creada.

```javascript
export function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
```

### Carpeta components

Todas las funciones principales que hacen posible el renderizado dinámico de los productos, el filtrado de los mismos,
las validaciones de formularios, la funcionalidad del menú amburguesa, la inserción del modal de pago, entre otras, están en la carpeta "components". Cada uno de estos componentes es un archivo JavaScript, que nos permite tener el archivo principal (index.js) totalmente agnóstico a la funcionalidad del sitio, dejando un proyecto mucho más organizado y entendible, ya que cada archivo se encarga de una tarea específica y no está todo en un solo archivo JavaScript.

A continuación se detallará el contenido de cada archivo JavaScript:

#### Card.js

1. **Card**

La función _**Card**_ es una función exportada que se utiliza para crear un elemento de tarjeta HTML basado en los datos proporcionados. Toma un objeto como parámetro desestructurado con las siguientes propiedades: _**'imgUrl', 'name', 'price', 'id', 'detailUrl'**_. La función crea y devuelve el elemento de tarjeta.

Dentro del código:

```javascript
import { createElement } from "../utilities/utilities.js";

export default function Card({ imgUrl, name, price, id, detailUrl }) {
  const $card = createElement({
    elementType: "article",
    className: "card",
  });
```

- Se importa la función createElement desde el archivo "../utilities/utilities.js".
- Se define la función Card con el objeto desestructurado como parámetro.
- Se crea una constante $card que llama a la función createElement para crear un elemento de tipo "article" con la clase "card".

```javascript
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
    <span data-id=${id} >Detalles</span>
    <svg data-id=${id} xmlns="http://www.w3.org/2000/svg"><path data-id=${id}  d="m13.061 4.939-2.122 2.122L15.879 12l-4.94 4.939 2.122 2.122L20.121 12z"></path><path data-id=${id}  d="M6.061 19.061 13.121 12l-7.06-7.061-2.122 2.122L8.879 12l-4.94 4.939z"></path></svg>
  </a>`;
```

- Se establece el contenido HTML del elemento $card utilizando la propiedad innerHTML.

El contenido HTML consiste en una estructura de tarjeta con los valores de las propiedades _**imgUrl, name, price, id y detailUrl**_ incrustados dentro del código HTML utilizando las plantillas literales de JavaScript.

```javascript
return $card;
}
```

Se devuelve el elemento _**$card**_ como resultado de la función.

#### ListOfCards.js

1. **ListOfCards**

El archivo contiene dos partes principales. La primera parte exporta una función llamada _**ListOfCards**_, que se utiliza para generar y mostrar una lista de tarjetas de productos. La segunda parte escucha el evento de clic en el documento y guarda información sobre el producto seleccionado en el almacenamiento local.

Dentro del código:

```javascript
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
```

- Se importa el módulo _**PRODUCTS**_ desde el archivo "../services/db.js".
- Se importa la función _**Card**_ desde el archivo "./Card.js".
- Se define la función _**ListOfCards**_ con un objeto desestructurado como parámetro. Este objeto espera las siguientes propiedades: _**element, products, detailUrl y limitOfCards**_, que tiene un valor predeterminado de _**null**_.
- Se selecciona el elemento HTML correspondiente a través del selector element.
- Se vacía el contenido HTML del elemento seleccionado utilizando la propiedad _**innerHTML**_.
  Se crea un fragmento de documento para mejorar el rendimiento al agregar las tarjetas de productos.
  Se define la variable _**limitOfProducts**_, que contiene los productos a mostrar según el límite especificado en limitOfCards o todos los productos si no se especifica límite.

```javascript
  limitOfProducts.forEach(({ imgUrl, id, productName: name, pricing }) => {
    fragment.appendChild(
      Card({ imgUrl, id, name, price: pricing.S, detailUrl })
    );
  });

  $cards.appendChild(fragment);
  return $cards;
}
```

- Se itera sobre los productos en _**limitOfProducts**_ y se agrega cada tarjeta de producto al fragmento de documento utilizando la función _**Card**_, pasando las propiedades correspondientes.
- Se agrega el fragmento de documento completo al elemento $cards.
- Se devuelve el elemento $cards como resultado de la función.

```javascript
document.addEventListener("click", (e) => {
  if (e.target.matches(".card a") || e.target.matches(".card a *")) {
    const ID = +e.target.getAttribute("data-id");
    const product = JSON.stringify(PRODUCTS.filter((p) => p.id === ID));

    localStorage.setItem("product", product);
  }
});
```

- Se agrega un evento de escucha de clic al documento.
- Si el elemento de destino del evento coincide con un elemento a dentro de una tarjeta (class="card"), se ejecuta el siguiente código.
- Se obtiene el valor del atributo _**data-id**_ del elemento a y se convierte a un número.
- Se filtran los productos en el módulo _**PRODUCTS**_ para encontrar el producto con el mismo _**ID**_.
  Se convierte el producto encontrado en una cadena JSON utilizando _**JSON.stringify()**_.
  Se guarda la cadena _**JSON**_ en el almacenamiento local bajo la clave "product".

#### Categories.js

1. **Categories**

El archivo exporta una función llamada _**Categories**_, que se utiliza para generar y mostrar botones de categorías basados en los productos proporcionados. También hay un evento de escucha de clic que maneja el cambio de estado activo de los botones de categoría.

Dentro del código:

```javascript
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
```

- Se importan las funciones _**createElement**_ y _**getElement**_ desde el archivo "../utilities/utilities.js".
- Se define la función _**Categories**_ con un objeto desestructurado como parámetro. Se espera que el objeto contenga la propiedad _**PRODUCTS**_, que es un array de productos.
  Se selecciona el elemento _**HTML**_ correspondiente a través de la función _**getElement**_, utilizando el selector ".products-categories".
  Se crea un fragmento de documento para mejorar el rendimiento al agregar los botones de categoría.
  Se define la variable categories utilizando el método _**reduce**_ en el array de productos (PRODUCTS). Esto crea un nuevo array que contiene las categorías únicas de los productos.

```javascript
  categories.forEach((category) => {
    const $button = createElement({ elementType: "button" });
    $button.value = category;
    $button.innerText = category;
    fragment.append($button);
  });

  $categoryBtns.appendChild(fragment);

  return $categoryBtns;
}
```

- Se itera sobre las categorías en categories y se crea un elemento de botón para cada categoría utilizando la función createElement.
- Se establece el valor del botón con el nombre de la categoría y se establece el texto interno del botón con el nombre de la categoría.
- Se agrega cada botón al fragmento de documento.
- Se agrega el fragmento de documento completo al elemento $categoryBtns.
- Se devuelve el elemento $categoryBtns como resultado de la función.

```javascript
document.addEventListener("click", (e) => {
  if (e.target.matches(".products-categories button")) {
    const buttons = document.querySelectorAll(".products-categories button");

    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    e.target.classList.add("active");
  }
});
```

- Se agrega un evento de escucha de clic al documento.
  Si el elemento de destino del evento coincide con un botón dentro de .products-categories, se ejecuta el siguiente código.
- Se seleccionan todos los botones dentro de .products-categories.
- Se itera sobre los botones y se les elimina la clase "active".
- Se agrega la clase "active" al botón de destino del evento (e.target).

#### Detail.js

1. **Detail**

El código importa un arreglo de productos y una función de utilidad. La función _**Detail**_ se encarga de generar el contenido de detalle de un producto en una página web. Primero, obtiene el elemento del DOM objetivo y el producto almacenado en el localStorage. Luego, agrega las propiedades del producto al elemento y lo retorna.

Después del código de la función, se añade un evento de clic al documento. Si se hace clic en el botón "back", se retrocede en la historia del navegador. Si se hace clic en el botón "add-to-cart-btn", se obtiene el ID del producto y se busca en el arreglo de productos. Luego, se obtiene el tamaño seleccionado y se busca si el producto ya está en el carrito. Si está en el carrito, se actualiza la cantidad y se agrega el tamaño. Si no está en el carrito, se añade al carrito con cantidad 1 y el tamaño seleccionado. Finalmente, se guarda el carrito actualizado en el localStorage.

```javascript
import PRODUCTS from "../services/db.js";
import { getElement } from "../utilities/utilities.js";

export default function Detail({ target }) {
  const $detail = getElement({ selector: target });
  const product = JSON.parse(localStorage.getItem("product"));

  const [{ id, imgUrl, productName, pricing, productDescription }] = product;

  $detail.classList.add("detail-card");

  $detail.innerHTML = `
  <button class="back">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"/></svg>
  </button>
  <div class="detail-header">
    <div class="detail-card-img">
      <img src=${imgUrl} alt=${productName}>
    </div>
  </div>
  <div class="detail-body">
    <div class="detail-card-content-container">
      <div class="detail-card-content">
      <h2>${productName}</h2>
      <span id="price" >$${pricing.S}</span>
      <p>${productDescription}</p>
    </div>
    <div class="detail-card-actions">
      <button id=${id} style="--color: var(--first-color)"  class="call-to-action add-to-cart-btn" >
        Agregar al carrito talla: S
      </button>
      <div style="--color: var(--second-color);"  class="call-to-action">
        <label for="sizes">
          Talla:
        </label>
        <select id="sizes">
        </select>
      </div>
    </div>
  </div>
  `;
  return $detail;
}

const cartElements = JSON.parse(localStorage.getItem("cartElements")) || [];

document.addEventListener("click", (e) => {
  if (e.target.matches(".back") || e.target.matches(".back *")) {
    history.back(1);
  }
  if (e.target.matches(".add-to-cart-btn")) {
    const productID = +e.target.id;
    const selectedProduct = PRODUCTS.find((p) => p.id === productID);
    const size = getElement({ selector: "#sizes" }).value;

    const existingProductIndex = cartElements.findIndex(
      (p) => p.id === productID
    );

    if (selectedProduct && existingProductIndex !== -1) {
      const existingProduct = cartElements[existingProductIndex];
      existingProduct.quantity++;
      existingProduct.cartProductsSizes.push(size);
    } else {
      selectedProduct.quantity = 1;
      selectedProduct.cartProductsSizes = [size];
      cartElements.push(selectedProduct);
    }

    localStorage.setItem("cartElements", JSON.stringify(cartElements));
  }
});
```

### Filters.js

1. **Filters**

La función _**Filters**_ es una función exportada que recibe tres parámetros: _**PRODUCTS**_ (un arreglo de productos), _**byCategory**_ (una categoría por la cual filtrar los productos) y _**bySearch**_ (una cadena de búsqueda para filtrar los productos).

El objetivo de la función es filtrar los productos en base a los criterios de categoría y búsqueda. Aquí está la explicación línea por línea del código:

```javascript
export function Filters({ PRODUCTS, byCategory, bySearch }) {
let filteredProducts;
```

- La función _**Filters**_ es exportada. Recibe un objeto como parámetro con las propiedades PRODUCTS, _**byCategory**_ y _**bySearch**_. Estas propiedades representan el arreglo de productos, la categoría de filtro y la cadena de búsqueda respectivamente.
- Se declara la variable _**filteredProducts**_ para almacenar los productos filtrados.

```javascript
const hasIncluded =
  bySearch &&
  PRODUCTS.some((product) => {
    return (
      product.productKeywords +
      product.productName +
      product.productDescription
    )
      .toLowerCase()
      .includes(bySearch.toLowerCase());
  });
```

- Se declara la variable _**hasIncluded**_ para determinar si algún producto cumple con los criterios de búsqueda.
- Se utiliza el método _**some**_ en el arreglo _**PRODUCTS**_ para verificar si algún producto cumple con la condición de búsqueda. La condición verifica si alguna combinación de las palabras clave del producto, su nombre o descripción contiene la cadena de búsqueda. Las comparaciones se realizan en minúsculas para evitar problemas de mayúsculas/minúsculas.

```javascript
if (!byCategory) {
  if (bySearch) {
    return hasIncluded
      ? (filteredProducts = PRODUCTS.filter((product) =>
          (
            product.productKeywords +
            product.productName +
            product.productDescription
          )
            .toLowerCase()
            .includes(bySearch.toLowerCase())
        ))
      : (filteredProducts = PRODUCTS);
  } else {
    return (filteredProducts = PRODUCTS);
  }
}
```

- Si no se proporciona una categoría (_**'byCategory'**_ es falsy), se realiza una comprobación adicional para la cadena de búsqueda.
- Si _**'bySearch'**_ tiene un valor (es truthy), se verifica si hasIncluded es verdadero. Si es verdadero, se filtran los productos que cumplen con los criterios de búsqueda y se asignan a filteredProducts. Si _**'hasIncluded'**_ es falso, se asigna el arreglo completo de productos a _**'filteredProducts'**_.
- Si no se proporciona una cadena de búsqueda (_**bySearch**_ es falsy), se asigna el arreglo completo de productos a _**'filteredProducts'**_.

```javascript
return byCategory === "all"
  ? (filteredProducts = PRODUCTS)
  : (filteredProducts = PRODUCTS.filter(
      (product) => product.category === byCategory
    ));
```

- Si _**'byCategory'**_ es igual a "all", se asigna el arreglo completo de productos a filteredProducts.
  De lo contrario, se filtran los productos que tienen una categoría igual a _**'byCategory'**_ y se asignan a _**'filteredProducts'**_ .

Al final de la función, se retorna el arreglo _**'filteredProducts'**_ que contiene los productos filtrados según los criterios de categoría y búsqueda.

### Menu.js

La función _**Menu**_ controla el comportamiento de un menú desplegable. Aquí está la explicación línea por línea del código:

```javascript
import { getElement } from "../utilities/utilities.js";
```

- Importa la función _**getElement**_ desde el archivo "../utilities/utilities.js".

```javascript
export default function Menu(e)
```

- Es exportada como una función llamada _**Menu**_. Recibe un parámetro e que representa el evento de clic.

```javascript
const $navbar = getElement({ selector: ".navbar" });
const $open = getElement({ selector: ".open" });
const $close = getElement({ selector: ".close" });
```

- Se obtienen los elementos del _**DOM**_ utilizando la función _**getElement**_. _**$navbar**_ representa el elemento con la clase "navbar", _**'$open'**_ representa el elemento con la clase "open" y _**'$close'**_ representa el elemento con la clase "close".

```javascript
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
```

- Se comprueba si se hizo clic fuera del menú desplegable. Si el objetivo del evento de clic no coincide con el selector ".hamburger-btn", cualquier elemento dentro de él o el elemento con la clase "navbar", se ejecuta el código dentro del bloque.
  Dentro del bloque, se oculta el menú desplegable removiendo la clase "is-active" del elemento $navbar, se muestra el botón de abrir agregando la clase "none" al elemento *__'$close'**_ y removiendo la clase "none" del elemento _**'$open'\_\_\*.

```javascript
if (
  e.target.matches(".hamburger-btn") ||
  e.target.matches(".hamburger-btn *")
) {
  $open.classList.toggle("none");
  $close.classList.toggle("none");
  $navbar.classList.toggle("is-active");
}
```

- Se comprueba si se hizo clic en el botón de menú. Si el objetivo del evento de clic coincide con el selector ".hamburger-btn" o cualquier elemento dentro de él, se ejecuta el código dentro del bloque.
  Dentro del bloque, se alterna la visibilidad del botón de abrir y cerrar utilizando el método toggle en los elementos $open y $close. También se activa o desactiva el menú desplegable agregando o removiendo la clase "is-active" al elemento $navbar.

Al final de la función, no hay una declaración de retorno explícita.

### Cart.js

En este archivo están todas la funciones referentes a la funcionalidad del carrito.

Las funciones son las siguientes

1. **getTotalAmount**

```javascript
import { createElement, delay, getElement } from "../utilities/utilities.js";

let isBought = false;
```

- Importa las funciones createElement, delay y getElement desde el archivo "../utilities/utilities.js".
- Declara una variable booleana isBought y la inicializa como false.

```javascript
function getTotalAmount() {
  const cartElements = JSON.parse(localStorage.getItem("cartElements"));

  let totalAmount = 0;

  const listOfSizes = cartElements
    .map((element) => element.cartProductsSizes)
    .flat();
  const pricing = cartElements[0].pricing;

  listOfSizes.forEach((size) => {
    totalAmount += pricing[size];
  });

  return totalAmount;
}
```

- Define la función getTotalAmount, que calcula el monto total de los elementos del carrito.
- Obtiene los elementos del carrito del almacenamiento local.
- Inicializa totalAmount como 0.
- Crea una lista de tallas (listOfSizes) extrayendo las tallas de cada elemento del carrito y aplanando la lista.
- Obtiene el objeto pricing del primer elemento del carrito.
- Itera sobre cada talla en listOfSizes y suma el precio correspondiente de pricing a totalAmount.
- Retorna totalAmount.

2. **createCartElement**

```javascript
function createCartElement({ product }) {
  const {
    id,
    generalCategory,
    imgUrl,
    pricing,
    productName,
    quantity,
    cartProductsSizes,
  } = product;

  const total = cartProductsSizes.reduce(
    (sum, size) => (sum += pricing[size]),
    0
  );

  const $cartItem = createElement({
    elementType: "article",
    className: "cartItem",
  });

  const uniqueSizes = cartProductsSizes.join(", ");

  $cartItem.innerHTML = `
    <img class="cartItem-img" src=${imgUrl} alt=${productName}>
    <div class="cartItem-text">
      <div>
        <small>Categoria</small>
        <span>${generalCategory}</span>
      </div>
      <div>
        <small>Tallas:</small>
        <span>${uniqueSizes}</span>
      </div>
      <div>
        <small>Cantidad:</small>
        <span>${quantity}</span>
      </div>
      <div>
        <small>Subtotal:</small>
        <span>$${total}</span>
      </div>
      <div>
        <button  class="del-item" id=${id}>
          <svg style="fill: #ffffff;" id=${id} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path id=${id} d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  return $cartItem;
}
```

- Define la función createCartElement, que crea un elemento de carrito a partir de un objeto product.
- Desestructura las propiedades relevantes del objeto product.
- Calcula el total sumando los precios de las tallas en cartProductsSizes.
- Utiliza la función createElement para crear un elemento article con la clase "cartItem".
- Configura el contenido HTML del elemento article utilizando las propiedades del producto.
- Retorna el elemento article creado.

3. **createCartActionElements**

```javascript
function createCartActionElements() {
  const $actions = createElement({
    elementType: "div",
    className: "cart-actions",
  });

  const total = getTotalAmount();

  $actions.innerHTML = `
    <button class="clear-cart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: #ffffff;">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
      </svg>
      <span>Limpiar Carrito</span>
    </button>
    <div>
        <strong>Total</strong>
        <span>$${total}</span>
    </div>
    <button class="buy-products">Comprar</button>
  `;

  return $actions;
}
```

- Define la función createCartActionElements, que crea los elementos de acción del carrito (botones y total).
- Utiliza la función createElement para crear un elemento div con la clase "cart-actions".
- Obtiene el total utilizando la función getTotalAmount.
- Configura el contenido HTML del elemento div utilizando el total.
- Retorna el elemento div creado.

4. **emptyCart**

```javascript
function emptyCart({ element }) {
  return (element.outerHTML = `
    <div class="empty-cart">
      <h2>
        Tu carrito está vacío :(. Pero no te preocupes, tenemos muchos productos que esperan por ti
      </h2>
      <a href="../pages/products.html" class="call-to-action" style="--color: var(--second-color)">
        Productos
      </a>
    </div>
    
    `);
}
```

- Define la función emptyCart, que crea el contenido para mostrar cuando el carrito está vacío.
- Configura el contenido HTML utilizando un mensaje y un enlace.
  Retorna el contenido HTML generado.

5. **Cart**

```javascript
export default function Cart() {
  const $cart = getElement({ selector: ".cart" });
  const products = JSON.parse(localStorage.getItem("cartElements"));
  const fragment = document.createDocumentFragment();

  if (products.length <= 0 && !isBought) {
    emptyCart({ element: $cart });
  } else {
    products.forEach((product) => {
      fragment.appendChild(createCartElement({ product }));
    });

    $cart.append(fragment);
    $cart.insertAdjacentElement("afterend", createCartActionElements());
  }
}
```

- Define la función Cart, que se encarga de mostrar los elementos del carrito y los elementos de acción del carrito.
- Obtiene el elemento del carrito del DOM utilizando la función getElement.
  Obtiene los productos del carrito del almacenamiento local.
- Crea un fragmento de documento para almacenar los elementos del carrito.
- Si no hay productos en el carrito y no se ha realizado una compra, muestra el carrito vacío utilizando la función emptyCart.
- De lo contrario, itera sobre cada producto y crea un elemento de carrito utilizando la función createCartElement, agregándolo al fragmento.
- Agrega el fragmento al elemento del carrito en el DOM utilizando append.
- Crea y agrega los elementos de acción del carrito al DOM utilizando insertAdjacentElement.

6. **clearCart**

```javascript
export function clearCart() {
  localStorage.setItem("cartElements", JSON.stringify([]));
  location.reload();
}
```

- Exporta la función clearCart, que se encarga de vaciar el carrito.
- Actualiza el almacenamiento local con un arreglo vacío y recarga la página.

7. **deleteCartItem**

```javascript
function deleteCartItem({ id }) {
  let cartItems = JSON.parse(localStorage.getItem("cartElements"));

  const filteredItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cartElements", JSON.stringify(filteredItems));
  location.reload();
}
```

- Define la función deleteCartItem, que elimina un elemento del carrito.
- Obtiene los elementos del carrito del almacenamiento local.
- Filtra los elementos para excluir el elemento con el id proporcionado.
- Actualiza el almacenamiento local con los elementos filtrados y recarga la página.

8. **Eventos**

```javascript
document.addEventListener("click", (e) => {
  if (e.target.matches(".clear-cart") || e.target.matches(".clear-cart *")) {
    clearCart();
  }

  if (e.target.matches(".del-item") || e.target.matches(".del-item *")) {
    const id = +e.target.id;
    deleteCartItem({ id });
  }
});
```

- Agrega un evento de clic al documento.
- Si el objetivo del evento de clic coincide con el selector ".clear-cart" o cualquier elemento dentro de él, llama a la función clearCart.
- Si el objetivo del evento de clic coincide con el selector ".del-item" o cualquier elemento dentro de él, obtiene el id y llama a la función deleteCartItem.

### PaymentModal.js

Es módulo de JavaScript que maneja un formulario de pago y muestra un modal de éxito después de un pago exitoso. Aquí está la funcionalidad general del código:

- Importa las funciones createElement, delay, getElement y clearCart desde archivos específicos.
- Define la función successfulPayment que se ejecuta cuando se realiza un pago exitoso. Dentro de esta función:
- Obtiene el elemento principal del DOM.
- Crea un elemento de fondo y un elemento de modal de éxito utilizando las funciones createElement.
- Vacía el contenido del elemento principal del DOM.
- Configura el contenido HTML del elemento de modal de éxito con un mensaje de éxito.
- Inserta el elemento de modal de éxito y el fondo en el elemento principal del DOM.
- Cierra el modal de pago llamando a la función closeModal y pasando el selector del modal de pago.
- Espera 5 segundos utilizando la función delay.
- Llama a la función clearCart para vaciar el carrito.
- Envía el formulario llamando al método submit del objetivo.
- Exporta la función submitCartForm que se ejecuta al enviar el formulario del carrito. Dentro de esta función:
- Convierte los datos del formulario en un objeto utilizando Object.fromEntries(new FormData(target)).
- Llama a la función successfulPayment pasando el objetivo del formulario.
- Exporta la función PaymentModal que crea el formulario modal de pago. Dentro de esta función:
- Utiliza la función createElement para crear un elemento form con la clase "form" y el id "payment-modal".
- Configura el contenido HTML del formulario modal de pago con los campos requeridos para realizar el pago.
- Retorna el elemento form creado.
- Exporta la función CreatePaymentModal que inserta el formulario modal de pago después del elemento especificado. Dentro de esta función:
- Obtiene el elemento principal del DOM utilizando la función getElement.
- Inserta el formulario modal de pago después del elemento principal utilizando insertAdjacentElement.
- Exporta la función closeModal que cierra el modal especificado. Dentro de esta función:
- Obtiene el modal de pago del DOM utilizando la función getElement.
- Elimina el modal de pago utilizando el método remove()

```javascript
import { createElement, delay, getElement } from "../utilities/utilities.js";
import { clearCart } from "./Cart.js";

const successfulPayment = async ({ target }) => {
  const $main = getElement({ selector: ".main" });
  const bg = createElement({
    elementType: "div",
    className: "success-modal-bg",
  });
  const $successModal = createElement({
    elementType: "section",
    className: "success-modal",
    attributes: {
      id: "successModal",
    },
  });

  $main.innerHTML = "";

  $successModal.innerHTML = `
    <h1>¡Felicidades!</h1>
    <span>Tu pago ha sido realizado con éxito.</span>
    <p>Tu pedido estará llegando a tu hogar dentro de los próximos 3 días.</p>
  `;

  $main.insertAdjacentElement("beforeend", $successModal);
  $main.insertAdjacentElement("beforeend", bg);

  closeModal("#payment-modal");
  console.log("Success");
  await delay(5000);
  clearCart();
  target.submit();
};

export const submitCartForm = ({ target }) => {
  const data = Object.fromEntries(new FormData(target));
  console.log("data");
  successfulPayment({ target });
};

export function PaymentModal() {
  const $paymentModal = createElement({
    elementType: "form",
    className: "form",
    attributes: {
      id: "payment-modal",
    },
  });

  $paymentModal.innerHTML = `
      <h2>Formulario de Compra</h2>
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ángel"  pattern="[A-Za-z]+" required>
      </div>

      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" placeholder="Durán"  pattern="[A-Za-z]+" required>
      </div>

      <div>
        <label for="direccion">Código Postal:</label>
        <input type="text" id="direccion" name="direccion" placeholder="13578" required>
      </div>

      <div>
        <label for="tarjeta">Tarjeta de Crédito:</label>
        <input type="text" id="tarjeta" name="tarjeta"  placeholder="4000 0000 0000 0002" pattern="[0-9]{16}" required>
      </div>

      <div>
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" placeholder="Dejanos un mensaje con información adicional"></textarea>
      </div>
        <button id="buy" class="call-to-action" style="--color: var(--first-color)" type="submit">Comprar</button>
        <button class="call-to-action close-dialog" style="--color: var(--second-color)" type="button">Cancelar</button>
  `;

  return $paymentModal;
}

export function CreatePaymentModal({ insertAfter }) {
  const $main = getElement({ selector: insertAfter });

  $main.insertAdjacentElement("afterend", PaymentModal());
}

export const closeModal = (element) => {
  const paymentModal = getElement({ selector: element });

  paymentModal.remove();
};
```
