import { createElement, delay, getElement } from "../utilities.js";
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
