// Importar funciones y módulos necesarios
import { createElement, delay, getElement } from "../utilities/utilities.js";
import { clearCart } from "./Cart.js";

// Función que se ejecuta cuando el pago se realiza con éxito
const successfulPayment = async ({ target }) => {
  // Obtener elemento principal del documento
  const $main = getElement({ selector: ".main" });

  // Crear un fondo modal de éxito
  const bg = createElement({
    elementType: "div",
    className: "success-modal-bg",
  });

  // Crear un modal de éxito
  const $successModal = createElement({
    elementType: "section",
    className: "success-modal",
    attributes: {
      id: "successModal",
    },
  });

  // Limpiar el contenido del elemento principal
  $main.innerHTML = "";

  // Agregar contenido al modal de éxito
  $successModal.innerHTML = `
    <h1>¡Felicidades!</h1>
    <span>Tu pago ha sido realizado con éxito.</span>
    <p>Tu pedido estará llegando a tu hogar dentro de los próximos 3 días.</p>
  `;

  // Insertar el modal de éxito y el fondo modal en el elemento principal
  $main.insertAdjacentElement("beforeend", $successModal);
  $main.insertAdjacentElement("beforeend", bg);

  // Cerrar el modal de pago
  closeModal("#payment-modal");

  // Imprimir mensaje de éxito en la consola
  console.log("Success");

  // Esperar 5 segundos
  await delay(5000);

  // Limpiar el carrito
  clearCart();

  // Enviar el formulario
  target.submit();
};

// Función que se ejecuta al enviar el formulario del carrito
export const submitCartForm = ({ target }) => {
  // Convertir los datos del formulario a un objeto
  const data = Object.fromEntries(new FormData(target));

  // Imprimir los datos en la consola
  console.log(data);

  // Realizar el pago exitoso
  successfulPayment({ target });
};

// Función que crea el modal de pago
export function PaymentModal() {
  // Crear el formulario del modal de pago
  const $paymentModal = createElement({
    elementType: "form",
    className: "form",
    attributes: {
      id: "payment-modal",
    },
  });

  // Agregar contenido al formulario
  $paymentModal.innerHTML = `
      <h2>Formulario de Compra</h2>
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" placeholder="Ángel" required>
      </div>

      <div>
        <label for="lastname">Apellido:</label>
        <input type="text" id="lastname" name="lastname" placeholder="Durán" required>
      </div>

      <div>
        <label for="postalCode">Código Postal:</label>
        <input type="text" id="postalCode" name="postalCode" placeholder="13578" required>
      </div>

      <div>
        <label for="card">Tarjeta de Crédito:</label>
        <input type="text" id="card" name="card"  placeholder="4000 0000 0000 0002" required>
      </div>

      <div>
        <label for="message">Mensaje:</label>
        <textarea id="message" name="message" placeholder="Dejanos un mensaje con información adicional"></textarea>
      </div>
        <button id="buy" class="call-to-action" style="--color: var(--first-color)" type="submit">Comprar</button>
        <button class="call-to-action close-dialog" style="--color: var(--second-color)" type="button">Cancelar</button>
  `;

  return $paymentModal;
}

// Función que crea el modal de pago y lo inserta después del elemento especificado
export function CreatePaymentModal({ insertAfter }) {
  // Obtener el elemento principal
  const $main = getElement({ selector: insertAfter });

  // Insertar el modal de pago después del elemento principal
  $main.insertAdjacentElement("afterend", PaymentModal());
}

// Función que cierra un modal especificado
export const closeModal = (element) => {
  // Obtener el modal a cerrar
  const paymentModal = getElement({ selector: element });

  // Remover el modal del documento
  paymentModal.remove();
};
