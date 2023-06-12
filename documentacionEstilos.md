# Manual de desarrollador (Documentación de estilos CSS)

## CONFIGURACIÓN DE ENTORNO

Primero, es necesario decir que para este proyecto no se utilizó ningún framework o librería para facilitar el desarrollo. Pero sí se inicializó un repositorio en github con git, debido a la facilidad de cambios en el proyecto hosteado con netlify, ya que este servicio nos permite conectar el dominio de nuestra página con el repositorio y cada que se realicen cambios en el repositorio, estos también se efectuarán en la página hosteada.

## DISEÑO DE LA ARQUITECTURA

1. **Estructura de carpetas**
   Las carpetas están estructuradas de modo que el proyecto esté bien organizado y se facilite el hallazgo del componente que realiza la acción que deseamos modificar, o el estilo que deseamos cambiar.

La estructuración es la siguiente:

- **Carpeta Web:** Es la carpeta principal del proyecto, esta contiene a su vez las subcarpetas assets, components, pages, services, utilities y los archivos index.html, index.js los cuales son nuestros puntos de entrada en la página web y de los que dependen las subpáginas, además, también se encuentra el archivo style.css que se encarga de dar estilos a nuestro index.html.
- **Carpeta assets:** Esta carpeta contiene todos los recursos multimedia de nuestro proyecto, recursos como imágenes de los productos, secciones, videos, etc.
- **Carpeta components:** Esta carpeta tiene todos los archivos js que se encargan de agregar una funcional específica, o renderizar dinámicamente alguna sección o componente de nuestro sitio web, más adelante se darán detalles más específicos sobre cada archivo y su contenido.
- Carpeta pages: En esta carpeta se encuentran todas las subpáginas tales como about, contact, productos, thanks, detail, cart y sus archivos de estilos correspondientes.
- **Carpeta services:** En esta carpeta se encuentran los productos dummy que se renderizan en el apartado de productos y en la página principal, más adelante se darán detalles de como se realiza este proceso.
- **Carpeta utilities:** En esta carpeta están todas las utilidades CSS y JavaScript del proyecto, tales como componentes que nos ayudan a realizar una acción en específico y las clases utilitarias. 2. Base de datos utilizada
  Cuando nos referimos a base de datos, hacemos referencia al archivo utilizado como base de datos que almacena nombre, descripción, precios, tallas y demás detalles del producto. En este sentido, estuvimos muy limitados en cuanto a la utilización de bases de datos reales, ya que no se podían utilizar para este proyecto, entonces, con nuestro equipo de trabajo decidimos simularla de modo que el contenido de los productos quedara más organizado y el agregar más de estos fuera sencillo a través del renderizado dinámico (más adelante se detallará como se implementó esta funcionalidad).

Nuestra “base de datos” se encuentra en la carpeta services, en el archivo db.js y la estructura de los datos es la siguiente:

```json
[
  {
    "id": 1,
    "productName": " Barcelona tercera Temporada 2003/2004",
    "productDescription": "Camiseta deportiva cómoda y estilizada, diseñada con materiales de alta calidad. Ideal para cualquier actividad física, brinda libertad de movimiento y durabilidad. Un clásico atemporal para tu rutina deportiva.",
    "imgUrl": "../assets/barcelona/fc-barcelone-third-2003-2004.webp",
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "pricing": {
      "S": 12,
      "M": 12.5,
      "L": 14,
      "XL": 16,
      "XXL": 17
    },
    "category": "Barcelona",
    "productKeywords": "Product, barza, rojo, barcita, futbol, soccer, FCB, hombre, masculino",
    "generalCategory": "Futbol"
  }
]
```

## DESARROLLO DE LA INTERFAZ DE USUARIO

Para empezar con esta sección me gustaría decir que gracias a la estructura de archivos y carpetas utilizada el desarrollo de la interfaz fue más organizada. Ahora daré seguimiento paso a paso del proceso de desarrollo de la interfaz de usuario.

### style.css

Este es el archivo de estilos de la página principal, en el están establecidos los estilos de sus distintas secciones y algunos son tomados de el archivo utilities.

```css
/* Define el estilo de un botón primario */
.primary-btn {
  display: flex; /* Muestra el botón como un elemento flex */
  justify-content: space-between !important; /* Alinea el contenido del botón en ambos lados del espacio disponible */
  align-items: center; /* Centra verticalmente el contenido del botón */
}

/* SITE STYLES */

/* ***** HERO SECTION ***** */

/* Define el estilo de la sección principal del héroe */
.main-hero-section {
  background-image: linear-gradient(
    180deg,
    var(--first-color) 25%,
    transparent
  ); /* Establece una imagen de fondo que es un degradado lineal */
}

/* Define el estilo del contenedor de la sección principal del héroe */
.main-hero-section .container {
  min-height: 100vh; /* Establece la altura mínima del contenedor al 100% de la altura de la ventana */
  padding: 1.5rem; /* Establece el espaciado interno del contenedor */
  display: flex; /* Muestra el contenedor como un elemento flex */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  justify-content: center; /* Centra verticalmente el contenido del contenedor */
  align-items: center; /* Centra horizontalmente el contenido del contenedor */
  /* gap: 1.5rem; */
  margin-bottom: 4rem; /* Establece el margen inferior del contenedor */
}

/* Define el estilo de la imagen principal del héroe */
.main-hero-section .main-hero-img {
  width: 100%; /* Establece el ancho de la imagen principal al 100% */
  display: flex; /* Muestra la imagen principal como un elemento flex */
  justify-content: center; /* Centra horizontalmente la imagen principal */
  align-items: center; /* Centra verticalmente la imagen principal */
}

/* Define el estilo de la imagen dentro de la sección principal del héroe */
.main-hero-section .main-hero-img img {
  object-fit: cover; /* Establece cómo se ajusta la imagen dentro de su contenedor */
  object-position: center center; /* Establece la posición de la imagen dentro de su contenedor */
}

/* Define el estilo del contenido principal del héroe */
.main-hero-section .main-hero-content {
  display: flex; /* Muestra el contenido principal como un elemento flex */
  justify-content: center; /* Centra horizontalmente el contenido principal */
  align-items: center; /* Centra verticalmente el contenido principal */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  text-align: center; /* Centra el texto horizontalmente dentro del contenedor */
  gap: 1rem; /* Establece el espaciado entre elementos hijos */
}

/* Define el estilo de los párrafos dentro del contenido principal del héroe */
.main-hero-section .main-hero-content p {
  color: var(
    --first-alpha-color
  ); /* Establece el color del texto de los párrafos */
  line-height: 1.5; /* Establece la altura de línea de los párrafos */
  font-weight: bold; /* Establece el grosor de fuente de los párrafos */
  letter-spacing: 1px; /* Establece el espaciado entre letras de los párrafos */
}

/* Define el estilo de los elementos <span> dentro del contenido principal del héroe */
.main-hero-section .main-hero-content p span {
  font-size: 1.5rem; /* Establece el tamaño de fuente de los elementos <span> */
  font-weight: 900; /* Establece el grosor de fuente de los elementos <span> */
  color: var(
    --second-color
  ); /* Establece el color del texto de los elementos <span> */
}

/* Define el estilo del contenedor de los botones principales del héroe */
.main-hero-section .main-hero-content .main-hero-btn-container {
  display: flex; /* Muestra el contenedor de botones como un elemento flex */
  justify-content: space-between; /* Alinea el contenido del contenedor en ambos lados del espacio disponible */
  align-items: center; /* Centra verticalmente el contenido del contenedor */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  gap: 0.5rem; /* Establece el espaciado entre elementos hijos */
}

/* ***** PRODUCTS SECTION ***** */

/* Define el estilo de la sección de productos de la página principal */
.home-products-section {
  width: 100vw; /* Establece el ancho de la sección de productos al 100% del ancho de la ventana */
  height: max-content; /* Establece la altura de la sección de productos en función de su contenido */
  display: grid; /* Muestra la sección de productos como un grid container */
  place-content: center; /* Centra el contenido del grid container */
  gap: 1rem; /* Establece el espaciado entre las filas y columnas del grid container */
}

/* Define el estilo del contenido de la sección de productos de la página principal */
.home-products-content {
  display: flex; /* Muestra el contenido como un elemento flex */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  align-items: center; /* Centra horizontalmente el contenido del contenedor */
  justify-content: center; /* Centra verticalmente el contenido del contenedor */
  text-align: center; /* Centra el texto horizontalmente dentro del contenedor */
  gap: 1rem; /* Establece el espaciado entre elementos hijos */
  color: var(
    --gray-dark-color
  ); /* Establece el color del texto del contenido */
}

/* Define el estilo de los encabezados h2 dentro del contenido de productos y de reseñas */
.home-products-content h2,
.home-reviews-section div h2 {
  font-size: 2rem; /* Establece el tamaño de fuente de los encabezados h2 */
  color: var(
    --first-color
  ); /* Establece el color del texto de los encabezados h2 */
}

/* ***** REVIEWS SECTION ***** */

/* Define el estilo de la sección de reseñas de la página principal */
.home-reviews-section {
  display: flex; /* Muestra la sección de reseñas como un elemento flex */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  justify-content: center; /* Centra verticalmente el contenido del contenedor */
  align-items: center; /* Centra horizontalmente el contenido del contenedor */
}

/* Define el estilo de las reseñas dentro de la sección de reseñas */
.home-reviews-section .reviews {
  width: 100vw; /* Establece el ancho de las reseñas al 100% del ancho de la ventana */
  padding: 1rem; /* Establece el espaciado interno de las reseñas */
  display: grid; /* Muestra las reseñas como un grid container */
  grid-template-columns: repeat(
    auto-fit,
    minmax(270px, 1fr)
  ); /* Crea columnas en el grid container que se ajustan automáticamente al tamaño mínimo de 270px y máximo de 1fr */
  gap: 1rem; /* Establece el espaciado entre las filas y columnas del grid container */
}

/* Define el estilo de una reseña individual */
.home-reviews-section .review {
  background-color: var(
    --white-color
  ); /* Establece el color de fondo de la reseña */
  display: flex; /* Muestra la reseña como un elemento flex */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  justify-content: space-between; /* Distribuye el contenido de la reseña verticalmente con espacio disponible */
  align-items: center; /* Centra horizontalmente el contenido de la reseña */
  padding: 1rem; /* Establece el espaciado interno de la reseña */
  border-radius: 1rem; /* Establece el radio de borde de la reseña */
  box-shadow: var(
    --box-shadow
  ); /* Establece la sombra de la caja de la reseña */
}

/* Define el estilo de la imagen de una reseña */
.home-reviews-section .review .review-img img {
  border-radius: 50%; /* Establece el radio de borde de la imagen de la reseña como un círculo */
  width: 4rem; /* Establece el ancho de la imagen de la reseña */
}

/* Define el estilo del contenido de una reseña */
.home-reviews-section .review .review-content {
  display: flex; /* Muestra el contenido de la reseña como un elemento flex */
  flex-direction: column; /* Establece la dirección del flex container como columna */
  justify-content: center; /* Centra verticalmente el contenido de la reseña */
  align-items: center; /* Centra horizontalmente el contenido de la reseña */
  text-align: center; /* Centra el texto horizontalmente dentro del contenedor */
}

/* Define el estilo del encabezado h2 del contenido de una reseña */
.home-reviews-section .review .review-content h2 {
  color: var(
    --first-alpha-color
  ); /* Establece el color del texto del encabezado h2 */
}

/* Define el estilo del párrafo del contenido de una reseña */
.home-reviews-section .review .review-content p {
  color: var(--gray-dark-color); /* Establece el color del texto del párrafo */
  font-size: 0.75rem; /* Establece el tamaño de fuente del párrafo */
}

/* MEDIA QUERIES*/

@media (min-width: 375px) {
  .main-hero-section .main-hero-content .main-hero-btn-container {
    flex-direction: row; /* Cambia la dirección del contenedor de los botones principales a fila */
    gap: 2rem; /* Aumenta el espaciado entre los botones principales */
  }
}

@media (min-width: 768px) {
  .main-hero-section {
    margin-top: 0;
  }

  .main-hero-section .container {
    flex-direction: row-reverse; /* Invierte la dirección de los elementos dentro del contenedor */
    align-items: center; /* Centra verticalmente los elementos dentro del contenedor */
    margin-bottom: 0;
  }

  .main-hero-section .main-hero-content {
    justify-content: flex-start; /* Alinea el contenido en el extremo izquierdo del contenedor */
    align-items: flex-start; /* Alinea los elementos en el extremo izquierdo del contenedor */
    text-align: start; /* Establece el texto alineado a la izquierda */
    gap: 4rem; /* Establece el espacio entre los elementos del contenido principal */
  }

  .main-hero-section .main-hero-content h1 {
    font-size: 3rem; /* Establece el tamaño de fuente del encabezado h1 */
  }

  .main-hero-section .main-hero-content .main-hero-btn-container a {
    width: max-content; /* Establece el ancho del enlace al ancho máximo del contenido */
    font-size: 1rem; /* Establece el tamaño de fuente del enlace */
    text-align: center; /* Centra el texto del enlace horizontalmente */
  }
}

@media (min-width: 992px) {
  .main-hero-section .main-hero-img img {
    width: 130%; /* Amplía el ancho de la imagen al 130% */
  }
}
@media (min-width: 1600px) {
  .main-hero-section .container {
    height: 50vh; /* Establece la altura del contenedor al 50% de la altura de la ventana gráfica (viewport) */
  }
}
```

### Carpeta utilities:

En esta carpeta se encuentra uno de los archivos fundamentales para el tema de diseño de nuestra web, el cual es utilities.css.

#### utilitiesAndComponents.css

- **Custom properties:** En este archivo se encuentran todas las custom properties utilizadas en el proyecto que brindan una manera más organizada y escalable de dar valores a componentes, valores como colores, sombras, anchos máximos, etc.

```css
:root {
  --max-width: 1400px;
  --first-color: rgb(27, 44, 64);
  --first-alpha-color: rgba(27, 44, 64, 0.75);
  --second-color: rgb(244, 15, 15);
  --second-alpha-color: rgba(244, 15, 15, 0.75);
  --white-color: #fff;
  --gray-light-color: #f3f3f3;
  --gray-color: #dcdcf5;
  --gray-dark-color: #666;
  --black-color: #000;
  --white-alpha-color: rgba(255, 255, 255, 0.5);
  --black-alpha-color: rgba(0, 0, 0, 0.5);
  --mobile-link-color: var(--first-color);
  --link-color: #edeef0;
  --complementary-color: #eaefff;
  --box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  --font: "Poppins", sans-serif;
  --price-color: rgb(21, 102, 223);
}
```

- **Reset**: En este archivos se hace un pequeño reset de todos los valores que el navegador le da a las etiquetas HTML.

```css
/* Estilos generales para el documento HTML */

/* Configuración del modelo de caja */
html {
  box-sizing: border-box; /* Usar modelo de caja de borde */
  font-family: var(--font); /* Fuente de texto personalizada */
  scroll-behavior: auto; /* Comportamiento de desplazamiento automático */
  font-size: 16px; /* Tamaño de fuente base de 16px */
}

/* Estilos de reinicio */
*,
::after,
::before {
  margin: 0; /* Margen cero */
  padding: 0; /* Relleno cero */
  box-sizing: border-box; /* Usar modelo de caja de borde */
}

/* Estilos para el cuerpo del documento */
body {
  overflow-x: hidden; /* Ocultar desplazamiento horizontal */
  background-color: var(--gray-color); /* Color de fondo personalizado */
}

/* Estilos para la barra de desplazamiento en WebKit */
body::-webkit-scrollbar {
  display: none; /* Ocultar barra de desplazamiento */
}

/* Estilos para enlaces */
a {
  display: inline-block; /* Mostrar como bloque en línea */
  text-decoration: none; /* Sin decoración de texto */
  color: var(--mobile-link-color); /* Color de enlace personalizado */
  transition: all 0.5s ease-out; /* Transición suave */
}

/* Estilos para enlaces al pasar el cursor o enfocar */
a:hover,
a:focus {
  opacity: 0.7; /* Opacidad reducida */
}

/* Estilos para iconos SVG */
svg {
  fill: var(--second-color); /* Relleno de color personalizado */
  width: 1rem; /* Ancho de 1rem */
}

/* Estilos para listas no ordenadas y ordenadas */
ul,
ol {
  list-style-type: none; /* Tipo de estilo de lista: ninguno */
}

/* Estilos para títulos */
h2 {
  margin: 0; /* Margen cero */
  font-size: 1.5rem; /* Tamaño de fuente de 1.5rem */
}

h3 {
  margin: 0; /* Margen cero */
  font-size: 1.25rem; /* Tamaño de fuente de 1.25rem */
}

h4 {
  margin: 0; /* Margen cero */
  font-size: 1rem; /* Tamaño de fuente de 1rem */
}

h5 {
  margin: 0; /* Margen cero */
  font-size: 0.85rem; /* Tamaño de fuente de 0.85rem */
}

h6 {
  margin: 0; /* Margen cero */
  font-size: 0.75rem; /* Tamaño de fuente de 0.75rem */
}

/* Estilos para imágenes */
img {
  max-width: 100%; /* Ancho máximo del 100% */
}

/* Estilos para párrafos */
p {
  line-height: 1.5; /* Altura de línea de 1.5 */
}
```

- **Componentes:** Además, en este archivo se encuentran los estilos para todos los componentes principales de nuestra web, tales como el header, secciones y las tarjetas de productos y las clases utilitarias utilizadas en el proyecto, tales como la case “none”, que agrega un display none a un componente que la tenga, o la clase “container”, que define el ancho máximo al que llegará nuestro componente además de centrarlo.

1. **Hero Sections**
   En las secciones de 'contacto' y 'sobre nosotros' se ha hecho una pequeña hero secction y a estas se les ha aplicado el mismo diseño, por lo que vimos conveniente sacar los estilos de estas en un componente para no repetir el codigo.

```css
.hero-section {
  position: relative; /* Posición relativa */
  width: 100vw; /* Ancho de la ventana */
  height: calc(100vh - 4rem); /* Altura de la ventana menos 4 rem */
  display: flex; /* Mostrar como flexbox */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */

  background-image: url("../assets/about_images/hero-about-img.jpg"); /* Imagen de fondo */
  background-size: cover; /* Tamaño de la imagen de fondo: cubrir */
  background-position: center; /* Posición de la imagen de fondo: centrada */
  background-attachment: fixed; /* Adjuntar imagen de fondo: fija */
}

/* Estilos para el texto del héroe */
.hero-text {
  position: relative; /* Posición relativa */
  z-index: 99; /* Índice z para superposición */
  display: flex; /* Mostrar como flexbox */
  flex-direction: column; /* Dirección de la columna */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  gap: 0.5rem; /* Espacio entre elementos hijo */
  padding: 2rem; /* Relleno interno */
  text-align: center; /* Alinear el texto al centro */
  max-width: 800px; /* Ancho máximo */
}

/* Estilos para el elemento span dentro del texto del héroe */
.hero-text span {
  font-size: calc(2vw + 0.5rem); /* Tamaño de fuente calculado */
  color: var(--second-color); /* Color de texto personalizado */
  font-weight: bold; /* Peso de fuente en negrita */
}

/* Estilos para el elemento p dentro del texto del héroe */
.hero-text p {
  font-size: calc(0.3vw + 0.8rem); /* Tamaño de fuente calculado */
  color: var(--gray-color); /* Color de texto personalizado */
  font-weight: bold; /* Peso de fuente en negrita */
}

@media (min-width: 768px) {
  /* Estilos para pantallas con un ancho mínimo de 768px */

  /* Estilos para la sección de héroe */
  .hero-section {
    justify-content: flex-start; /* Justificar contenido al comienzo */
  }

  .hero-text {
    align-items: flex-start; /* Alinear elementos al comienzo verticalmente */
    text-align: start; /* Alinear texto al comienzo */
  }
  /* Fin de estilos para la sección de héroe */
}
```

2. **BOTONES**
   Estos estilos css agregan un diseño especial a cada botón de los que se hace uso en el sitio web, se hace uso de custom properites, y se utiliza la tecnica de "Asignación de variables CSS en línea".
   Además de agregar una animación de la cual se hace uso en las targetas de productos.

```css
/* ***** BUTTONS ***** */
/* Estilos para los botones primarios y llamadas a la acción */
.primary-btn,
.call-to-action {
  max-width: max-content; /* Ancho máximo basado en el contenido */
  height: max-content; /* Altura máxima basada en el contenido */
  color: white; /* Color de texto */
  background-color: var(--first-color); /* Color de fondo personalizado */
  border: none; /* Sin borde */
  padding: 1rem 2rem; /* Relleno interno */
  font-weight: bold; /* Peso de fuente en negrita */
  border-radius: 10px; /* Radio de borde */
  cursor: pointer; /* Cambiar el cursor a un puntero */
  text-align: center; /* Alinear el texto al centro */
  transition: all 0.2s ease-in-out; /* Transición animada para todas las propiedades */
}

/* Estilos específicos para las llamadas a la acción */
.call-to-action {
  background-color: var(--color); /* Color de fondo personalizado */
  box-shadow: var(--box-shadow); /* Sombra personalizada */
}

/* Estilos para los botones primarios y las llamadas a la acción al pasar el cursor */
.primary-btn:hover,
.call-to-action:hover {
  background-color: transparent; /* Fondo transparente */
  border: 1px solid var(--first-color); /* Borde de 1 píxel sólido */
  border-color: var(--color); /* Color del borde personalizado */
  color: var(--first-color); /* Color de texto personalizado */
  color: var(--color); /* Color de texto personalizado */
}

/* Estilos para el ícono SVG dentro de los botones primarios al pasar el cursor */
.primary-btn:hover svg {
  fill: var(
    --first-color
  ) !important; /* Color de relleno personalizado para el ícono SVG */
}

/* Estilos para los botones primarios al pasar el cursor */
.primary-btn:hover {
  animation: btn-width-animation 0.3s linear forwards; /* Animación de ancho del botón */
}

/* Animación de ancho del botón */
@keyframes btn-width-animation {
  0% {
    min-width: max-content; /* Ancho mínimo basado en el contenido */
  }
  40% {
    min-width: 70%; /* Ancho mínimo del 70% */
  }
  50% {
    min-width: 75%; /* Ancho mínimo del 75% */
  }
  60% {
    min-width: 80%; /* Ancho mínimo del 80% */
  }
  70% {
    min-width: 85%; /* Ancho mínimo del 85% */
  }
  80% {
    min-width: 90%; /* Ancho mínimo del 90% */
  }
  90% {
    min-width: 95%; /* Ancho mínimo del 95% */
  }
  100% {
    min-width: 100%; /* Ancho mínimo del 100% */
  }
}
```

3. **HEADER**
   El componente header es uno de los más importantes, nos permite la navegación en todas las páginas de nuestro sitio además de que se mantiene en cada una, por esta razón se le considera un componente.

```css
/* Estilos para el encabezado */
.header {
  background-color: var(--first-color); /* Color de fondo personalizado */
  width: 100vw; /* Ancho igual al ancho de la ventana del navegador */
  height: 4rem; /* Altura fija de 4 rem */
  position: fixed; /* Posición fija */
  top: 0; /* Colocado en la parte superior */
  left: 0; /* Colocado en la parte izquierda */
  display: flex; /* Elemento contenedor flexible */
  align-items: center; /* Centrar verticalmente los elementos */
  justify-content: center; /* Centrar horizontalmente los elementos */
  z-index: 9999; /* Capa z para superponer sobre otros elementos */
}

/* Estilos para el contenedor dentro del encabezado */
.header .container {
  width: 100%; /* Ancho al 100% del contenedor padre */
  display: flex; /* Elemento contenedor flexible */
  justify-content: space-between; /* Distribución espaciada horizontalmente */
  align-items: center; /* Centrar verticalmente los elementos */
  margin: 0 1.5rem; /* Margen horizontal */
}

/* Estilos para el logo dentro del encabezado */
.header .logo {
  width: 4rem; /* Ancho de 4 rem */
  height: 4rem; /* Altura de 4 rem */
}

/* Estilos para el botón de carrito dentro del encabezado */
.header .cart-btn {
  width: 3rem; /* Ancho de 3 rem */
  height: 3rem; /* Altura de 3 rem */
  background-color: transparent; /* Color de fondo transparente */
  border: none; /* Sin borde */
  cursor: pointer; /* Cambiar el cursor a un puntero */
  display: flex; /* Elemento contenedor flexible */
  align-items: center; /* Centrar verticalmente los elementos */
  justify-content: center; /* Centrar horizontalmente los elementos */
}

/* Estilos para el botón de carrito al pasar el cursor o enfocarse */
.header .cart-btn:hover,
.header .cart-btn:focus {
  transform: scale(1.1); /* Escalar al 110% */
  opacity: 1; /* Opacidad completa */
}

/* Estilos para el ícono SVG dentro del botón de carrito del encabezado */
.header .cart-btn svg {
  width: 2rem; /* Ancho de 2 rem */
}

/* Estilos para la barra de navegación dentro del encabezado */
.header .navbar {
  position: absolute; /* Posición absoluta */
  top: 4rem; /* Espaciado desde la parte superior del encabezado */
  left: 0; /* Colocado en la parte izquierda */
  opacity: 0; /* Opacidad inicial de 0 */
  transform: translateY(200%); /* Desplazamiento vertical hacia abajo */
  width: 100%; /* Ancho al 100% del contenedor */
  height: max-content; /* Altura máxima basada en el contenido */
  transition: all 0.5s ease-in-out; /* Transición animada para todas las propiedades */
  box-shadow: var(--box-shadow); /* Sombra personalizada */
  background-color: var(--white-color); /* Color de fondo personalizado */
  pointer-events: none; /* Eventos de puntero desactivados */
}

/* Estilos para la barra de navegación activa */
.navbar.is-active {
  transform: translateY(0%); /* Desplazamiento vertical a 0% */
  opacity: 1; /* Opacidad completa */
  pointer-events: visible; /* Eventos de puntero habilitados */
}

/* Estilos para la lista no ordenada dentro de la barra de navegación */
.header .navbar ul {
  width: 100%; /* Ancho al 100% del contenedor */
  height: max-content; /* Altura máxima basada en el contenido */
  display: flex; /* Elemento contenedor flexible */
  flex-direction: column; /* Dirección de columna */
  align-items: center; /* Centrar verticalmente los elementos */
}

/* Estilos para cada elemento de la lista dentro de la barra de navegación */
.header .navbar ul li {
  width: 100%; /* Ancho al 100% del contenedor */
}

/* Estilos para los enlaces dentro de cada elemento de la lista de la barra de navegación */
.header .navbar ul li a {
  display: flex; /* Elemento contenedor flexible */
  justify-content: center; /* Centrar horizontalmente los elementos */
  align-items: center; /* Centrar verticalmente los elementos */
  width: 100%; /* Ancho al 100% del contenedor */
  padding: 1.5rem 1rem; /* Relleno interno */
  gap: 1rem; /* Espacio entre elementos */
  transition: background-color 0.3s ease-in-out; /* Transición animada para el color de fondo */
}

/* Estilos para los enlaces al pasar el cursor */
.header .navbar ul li a:hover {
  background-color: var(
    --complementary-color
  ); /* Color de fondo personalizado al pasar el cursor */
}

/* Estilos para el botón de hamburguesa dentro del encabezado */
.header .hamburger-btn {
  width: 3rem; /* Ancho de 3 rem */
  height: 3rem; /* Altura de 3 rem */
  background-color: var(--first-color); /* Color de fondo personalizado */
  border: none; /* Sin borde */
  cursor: pointer; /* Cambiar el cursor a un puntero */
  order: -1; /* Cambiar el orden de visualización */
}

/* Estilos para el ícono SVG dentro del botón de hamburguesa del encabezado */
.header .hamburger-btn svg {
  width: 3rem; /* Ancho de 3 rem */
  height: 3rem; /* Altura de 3 rem */
  background-color: var(--first-color); /* Color de fondo personalizado */
}

@media (min-width: 768px) {
  .header .navbar {
    bottom: 4rem; /* Espacio de 4rem desde la parte inferior */
    left: 0; /* Alinear a la izquierda */
    opacity: 0; /* Opacidad 0 (invisibilidad) */
    transform: translateX(
      -100%
    ); /* Traslación hacia la izquierda fuera de la pantalla */
    width: 35vw; /* Ancho del 35% del viewport */
    height: calc(100vh - 4rem); /* Altura calculada como 100vh menos 4rem */
    transition: all 0.5s ease-in-out; /* Transición de todas las propiedades con duración de 0.5s */
    display: flex; /* Mostrar como flex */
    flex-direction: column; /* Dirección de columna */
    justify-content: center; /* Centrar verticalmente */
    align-items: center; /* Centrar horizontalmente */
  }

  .navbar.is-active {
    transform: translateX(
      0%
    ); /* Traslación hacia la derecha para mostrar en la pantalla */
    opacity: 1; /* Opacidad 1 (visible) */
  }
}

@media (min-width: 1200px) {
  /* Estilos para pantallas con un ancho mínimo de 1200px */

  .header {
    position: sticky; /* Posición pegajosa */
    top: 0; /* Alinear en la parte superior */
    left: 0; /* Alinear a la izquierda */
  }

  .header .logo {
    transform: translateX(0); /* Traslación hacia la derecha de 0px */
  }

  .header .navbar {
    position: static; /* Posición estática */
    width: auto; /* Ancho automático */
    height: auto; /* Altura automática */
    transform: translate(0, 0); /* Traslación nula */
    opacity: 1; /* Opacidad 1 (visible) */
    box-shadow: none; /* Sin sombra */
    background-color: transparent; /* Fondo transparente */
    pointer-events: visible; /* Eventos de puntero visibles */
  }

  .header .navbar ul {
    flex-direction: row; /* Dirección de fila */
    justify-content: space-evenly; /* Distribución uniforme del espacio */
  }

  .header .navbar ul a {
    text-align: center; /* Alinear texto al centro */
    height: 100%; /* Altura del 100% */
    color: white; /* Color de texto personalizado */
  }
  .header .navbar ul li {
    max-width: max-content; /* Ancho máximo de contenido */
    text-align: center; /* Alinear texto al centro */
    height: 100%; /* Altura del 100% */
    color: white; /* Color de texto personalizado */
  }

  .header .navbar ul li a:hover {
    background-color: transparent; /* Fondo transparente al pasar el ratón */
  }

  .hamburger-btn {
    display: none; /* Ocultar el botón de hamburguesa */
  }
}
```

4. **CARDS**
   Los estilos que se muestran a continuación dan un diseño fluido a las secciones de targetas presentes en los apartados "Home" y "Products" y justo porque se utiliza en dos sitios se les consideró un componente.

```css
/* Estilos para la sección de tarjetas de productos */
.products-cards {
  width: 100vw; /* Ancho igual al ancho de la ventana del navegador */
  display: grid; /* Elemento contenedor de cuadrícula */
  grid-template-columns: repeat(
    auto-fit,
    minmax(160px, 1fr)
  ); /* Columnas de tamaño automático */
  place-content: center; /* Centrar los elementos en la cuadrícula */
  gap: 1rem 0.5rem; /* Espacio entre elementos verticalmente y horizontalmente */
  padding: 1rem; /* Relleno interno de la sección */
}

/* Estilos para las tarjetas de producto */
.products-cards .card {
  margin: 0 auto; /* Centrar horizontalmente la tarjeta */
  max-width: 250px; /* Ancho máximo de la tarjeta */
  padding: 0.5rem 1rem; /* Relleno interno de la tarjeta */
  border-radius: 15px; /* Radio de borde para esquinas redondeadas */
  background-color: var(--white-color); /* Color de fondo personalizado */
  box-shadow: var(--box-shadow); /* Sombra de la tarjeta */
  display: flex; /* Elemento contenedor flexible */
  flex-direction: column; /* Dirección de columna */
  justify-content: space-between; /* Distribución espaciada verticalmente */
  animation: cardFadeIn 0.5s ease-in-out var(--card-delay); /* Animación de desvanecimiento de la tarjeta */
}

/* Estilos para los elementos 'div' dentro de las tarjetas de producto */
.products-cards .card div {
  display: flex; /* Elemento contenedor flexible */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente los elementos */
  align-items: center; /* Centrar horizontalmente los elementos */
}

/* Estilos para el texto de las tarjetas de producto */
.products-cards .card .card-text {
  align-items: flex-start; /* Alinear el texto a la izquierda */
  font-size: 13px; /* Tamaño de fuente */
  font-weight: bold; /* Peso de fuente en negrita */
  color: var(--first-alpha-color); /* Color de texto personalizado */
}

/* Estilos para el elemento 'span' dentro del texto de las tarjetas de producto */
.products-cards .card .card-text span {
  font-size: 1.75rem; /* Tamaño de fuente */
  color: var(--first-color); /* Color personalizado */
}

/* Estilos para la imagen dentro de las tarjetas de producto */
.products-cards .card .card-img img {
  aspect-ratio: 3/4; /* Relación de aspecto de la imagen */
  object-fit: contain; /* Ajustar imagen dentro del contenedor */
  width: 100%; /* Ancho al 100% del contenedor */
  transition: transform 0.5s ease; /* Transición animada */
}

/* Estilos para los enlaces dentro de las tarjetas de producto */
.products-cards .card a {
  width: 100%; /* Ancho al 100% del contenedor */
  padding: 0.6rem 1rem; /* Relleno interno del enlace */
  display: flex; /* Elemento contenedor flexible */
  justify-content: center; /* Centrar horizontalmente los elementos */
  align-items: center; /* Centrar verticalmente los elementos */
  gap: 1rem; /* Espacio entre elementos */
}

/* Estilos para los íconos SVG dentro de los enlaces de las tarjetas de producto */
.products-cards .card a svg {
  fill: var(--white-color); /* Color de relleno personalizado */
  width: 1.5em; /* Ancho del ícono */
  height: 1.5rem; /* Altura del ícono */
}

@media (min-width: 480px) {
  .products-cards {
    grid-template-columns: repeat(
      auto-fit,
      minmax(220px, 1fr)
    ); /* Columnas automáticas con tamaño mínimo de 220px y máximo de 1fr */
  }
}
```

5. **FOOTER**
   El footer es un elemento que también se mantiene en todas las páginas a excepción del carrito, por lo que también se le considerón un componente.

```css
/* Estilos del pie de página */
.footer {
  width: 100vw; /* Ancho igual al ancho de la ventana del navegador */
  background-color: var(--first-color); /* Color de fondo personalizado */
  color: var(--white-color); /* Color de texto personalizado */
}

/* Estilos del contenedor dentro del pie de página */
.footer .container {
  width: 100vw; /* Ancho igual al ancho de la ventana del navegador */
  display: flex; /* Contenedor flexible */
  flex-direction: column; /* Dirección de columnas */
  justify-content: center; /* Centrar verticalmente los elementos */
  align-items: center; /* Centrar horizontalmente los elementos */
  gap: 1rem; /* Espacio vertical entre elementos */
  padding: 1.5rem; /* Relleno interno del contenedor */
}

/* Estilos del detalle dentro del pie de página */
.footer .footer-details {
  width: 100%; /* Ancho igual al 100% de su contenedor */
  display: flex; /* Contenedor flexible */
  flex-direction: column; /* Dirección de columnas */
  justify-content: center; /* Centrar verticalmente los elementos */
  border-bottom: 5px solid var(--white-color); /* Borde inferior personalizado */
}

/* Estilos para los elementos 'details' dentro del pie de página */
.footer .footer-details details {
  min-width: max-content; /* Ancho mínimo igual al ancho de su contenido */
}

/* Estilos para los elementos 'summary' dentro del pie de página */
.footer details summary {
  font-size: calc(
    1vw + 0.8rem
  ); /* Tamaño de fuente basado en unidades de vista */
  font-weight: bold; /* Fuente en negrita */
  margin-bottom: 1rem; /* Margen inferior */
}

/* Estilos para los elementos 'div' dentro del pie de página */
.footer details div {
  display: flex; /* Contenedor flexible */
  flex-direction: column; /* Dirección de columnas */
  margin-bottom: 0.5rem; /* Margen inferior */
}

/* Estilos para los enlaces dentro del pie de página */
.footer details div a {
  color: var(--white-color); /* Color de texto personalizado */
  font-weight: bold; /* Fuente en negrita */
}

/* Estilos para el contenedor de redes sociales dentro del pie de página */
.footer .social-media-container {
  width: 100%; /* Ancho igual al 100% */
  display: flex; /* Contenedor flexible */
  flex-direction: column; /* Dirección de columnas */
  align-items: center; /* Centrar horizontalmente los elementos */
  gap: 0.5rem; /* Espacio vertical entre elementos */
  padding: 1rem; /* Relleno interno del contenedor */
}

/* Estilos para el título de redes sociales dentro del pie de página */
.footer .social-media-container h2 {
  text-align: center; /* Alineación del texto centrada */
  font-size: calc(
    2vw + 0.8rem
  ); /* Tamaño de fuente basado en unidades de vista */
}

/* Estilos para los íconos de redes sociales dentro del pie de página */
.footer .social-media-container .social-media-icons {
  width: 100%; /* Ancho igual al 100% */
  display: flex; /* Contenedor flexible */
  align-items: center; /* Centrar horizontalmente los elementos */
  justify-content: center; /* Centrar verticalmente los elementos */
  gap: 1rem; /* Espacio entre íconos */
}

/* Estilos para los íconos SVG de redes sociales dentro del pie de página */
.footer .social-media-container .social-media-icons a svg {
  width: 32px; /* Ancho del ícono */
  height: 32px; /* Altura del ícono */
  color: var(--white-color); /* Color del ícono personalizado */
}

@media (min-width: 768px) {
  .footer {
    width: 100vw; /* Ancho del 100% del viewport */
    height: auto; /* Altura automática */
    background-color: var(--first-color); /* Color de fondo personalizado */
    color: var(--white-color); /* Color de texto personalizado */
  }

  .footer .container {
    width: 100vw; /* Ancho del 100% del viewport */
    height: 100%; /* Altura del 100% */
    display: flex; /* Mostrar como flex */
    flex-direction: row; /* Dirección de fila */
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
    gap: 1rem; /* Espacio entre elementos internos */
    padding: 1.5rem; /* Relleno de 1.5rem */
  }

  .footer .footer-details {
    width: 60%; /* Ancho del 60% */
    height: 100%; /* Altura del 100% */
    border: none; /* Sin borde */
    border-right: 3px solid var(--white-color); /* Borde derecho de 3px sólido personalizado */
  }

  .footer details summary {
    font-size: calc(1vw + 0.5rem); /* Tamaño de fuente calculado */
    font-weight: bold; /* Peso de fuente en negrita */
  }

  .footer .social-media-container {
    width: 40%; /* Ancho del 40% */
  }

  .footer .social-media-container h2 {
    text-align: center; /* Alinear texto al centro */
    font-size: calc(2vw + 0.2rem); /* Tamaño de fuente calculado */
  }

  .footer .social-media-container .social-media-icons {
    width: 100%; /* Ancho del 100% */
    display: flex; /* Mostrar como flex */
    align-items: center; /* Centrar verticalmente */
    justify-content: center; /* Centrar horizontalmente */
    gap: 1rem; /* Espacio entre elementos internos */
  }

  .footer .social-media-container .social-media-icons a svg {
    width: 32px; /* Ancho de 32px */
    height: 32px; /* Altura de 32px */
    color: var(--white-color); /* Color personalizado */
  }
}
```

6. **FORM**

Estos estilos se aplican al componente formulario para que tenga una apariencia simple y elegante. Este componente es utilizado en los apartados "Carrito" y "Contactanos".

```css
/* FORMULARIO */

/* Estilos para el formulario */
.form {
  background-color: var(--white-color); /* Color de fondo personalizado */
  border-radius: 10px; /* Radio de borde de 10px */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  gap: 2rem; /* Espacio entre elementos internos */
  padding: 1rem; /* Relleno de 1rem */
}

.form div {
  width: 100%; /* Ancho del 100% */
  border-radius: 20px; /* Radio de borde de 20px */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: flex-start; /* Alinear a la izquierda horizontalmente */
}

.form div:last-of-type {
  grid-column: span 2; /* Ocupar dos columnas en la cuadrícula */
}

.form div:nth-of-type(5) {
  grid-column: span 2; /* Ocupar dos columnas en la cuadrícula */
}

.form h2 {
  font-size: 1.5rem; /* Tamaño de fuente de 1.5rem */
  font-weight: bold; /* Peso de fuente en negrita */
  color: var(--first-color); /* Color de texto personalizado */
}

.form div label {
  min-width: max-content; /* Ancho mínimo según el contenido */
  font-size: 1rem; /* Tamaño de fuente de 1rem */
  font-weight: bold; /* Peso de fuente en negrita */
  color: var(--first-color); /* Color de texto personalizado */
}

.form div input:hover,
.form div textarea:hover,
.form div input:focus,
.form div textarea:focus {
  border: 1px solid var(--first-color); /* Borde de 1px sólido personalizado */
}

.form div input:valid,
.form div textarea:valid {
  border: rgb(18, 190, 61); /* Borde válido personalizado */
}

.form div input,
.form div textarea {
  width: 100%; /* Ancho del 100% */
  padding: 1rem 2rem; /* Relleno de 1rem arriba y abajo, 2rem izquierda y derecha */
  height: 100%; /* Altura del 100% */
  border: none; /* Sin borde */
  border-bottom: 1px solid var(--white-color); /* Borde inferior de 1px sólido personalizado */
  outline: none; /* Sin contorno */
  background-color: var(--white-color); /* Color de fondo personalizado */
  box-shadow: var(--box-shadow); /* Sombra de caja personalizada */
  border-radius: 10px; /* Radio de borde de 10px */
  color: var(--first-color); /* Color de texto personalizado */
  resize: none; /* No redimensionable */
}

.form input[type="submit"] {
  width: 50%; /* Ancho del 50% */
  padding: 0.5rem 1rem; /* Relleno de 0.5rem arriba y abajo, 1rem izquierda y derecha */
  font-size: 1rem; /* Tamaño de fuente de 1rem */
  font-weight: bold; /* Peso de fuente en negrita */
  border-radius: 15px; /* Radio de borde de 15px */
  border: none; /* Sin borde */
  color: var(--white-color); /* Color de texto personalizado */
  background-color: var(--second-color); /* Color de fondo personalizado */
  transition: transform 0.5s ease; /* Transición de transformación de 0.5s */
}

.form input[type="submit"]:hover,
.form input[type="submit"]:focus {
  transform: scale(1.1); /* Escala de transformación de 1.1 */
}
```

### Carpeta pages

En esta carpeta se encuentran los distintos archivos de estilo para cada cada página con su respectivos archivo html.

#### about.css

Este archivo contiene todos los estilos css aplicados a la sección "Sobre nosotros" del sitio web.

```css
.main {
  background-color: #fff; /* Color de fondo blanco */
}

h2 {
  font-size: 1.5rem; /* Tamaño de fuente de 1.5rem */
  font-weight: bold; /* Peso de fuente en negrita */
  color: var(--first-color); /* Color personalizado */
}

.main {
  margin-top: 4rem; /* Margen superior de 4rem */
  display: grid; /* Mostrar como grid */
  place-content: center; /* Centrar contenido */
}

.bg {
  position: absolute; /* Posición absoluta */
  inset: 0; /* Ancho y alto de 0 en todos los lados */
  background-color: var(--black-alpha-color); /* Color de fondo personalizado */
  z-index: 1; /* Índice de apilamiento de 1 */
}

.hero-section {
  background-image: url("../assets/about_images/hero-about-img.jpg"); /* Imagen de fondo */
}

.mision-vision {
  margin: 0 auto; /* Margen automático en los lados izquierdo y derecho */
  display: grid; /* Mostrar como grid */
  grid-template-columns: 1fr; /* Columna única */
  place-content: repeat(
    auto-fit,
    minmax(1fr, 600px)
  ); /* Ajuste automático y tamaño mínimo de 1fr y máximo de 600px */
  gap: 2rem; /* Espacio entre elementos de 2rem */
  padding: 2rem; /* Relleno de 2rem */
}

.mision-vision article {
  max-width: 550px; /* Ancho máximo de 550px */
  padding: 1rem; /* Relleno de 1rem */
  border-radius: 15px; /* Radio de borde de 15px */
  box-shadow: var(--box-shadow); /* Sombra personalizada */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  gap: 1rem; /* Espacio entre elementos de 1rem */
  background-color: var(--white-color); /* Color de fondo personalizado */
}

.mision-vision article img {
  margin: 0 auto; /* Margen automático en los lados izquierdo y derecho */
  max-width: 300px; /* Ancho máximo de 300px */
  object-fit: cover; /* Ajuste del objeto de la imagen */
  object-position: center; /* Posición del objeto de la imagen */
}

.about-text {
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  gap: 1.5rem; /* Espacio entre elementos de 1.5rem */
  padding: 2rem; /* Relleno de 2rem */
}

.about-text-title {
  margin: 0 auto; /* Margen automático en los lados izquierdo y derecho */
  font-size: calc(3vw + 0.8rem); /* Tamaño de fuente calculado */
  color: var(--first-color); /* Color de texto personalizado */
  text-align: center; /* Alinear texto al centro */
}

.about-text article {
  display: flex; /* Mostrar como flex */
  justify-content: center; /* Centrar horizontalmente */
  flex-direction: column; /* Dirección de columna */
  gap: 1rem; /* Espacio entre elementos de 1rem */
  align-items: center; /* Centrar verticalmente */
}

.about-text article img {
  max-width: 50%; /* Ancho máximo de 50% */
}

@media screen and (min-width: 576px) {
  /* Estilos para pantallas con un ancho mínimo de 576px */

  .mision-vision {
    grid-template-columns: repeat(
      2,
      minmax(250px, 600px)
    ); /* Columnas repetidas, tamaño mínimo de 250px y máximo de 600px */
  }
}

@media screen and (min-width: 768px) {
  /* Estilos para pantallas con un ancho mínimo de 768px */

  .about-text article {
    max-width: 80%; /* Ancho máximo del 80% */
    flex-direction: row; /* Dirección de fila */
  }

  .about-text article img {
    max-width: 35%; /* Ancho máximo del 35% */
  }

  .about-text article:nth-of-type(odd) img {
    order: 1; /* Cambiar el orden del artículo impar */
  }
  .about-text article:nth-of-type(even) img {
    order: -1; /* Cambiar el orden del artículo par */
  }
}

@media screen and (min-width: 1200px) {
  /* Estilos para pantallas con un ancho mínimo de 1200px */

  .main {
    margin-top: 0; /* Margen superior de 0 */
  }
}
```

#### cart.css

Este archivo contiene todos los estilos css aplicados a la sección "cart" del sitio web.

```css
.main {
  margin-top: 4.5rem; /* Margen superior de 4.5rem */
  margin-bottom: 2rem; /* Margen inferior de 2rem */
  min-height: calc(100vh - 7rem); /* Altura mínima de 100vh - 7rem */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  align-items: center; /* Centrar horizontalmente */
  justify-content: space-between; /* Espacio entre elementos */
}

.cart {
  width: 100vw; /* Ancho máximo del viewport */
  display: grid; /* Mostrar como grid */
  grid-template-columns: repeat(
    auto-fit,
    minmax(160px, 1fr)
  ); /* Columnas automáticas, tamaño mínimo de 160px y máximo de 1fr */
  place-content: center; /* Centrar contenido */
  gap: 1rem; /* Espacio entre elementos de 1rem */
  padding: 1rem; /* Relleno de 1rem */
}

.cart .cartItem {
  background-color: var(--white-color); /* Color de fondo personalizado */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: space-between; /* Espacio entre elementos */
  align-items: center; /* Centrar horizontalmente */
  border-radius: 20px; /* Radio de borde de 20px */
  max-width: 250px; /* Ancho máximo de 250px */
  height: max-content; /* Altura máxima de contenido */
  overflow: hidden; /* Ocultar desbordamiento */
  margin: 0 auto; /* Margen automático en los lados izquierdo y derecho */
  gap: 1rem; /* Espacio entre elementos de 1rem */
}
.cart .cartItem .cartItem-img {
  max-width: 100%; /* Ancho máximo del 100% */
  max-height: 100%; /* Altura máxima del 100% */
  aspect-ratio: 4/4; /* Relación de aspecto de 4:4 */
  object-position: center 0; /* Posición del objeto de la imagen */
  object-fit: contain; /* Ajuste del objeto de la imagen */
  flex-grow: 1; /* Crecimiento flexible de 1 */
}
.cart .cartItem .cartItem-text {
  padding: 0.5rem; /* Relleno de 0.5rem */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  align-items: center; /* Centrar horizontalmente */
  justify-content: center; /* Centrar verticalmente */
  flex-grow: 1; /* Crecimiento flexible de 1 */
}

.cart .cartItem .del-item {
  width: 4rem; /* Ancho de 4rem */
  padding: 0.5rem 1rem; /* Relleno de 0.5rem arriba y abajo, 1rem izquierda y derecha */
  border: none; /* Sin borde */
  border-radius: 10px; /* Radio de borde de 10px */
  background-color: var(--second-color); /* Color de fondo personalizado */
}

.cart .cartItem .cartItem-text span {
  font-size: calc(1vw + 0.5rem); /* Tamaño de fuente calculado */
  color: var(--first-color); /* Color de texto personalizado */
  font-weight: bold; /* Negrita */
}
.cart .cartItem .cartItem-text small {
  font-size: 10px; /* Tamaño de fuente de 10px */
  color: var(--gray-dark-color); /* Color de texto personalizado */
}

.cart .cartItem .cartItem-img img {
  height: 100%; /* Altura del 100% */
  object-fit: contain; /* Ajuste del objeto de la imagen */
  object-position: center center; /* Posición del objeto de la imagen */
}

.cart-actions {
  display: flex; /* Mostrar como flex */
  justify-content: space-between; /* Espacio entre elementos */
  align-items: center; /* Centrar horizontalmente */
  flex-direction: column; /* Dirección de columna */
  width: 100vw; /* Ancho máximo del viewport */
  padding: 0 1rem; /* Relleno de 0 arriba y abajo, 1rem izquierda y derecha */
}

.cart-actions div {
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  width: 100%; /* Ancho del 100% */
  text-align: center; /* Alineación de texto centrada */
}

.cart-actions button {
  width: 100%; /* Ancho del 100% */
  padding: 0.5rem 1rem; /* Relleno de 0.5rem arriba y abajo, 1rem izquierda y derecha */
  border-radius: 10px; /* Radio de borde de 10px */
  border: none; /* Sin borde */
  background-color: var(--first-color); /* Color de fondo personalizado */
  color: var(--white-color); /* Color de texto personalizado */
}
.cart-actions button:first-of-type {
  background-color: var(--second-color); /* Color de fondo personalizado */
}

.cart-actions .clear-cart {
  display: flex; /* Mostrar como flex */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  gap: 0.5rem; /* Espacio entre elementos de 0.5rem */
}

.empty-cart {
  width: 100vw; /* Ancho máximo del viewport */
  padding: 1.5rem; /* Relleno de 1.5rem */
  text-align: center; /* Alineación de texto centrada */
  font-size: 1.2rem; /* Tamaño de fuente de 1.2rem */
  font-weight: bold; /* Negrita */
  color: var(--gray-dark-color); /* Color de texto personalizado */
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  gap: 2rem; /* Espacio entre elementos de 2rem */
}

.success-modal {
  display: flex; /* Mostrar como flex */
  flex-direction: column; /* Dirección de columna */
  justify-content: center; /* Centrar verticalmente */
  align-items: center; /* Centrar horizontalmente */
  position: fixed; /* Posición fija */
  width: 80vw; /* Ancho del 80% del viewport */
  height: max-content; /* Altura máxima de contenido */
  padding: 1.25rem; /* Relleno de 1.25rem */
  top: 50%; /* Ubicación superior del 50% */
  left: 50%; /* Ubicación izquierda del 50% */
  border-radius: 10px; /* Radio de borde de 10px */
  transform: translate(-50%, -50%); /* Traducción de -50% en ambos ejes */
  gap: 1rem; /* Espacio entre elementos de 1rem */
  background-color: var(--white-alpha-color); /* Color de fondo personalizado */
  backdrop-filter: blur(20px); /* Filtro de fondo desenfocado */
}

.success-modal-bg {
  position: absolute; /* Posición absoluta */
  inset: 0; /* Ajuste de inserción en todos los lados */
  background-color: var(--black-alpha-color); /* Color de fondo personalizado */
  z-index: -10; /* Índice z -10 */
}
.success-modal h1 {
  color: var(--first-color); /* Color de texto personalizado */
  font-size: 2rem; /* Tamaño de fuente de 2rem */
  font-weight: bold; /* Negrita */
}
.success-modal span {
  color: var(--second-color); /* Color de texto personalizado */
  font-size: 1.25rem; /* Tamaño de fuente de 1.25rem */
  font-weight: 400; /* Peso de fuente de 400 */
}
.success-modal p {
  color: var(--gray-dark-color); /* Color de texto personalizado */
  font-size: 0.8rem; /* Tamaño de fuente de 0.8rem */
}

.form {
  width: 90vw; /* Ancho del 90% del viewport */
  gap: 0.5rem; /* Espacio entre elementos de 0.5rem */
  z-index: 9999; /* Índice z 9999 */
  position: fixed; /* Posición fija */
  top: 50%; /* Ubicación superior del 50% */
  left: 50%; /* Ubicación izquierda del 50% */
  transform: translate(-50%, -50%); /* Traducción de -50% en ambos ejes */
}

.form button {
  width: 100%; /* Ancho del 100% */
}

@media (min-width: 320px) {
  /* Reglas CSS específicas para pantallas con un ancho mínimo de 320px */
}

@media (min-width: 375px) {
  /* Reglas CSS específicas para pantallas con un ancho mínimo de 375px */
}

@media (min-width: 414px) {
  /* Reglas CSS específicas para pantallas con un ancho mínimo de 414px */
  .form {
    display: grid; /* Mostrar como grid */
    grid-template-columns: 1fr 1fr; /* Columnas de tamaño igual */
    justify-items: center; /* Centrar horizontalmente */
  }

  .form h2 {
    grid-column: span 2; /* Ocupar 2 columnas */
  }

  .form button {
    width: 10rem; /* Ancho de 10rem */
  }
  .form > input {
    grid-column: span 2; /* Ocupar 2 columnas */
  }
}

/* Estilos para pantallas con un ancho mínimo de 480px */
@media (min-width: 480px) {
  /* Cambiar la dirección de la flexbox a fila en .cart-actions */
  .cart-actions {
    flex-direction: row;
  }

  /* Establecer un ancho mínimo de contenido para los botones en .cart-actions */
  .cart-actions button {
    width: 0;
    min-width: max-content;
  }
}

/* Estilos para pantallas con un ancho mínimo de 768px */
@media (min-width: 768px) {
  /* Establecer un ancho de 750px para .form */
  .form {
    width: 750px;
  }
}

/* Estilos para pantallas con un ancho mínimo de 1200px */
@media (min-width: 1200px) {
  /* Eliminar el margen superior de .main */
  .main {
    margin-top: 0;
  }
}
```

#### contact.css

Este archivo contiene todos los estilos css aplicados a la sección "Contact" del sitio web.

```css
/* Estilos generales para .main */
.main {
  margin: 0 auto; /* Centra el elemento horizontalmente en su contenedor */
  margin-top: 4rem; /* Margen superior de 4 rem */
  margin-bottom: 4rem; /* Margen inferior de 4 rem */
}

/* Estilos para .main .container */
.main .container {
  display: flex; /* Elemento de tipo flex */
  flex-direction: column; /* Dirección de columna para los elementos secundarios */
  justify-content: center; /* Centra verticalmente los elementos secundarios */
  align-items: center; /* Centra horizontalmente los elementos secundarios */
  gap: 1.5rem; /* Espacio de 1.5 rem entre los elementos secundarios */
}

/* Estilos para las secciones */
.section {
  width: 100vw; /* Ancho de la sección igual al ancho de la ventana */
  min-height: 80vh; /* Altura mínima de la sección del 80% del alto de la ventana */
  display: flex; /* Elemento de tipo flex */
  justify-content: center; /* Centra horizontalmente los elementos secundarios */
  align-items: center; /* Centra verticalmente los elementos secundarios */
}

/* Estilos alternativos para las secciones pares e impares */
.section:nth-child(even) {
  background-color: var(
    --first-alpha-color
  ); /* Color de fondo para las secciones pares */
}
.section:nth-child(odd) {
  background-color: var(
    --second-alpha-color
  ); /* Color de fondo para las secciones impares */
}

/* Estilos para .hero-section */
.hero-section {
  background-image: url("../assets/contact_images/hero-contact-img.jpg"); /* Imagen de fondo para la sección de héroe */
}

/* Estilos para .contact-text-section */
.contact-text-section {
  width: 100vw; /* Ancho de la sección igual al ancho de la ventana */
  display: grid; /* Elemento de tipo grid */
  grid-template-columns: 1fr; /* Una sola columna en el grid */
  padding: 1rem; /* Relleno de 1 rem */
  gap: 1rem; /* Espacio de 1 rem entre los elementos secundarios */
  color: var(--black-color); /* Color de texto */
}

/* Estilos para .contact-info-container */
.contact-info-container {
  display: flex; /* Elemento de tipo flex */
  flex-direction: column; /* Dirección de columna para los elementos secundarios */
  align-items: center; /* Centra horizontalmente los elementos secundarios */
  justify-content: center; /* Centra verticalmente los elementos secundarios */
}

/* Estilos para .contact-info-items */
.contact-info-items {
  display: grid; /* Elemento de tipo grid */
  grid-template-columns: 1fr; /* Una sola columna en el grid */
  gap: 1.5rem; /* Espacio de 1.5 rem entre los elementos secundarios */
}

/* Estilos para .info-item */
.info-item {
  height: auto; /* Altura automática */
  padding: 1rem; /* Relleno de 1 rem */
  border-radius: 10px; /* Borde redondeado de 10 px */
  display: flex; /* Elemento de tipo flex */
  justify-content: space-evenly; /* Espacio igual entre los elementos secundarios */
  align-items: center; /* Centra horizontalmente los elementos secundarios */
  text-align: start; /* Alineación del texto a la izquierda */
  box-shadow: var(--box-shadow); /* Sombra del elemento */
  gap: 1rem; /* Espacio de 1 rem entre los elementos secundarios */
  background-color: var(--white-color); /* Color de fondo del elemento */
}

.info-item img {
  width: 5rem; /* Ancho de la imagen de 5 rem */
  height: 5rem; /* Altura de la imagen de 5 rem */
}

.info-item div h3 {
  min-width: max-content; /* Ancho mínimo igual al contenido máximo */
  text-align: center; /* Alineación del texto al centro */
  color: #000 !important; /* Color de texto (importante) */
}

/* Estilos para los elementos de texto en .contact-text-section */
.contact-text-section article h3,
.contact-text-section article strong {
  color: var(--white-color); /* Color de texto */
}

/* Estilos para .container.contact-form-section */
.container.contact-form-section {
  display: flex; /* Elemento de tipo flex */
  flex-direction: column; /* Dirección de columna para los elementos secundarios */
  align-items: center; /* Centra horizontalmente los elementos secundarios */
  justify-content: center; /* Centra verticalmente los elementos secundarios */
  gap: 2.5rem; /* Espacio de 2.5 rem entre los elementos secundarios */
  padding: 1rem; /* Relleno de 1 rem */
}

/* Estilos para .contact-form-text */
.contact-form-section .contact-form-text {
  display: flex; /* Elemento de tipo flex */
  justify-content: center; /* Centra horizontalmente los elementos secundarios */
  align-items: center; /* Centra verticalmente los elementos secundarios */
  flex-direction: column; /* Dirección de columna para los elementos secundarios */
  text-align: center; /* Alineación del texto al centro */
  gap: 1.5rem; /* Espacio de 1.5 rem entre los elementos secundarios */
}

.contact-form-section .contact-form-text h2 {
  font-size: 2rem; /* Tamaño de fuente de 2 rem */
  font-weight: 900; /* Peso de fuente de 900 */
  color: var(--white-color); /* Color de texto */
}

.contact-form-section .contact-form-text p {
  font-size: 1.2rem; /* Tamaño de fuente de 1.2 rem */
  font-weight: 500; /* Peso de fuente de 500 */
  color: var(--white-alpha-color); /* Color de texto */
}

/* Estilos para .form dentro de ciertos tamaños de pantalla */
@media (min-width: 375px) {
  .form {
    max-width: 500px; /* Ancho máximo de 500 px */
    display: grid; /* Elemento de tipo grid */
    grid-template-columns: 1fr 1fr; /* Dos columnas en el grid */
    justify-items: center; /* Centra horizontalmente los elementos secundarios */
  }

  .form h2 {
    grid-column: span 2; /* Ocupa el ancho de las dos columnas en el grid */
  }
  .form > input {
    grid-column: span 2; /* Ocupa el ancho de las dos columnas en el grid */
  }
}

@media (min-width: 576px) {
  /* Estilos para .contact-info-items en pantallas con ancho mínimo de 576px */
  .contact-info-items {
    grid-template-columns: 1fr 1fr; /* Dos columnas en el grid */
  }

  /* Estilos para .info-item en pantallas con ancho mínimo de 576px */
  .info-item {
    flex-direction: column; /* Dirección de columna para los elementos secundarios */
  }
}

@media (min-width: 768px) {
  /* Estilos para .contact-info-items en pantallas con ancho mínimo de 768px */
  .contact-info-items {
    grid-template-columns: 1fr 1fr 1fr; /* Tres columnas en el grid */
  }

  /* Estilos para .container.contact-form-section en pantallas con ancho mínimo de 768px */
  .container.contact-form-section {
    flex-direction: row; /* Dirección de fila para los elementos secundarios */
    justify-content: space-between; /* Espacio distribuido entre los elementos secundarios */
    padding: 1rem; /* Relleno de 1 rem */
  }

  /* Estilos para .contact-form-text en pantallas con ancho mínimo de 768px */
  .contact-form-section .contact-form-text {
    width: 40vw; /* Ancho del 40% del ancho de la ventana */
    align-items: flex-start; /* Alineación de los elementos secundarios al inicio */
    text-align: start; /* Alineación del texto a la izquierda */
  }
  .contact-form-container {
    width: 50vw; /* Ancho del 50% del ancho de la ventana */
    display: flex; /* Elemento de tipo flex */
    justify-content: center; /* Centra horizontalmente los elementos secundarios */
    align-items: center; /* Centra verticalmente los elementos secundarios */
  }
}

@media (min-width: 1200px) {
  /* Estilos para .main en pantallas con ancho mínimo de 1200px */
  .main {
    margin-top: 0; /* Margen superior de 0 */
  }
}
```

#### detail.css

Este archivo es el que le da estilos css al detalle de los productos.

```css
/* Oculta la barra de desplazamiento en WebKit */
body::-webkit-scrollbar {
  display: none;
}

/* Estilos para la tarjeta de detalle */
.detail-card {
  height: calc(
    100vh - 4rem
  ); /* Establece la altura de la tarjeta como el 100% del viewport menos 4rem */
  width: 100vw; /* Establece el ancho de la tarjeta como el 100% del viewport */
  display: flex; /* Hace que los elementos dentro de la tarjeta se muestren en línea */
  flex-direction: column; /* Establece la dirección de los elementos dentro de la tarjeta como vertical */
  justify-content: space-between; /* Distribuye el espacio verticalmente entre los elementos dentro de la tarjeta */
  align-items: center; /* Centra los elementos horizontalmente dentro de la tarjeta */
  margin-top: 4rem; /* Establece un margen superior de 4rem */
}

/* Estilos para el botón de retroceso */
.detail-card .back {
  position: absolute; /* Establece la posición del botón como absoluta */
  top: 5rem; /* Establece la posición superior del botón */
  left: 0.5rem; /* Establece la posición izquierda del botón */
  width: 2rem; /* Establece el ancho del botón */
  height: 2rem; /* Establece la altura del botón */
  color: var(--second-color); /* Establece el color del texto del botón */
  background-color: transparent; /* Establece el fondo del botón como transparente */
  border: none; /* Elimina el borde del botón */
  display: flex; /* Hace que los elementos dentro del botón se muestren en línea */
  justify-content: center; /* Centra los elementos horizontalmente dentro del botón */
  align-items: center; /* Centra los elementos verticalmente dentro del botón */
  cursor: pointer; /* Establece el cursor del botón como un puntero */
}

/* Estilos para el ícono de retroceso */
.detail-card .back svg {
  width: 2rem; /* Establece el ancho del ícono */
  height: 2rem; /* Establece la altura del ícono */
}

/* Estilos para el contenedor de contenido de la tarjeta de detalle */
.detail-card .detail-card-content-container {
  width: 100%; /* Establece el ancho del contenedor de contenido al 100% */
  display: flex; /* Hace que los elementos dentro del contenedor se muestren en línea */
  flex-direction: column; /* Establece la dirección de los elementos dentro del contenedor como vertical */
  align-items: center; /* Centra los elementos horizontalmente dentro del contenedor */
  justify-content: space-between; /* Distribuye el espacio verticalmente entre los elementos dentro del contenedor */
  gap: 1rem; /* Establece el espacio entre los elementos dentro del contenedor */
  padding: 1rem; /* Establece el relleno del contenedor */
  padding-top: 1.5rem; /* Establece el relleno superior del contenedor */
  border-radius: 30px 30px 0 0; /* Establece el radio de borde en la parte superior del contenedor */
  background-color: var(
    --white-color
  ); /* Establece el color de fondo del contenedor */
  color: var(
    --gray-dark-color
  ); /* Establece el color de texto del contenedor */
}

/* Estilos para el título dentro del contenedor de contenido */
.detail-card .detail-card-content h2 {
  text-align: center; /* Centra el texto del título */
  font-size: 1rem; /* Establece el tamaño de fuente del título */
}

/* Estilos para el párrafo dentro del contenedor de contenido */
.detail-card .detail-card-content p {
  font-size: 0.7rem; /* Establece el tamaño de fuente del párrafo */
}

/* Estilos para el precio dentro del contenedor de contenido */
.detail-card .detail-card-content span {
  color: var(--price-color); /* Establece el color del precio */
  font-size: 2rem; /* Establece el tamaño de fuente del precio */
  font-weight: 900; /* Establece el peso de fuente del precio como negrita */
}

/* Estilos para las acciones de la tarjeta de detalle */
.detail-card .detail-card-actions {
  width: 100%; /* Establece el ancho de las acciones al 100% */
  display: flex; /* Hace que los elementos de las acciones se muestren en línea */
  justify-content: space-between; /* Distribuye el espacio horizontalmente entre los elementos de las acciones */
  flex-direction: column; /* Establece la dirección de los elementos de las acciones como vertical */
  align-items: stretch; /* Estira los elementos de las acciones para que ocupen todo el ancho */
  gap: 0.5rem; /* Establece el espacio entre los elementos de las acciones */
}

/* Estilos para los botones de las acciones */
.detail-card-actions button {
  order: 1; /* Cambia el orden de los botones a la primera posición */
}

/* Estilos para el contenedor de selección de las acciones */
.detail-card-actions div {
  display: flex; /* Hace que los elementos dentro del contenedor se muestren en línea */
  align-items: center; /* Centra los elementos horizontalmente dentro del contenedor */
  justify-content: center; /* Centra los elementos verticalmente dentro del contenedor */
  gap: 0.5rem; /* Establece el espacio entre los elementos dentro del contenedor */
  width: 100%; /* Establece el ancho del contenedor al 100% */
  padding: 0.7rem 1rem; /* Establece el relleno del contenedor */
}

/* Estilos para el botón de selección dentro del contenedor de selección */
.detail-card-actions div select {
  background-color: transparent; /* Establece el fondo del botón de selección como transparente */
  border: none; /* Elimina el borde del botón de selección */
  outline: none; /* Elimina el contorno del botón de selección */
  font-size: 1rem; /* Establece el tamaño de fuente del botón de selección */
  font-weight: bold; /* Establece el peso de fuente del botón de selección como negrita */
  color: var(
    --white-color
  ); /* Establece el color de texto del botón de selección */
  padding: 8px; /* Establece el relleno del botón de selección */
  appearance: none; /* Elimina los estilos nativos del botón de selección */
  -webkit-appearance: none; /* Elimina los estilos nativos del botón de selección en WebKit */
  -moz-appearance: none; /* Elimina los estilos nativos del botón de selección en Firefox */
}

/* Cambia el color del botón de selección cuando se pasa el cursor sobre él */
.detail-card-actions div:hover > select {
  cursor: pointer; /* Establece el cursor del botón de selección como un puntero */
  color: var(
    --second-color
  ); /* Cambia el color de texto del botón de selección */
}

/* Estilos para diferentes tamaños de pantalla */

@media (min-width: 320px) {
  /* Estilos específicos para pantallas de 320px o más */
}

@media (min-width: 375px) {
  /* Estilos específicos para pantallas de 375px o más */

  .detail-card .detail-card-content-container {
    width: 100%; /* Establece el ancho del contenedor de contenido al 100% */
    display: flex; /* Hace que los elementos dentro del contenedor se muestren en línea */
    flex-direction: column; /* Establece la dirección de los elementos dentro del contenedor como vertical */
    align-items: flex-start; /* Alinea los elementos a la izquierda dentro del contenedor */
    justify-content: space-between; /* Distribuye el espacio verticalmente entre los elementos dentro del contenedor */
    gap: 1rem; /* Establece el espacio entre los elementos dentro del contenedor */
    padding: 1.5rem; /* Establece el relleno del contenedor */
    border-radius: 30px 30px 0 0; /* Establece el radio de borde en la parte superior del contenedor */
    background-color: var(
      --white-color
    ); /* Establece el color de fondo del contenedor */
    color: var(
      --gray-dark-color
    ); /* Establece el color de texto del contenedor */
  }

  .detail-card .detail-card-content h2 {
    text-align: start; /* Alinea el texto del título a la izquierda */
    font-size: 1.8rem; /* Establece el tamaño de fuente del título */
  }

  .detail-card .detail-card-content p {
    font-size: 1rem; /* Establece el tamaño de fuente del párrafo */
  }

  .detail-card .detail-card-content span {
    color: var(--price-color); /* Establece el color del precio */
    font-size: calc(
      4vw + 1.5rem
    ); /* Establece el tamaño de fuente del precio de forma responsiva */
    font-weight: 900; /* Establece el peso de fuente del precio como negrita */
  }

  .detail-card .detail-card-actions {
    width: 100%; /* Establece el ancho de las acciones al 100% */
    display: flex; /* Hace que los elementos de las acciones se muestren en línea */
    flex-direction: row; /* Establece la dirección de los elementos de las acciones como horizontal */
    justify-content: space-between; /* Distribuye el espacio horizontalmente entre los elementos de las acciones */
    align-items: center; /* Centra los elementos verticalmente dentro de las acciones */
  }

  .call-to-action {
    max-width: max-content; /* Establece el ancho máximo de la acción principal al tamaño máximo del contenido */
  }

  .detail-card-actions button.call-to-action {
    min-width: 50%; /* Establece el ancho mínimo de la acción principal al 50% */
  }
}

/* Define estilos para dispositivos con un ancho mínimo de 480px */
@media (min-width: 480px) {
  /* Alinea los elementos dentro de la clase ".detail-card-actions" con espacio entre ellos */
  .detail-card .detail-card-actions {
    justify-content: space-between;
  }
}

/* Define estilos para dispositivos con un ancho mínimo de 768px */
@media (min-width: 768px) {
  /* Aplica un diseño de cuadrícula a la clase ".detail" con dos columnas iguales */
  .detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* Ajusta el alto de la clase ".detail-header" restando 4rem al 100vh (alto de la ventana) */
  /* Centra verticalmente los elementos dentro de la clase ".detail-header" */
  /* Cambia el orden de visualización a 1 */
  .detail-header {
    height: calc(100vh - 4rem);
    display: grid;
    place-content: center;
    order: 1;
  }

  /* Limita el ancho máximo de la imagen dentro de la clase ".detail-card-img" a 40vw (40% del ancho de la ventana) */
  .detail-card .detail-header .detail-card-img {
    max-width: 40vw;
  }

  /* Ajusta el alto de la clase ".detail-body" restando 4rem al 100vh (alto de la ventana) */
  /* Cambia el orden de visualización a -1 */
  .detail-body {
    height: calc(100vh - 4rem);
    order: -1;
  }

  /* Aplica bordes redondeados a la clase ".detail-card-content-container" en la esquina derecha */
  .detail-body .detail-card-content-container {
    border-radius: 0 30px 30px 0;
  }

  /* Ajusta el alto de la clase ".detail-card-content-container" al 100% */
  /* Alinea los elementos dentro de la clase ".detail-card-content-container" con espacio entre ellos */
  /* Centra vertical y horizontalmente los elementos dentro de la clase ".detail-card-content-container" */
  .detail-body .detail-card-content-container {
    height: 100%;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  /* Alinea el texto del título (h2) en el centro */
  .detail-body .detail-card-content-container h2 {
    text-align: center;
  }

  /* Ajusta el ancho al 100% y muestra los elementos de la clase ".detail-card-actions" en una columna */
  /* Alinea los elementos dentro de la clase ".detail-card-actions" con espacio entre ellos */
  /* Ordena los botones antes que otros elementos en la clase ".detail-card-actions" */
  .detail-card .detail-card-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  /* Cambia el orden de visualización de los botones a 1 */
  .detail-card-actions button {
    order: 1;
  }

  /* Establece el ancho máximo de ".primary-btn" y ".call-to-action" al 100% */
  .primary-btn,
  .call-to-action {
    max-width: 100%;
  }

  /* Alinea los elementos dentro de la clase ".detail-card-actions" con espacio entre ellos */
  .detail-card .detail-card-actions {
    justify-content: space-between;
  }

  /* Vuelve a definir el diseño de la clase ".detail" como cuadrícula con dos columnas */
  .detail {
    display: grid;
    grid-template-columns: 375px 1fr;
  }
}

/* Define estilos para dispositivos con un ancho mínimo de 1200px */
@media (min-width: 1200px) {
  /* Elimina el margen superior de la clase ".detail-card" */
  .detail-card {
    margin-top: 0;
  }

  /* Limita el ancho máximo de la imagen dentro de la clase ".detail-card-img" a 35vw (35% del ancho de la ventana) */
  .detail-card .detail-header .detail-card-img {
    max-width: 35vw;
  }
}
```

#### products.css

En este archivo están todos los estilos para la sección de productos del sitio web.

```css
/* Oculta las barras de desplazamiento del navegador web */
body::-webkit-scrollbar {
  display: none;
}

/* Estilos para el contenedor principal */
.main {
  margin-top: 4rem; /* Margen superior de 4rem */
  width: 100vw; /* Ancho del 100% del viewport */
  height: max-content; /* Altura ajustada al contenido */
  display: flex;
  justify-content: center; /* Centra horizontalmente los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  flex-direction: column; /* Apila los elementos verticalmente */
  gap: 1rem; /* Espacio de separación vertical entre elementos de 1rem */
}

/* ----- FORMULARIO ----- */

/* Contenedor del formulario y elementos adyacentes */
.products-aside-container {
  display: flex;
  flex-direction: column; /* Apila los elementos verticalmente */
  justify-content: center; /* Centra horizontalmente los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  width: 100vw; /* Ancho del 100% del viewport */
  gap: 1rem; /* Espacio de separación vertical entre elementos de 1rem */
}

.products-form {
  margin: 1rem; /* Margen de 1rem */
  margin-bottom: 0; /* Elimina el margen inferior */
  display: grid;
  place-content: center; /* Centra los elementos en el contenedor */
  position: relative; /* Posición relativa */
}

.products-form .search-placeholder {
  display: flex;
  justify-content: center; /* Centra horizontalmente los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  gap: 0.5rem; /* Espacio de separación horizontal entre elementos de 0.5rem */
  position: absolute; /* Posición absoluta */
  top: 50%; /* Coloca en el centro vertical */
  left: 50%; /* Coloca en el centro horizontal */
  transform: translate(-50%, -50%); /* Centra exactamente en el centro */
}

.products-form .search-placeholder svg {
  fill: var(--gray-dark-color); /* Color de relleno */
  width: 1.6rem; /* Ancho de 1.6rem */
  height: 1.6rem; /* Altura de 1.6rem */
}

.products-form .search-placeholder span {
  color: var(--gray-dark-color); /* Color de texto */
}

.products-form form input {
  width: 70vw; /* Ancho del 70% del viewport */
  height: 2.5rem; /* Altura de 2.5rem */
  padding: 1.5rem; /* Relleno de 1.5rem */
  border-radius: 1.25rem; /* Radio de borde de 1.25rem */
  text-align: center; /* Alineación centrada del texto */
  border: none; /* Sin borde */
  outline: none; /* Sin contorno */
}

.products-form form input:focus ~ .search-placeholder {
  display: none; /* Oculta el texto de marcador de posición al enfocar el campo de entrada */
}

/* ----- CATEGORÍAS ----- */

.products-aside-container {
  position: sticky; /* Posición pegajosa */
  top: 4rem; /* Coloca a 4rem desde la parte superior */
  left: 0; /* Coloca a la izquierda */
  background-color: var(--gray-color); /* Color de fondo */
}

.products-categories {
  display: flex;
  justify-content: flex-start; /* Justifica hacia la izquierda los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  gap: 1rem; /* Espacio de separación horizontal entre elementos de 1rem */
  position: relative; /* Posición relativa */
  width: 100vw; /* Ancho del 100% del viewport */
  overflow-x: auto; /* Permite desplazamiento horizontal */
  height: 5rem; /* Altura de 5rem */
  padding: 0 1rem; /* Relleno horizontal de 0 y 1rem */
}

.products-categories::-webkit-scrollbar {
  display: none; /* Oculta las barras de desplazamiento del navegador web */
}

.products-categories button {
  padding: 0.7rem 1rem; /* Relleno vertical y horizontal */
  min-width: max-content; /* Ancho mínimo basado en el contenido */
  border-radius: 10px; /* Radio de borde de 10px */
  border: none; /* Sin borde */
  font-weight: bold; /* Peso de fuente en negrita */
  background-color: #799dfa; /* Color de fondo */
  color: var(--first-color); /* Color de texto */
  box-shadow: var(--box-shadow); /* Sombra de caja */
}

.products-categories button.active {
  color: var(--white-color); /* Color de texto */
  background-color: var(--first-color); /* Color de fondo */
}

/* ----- TARJETAS DE PRODUCTO ----- */

.primary-btn {
  display: flex;
  justify-content: space-between !important; /* Justifica espacio entre los elementos */
  align-items: center; /* Centra verticalmente los elementos */
}

/* IMPORTANTE: los estilos de esta sección se toman de la hoja "utilities.css" */

@media (min-width: 992px) {
  .main {
    flex-direction: row; /* Cambia la dirección de apilamiento a horizontal */
    align-items: flex-start; /* Alinea los elementos al principio */
    gap: 0; /* Sin espacio de separación entre elementos */
    background-color: var(--first-color); /* Color de fondo */
  }

  .products-aside-container {
    height: calc(100vh - 4rem); /* Altura calculada */
    flex-direction: column; /* Apila los elementos verticalmente */
    justify-content: flex-start; /* Justifica los elementos al principio */
    background-color: var(--first-color); /* Color de fondo */
    flex-grow: 1; /* Crecimiento flexible de 1 */
    overflow: hidden; /* Oculta el desbordamiento */
  }

  .products-cards {
    background-color: var(--gray-color); /* Color de fondo */
    border-radius: 30px; /* Radio de borde de 30px */
    flex-grow: 6; /* Crecimiento flexible de 6 */
    min-width: 70vw; /* Ancho mínimo del 70% del viewport */
    min-height: 99vh; /* Altura mínima del 99% del viewport */
  }

  .products-form {
    flex-grow: 1; /* Crecimiento flexible de 1 */
  }

  .products-form form input {
    width: 20vw; /* Ancho del 20% del viewport */
  }

  .products-categories {
    width: 100%; /* Ancho del 100% */
    height: 70vh; /* Altura de 70vh */
    flex-direction: column; /* Apila los elementos verticalmente */
    align-items: flex-end; /* Alinea los elementos a la derecha */
    gap: 2rem; /* Espacio de separación vertical entre elementos de 2rem */
    overflow-y: scroll; /* Permite desplazamiento vertical */
    padding: 0.5rem 0; /* Relleno vertical de 0.5rem y sin relleno horizontal */
    flex-grow: 6; /* Crecimiento flexible de 6 */
  }

  .products-categories button {
    width: 80%; /* Ancho del 80% */
    height: 3rem; /* Altura de 3rem */
    background-color: var(--first-color); /* Color de fondo */
    border-radius: 20px 0 0 20px; /* Radio de borde */
    justify-content: flex-end; /* Justifica hacia la derecha los elementos */
    color: var(--white-color); /* Color de texto */
    position: relative; /* Posición relativa */
  }

  .products-categories button.active {
    background-color: var(--gray-color); /* Color de fondo */
    color: var(--first-color); /* Color de texto */
  }

  .products-categories button.active::before {
    box-shadow: 1.5px 5px 0 var(--gray-color); /* Sombra de caja */
  }
  .products-categories button.active::after {
    box-shadow: 1.5px -5px 0 var(--gray-color); /* Sombra de caja */
  }

  .products-categories button::before {
    position: absolute; /* Posición absoluta */
    content: ""; /* Contenido vacío */
    width: 0.5rem; /* Ancho de 0.5rem */
    height: 1rem; /* Altura de 1rem */
    background-color: transparent; /* Color de fondo transparente */
    right: 0; /* Coloca a la derecha */
    bottom: 100%; /* Coloca arriba del botón */
    border-bottom-right-radius: 0.5rem; /* Radio de borde inferior derecho */
    box-shadow: 1px 5px 0 var(--first-color); /* Sombra de caja */
  }
  .products-categories button::after {
    position: absolute; /* Posición absoluta */
    content: ""; /* Contenido vacío */
    width: 1rem; /* Ancho de 1rem */
    height: 2rem; /* Altura de 2rem */
    background-color: transparent; /* Color de fondo transparente */
    right: 0; /* Coloca a la derecha */
    top: 100%; /* Coloca debajo del botón */
    border-top-right-radius: 0.5rem; /* Radio de borde superior derecho */
    box-shadow: 2rem 2rem 0 var(--second-color); /* Sombra de caja */
  }

  .products-cards {
    grid-template-columns: repeat(
      auto-fit,
      minmax(220px, 1fr)
    ); /* Columnas flexibles */
    width: 70vw; /* Ancho del 70% del viewport */
  }

  .footer {
    width: 70vw; /* Ancho del 70% del viewport */
    display: none; /* Oculta el elemento */
  }
}

@media (min-width: 1200px) {
  .main {
    margin-top: 0; /* Elimina el margen superior */
  }
}
```

