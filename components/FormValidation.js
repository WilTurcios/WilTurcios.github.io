export default function FormValidator({ target }) {
  const form = document.querySelector(target);
  const inputs = form.querySelectorAll("input, textarea");
  const span = document.createElement("span");

  let isAllCorrect = [];

  const parameters = {
    email: {
      regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      successMessage: "Tu email es válido.",
      errorMessage:
        "El email ingresado no es válido, por favor, asegurate de ingresar los datos correctamente.",
    },
    name: {
      regEx: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      successMessage: "Tu(s) nombre(s) es(son) válido(s).",
      errorMessage:
        "El nombre ingresado no es válido, por favor, asegurate de que sea un nombre válido.",
    },
    lastname: {
      regEx: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      successMessage: "Tu(s) apellido(s) es(son) válido(s).",
      errorMessage:
        "El apellido ingresado no es válido, por favor, asegurate de que sea un apellido válido.",
    },
    postalCode: {
      regEx: /^\d{5}$/,
      successMessage: "El código postal es válido.",
      errorMessage:
        "El numero postal ingresado no es válido, por favor, ingresa únicamente números.",
    },
    card: {
      regEx: /^\d{13,19}$/,
      successMessage: "El número de targeta de crédito es válido.",
      errorMessage:
        "El número de targeta ingresado no es válido, por favor, asegurate de que cumpla con los requisitos.",
    },
    number: {
      regEx: /^\+\d{3}\s?\d{4}[-]?\d{4}$/,
      successMessage: "El número de télefono es válido.",
      errorMessage:
        "El número de teléfono ingresado no es válido, por favor, asegurate de agregar un código de área y que sean únicamente números.",
    },
    message: {
      regEx: /^(?![\s\S]*(?:<script|<\/script))[^\n\r]*$/,
      successMessage: "El mensaje cumple con los requisitos.",
      errorMessage: "El mensaje no tiene un formato válido.",
    },
  };

  const validateParameters = async ({
    input,
    regularExpression,
    errorMessage,
    successMessage,
  }) => {
    const isCorrect =
      regularExpression.test(input.value) &&
      input.value.length >= 3 &&
      input.value.trim() !== "";

    if (!isCorrect) {
      span.classList.add("invalid");
      span.classList.remove("valid");

      span.innerText =
        errorMessage ||
        "El parametro ingresado no es válido, asegurate de ingresarlo correctamente.";

      if (input.nextElementSibling) {
        input.nextElementSibling.replaceWith(span);
      } else {
        input.insertAdjacentElement("afterend", span);
      }
      isAllCorrect.push(false);
    } else {
      isAllCorrect.push(true);
      if (isCorrect) {
        span.classList.remove("invalid");
        span.classList.add("valid");

        span.innerText =
          successMessage || "El campo cumple con los requisitos.";
        if (input.nextElementSibling) {
          input.nextElementSibling.replaceWith(span);
        } else {
          input.insertAdjacentElement("afterend", span);
        }
      }
    }
  };

  const validateForm = (e) => {
    let input = e.target;
    let inputName = input.name;

    validateParameters({
      input,
      regularExpression: parameters[inputName].regEx,
      errorMessage: parameters[inputName].errorMessage,
      successMessage: parameters[inputName].successMessage,
    });
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isAllCorrect.every((isCorrect) => isCorrect)) {
      span.remove();
      e.target.submit();
    } else {
      e.target.reset();

      span.remove();
      span.classList.add("invalid");
      span.classList.remove("valid");
      span.style.position = "static";
      span.style.marginTop = "10px";
      span.innerText = "Error: Por favor rellena el formulario correctamente";

      e.target.insertAdjacentHTML("afterend", span.outerHTML);
    }
  });
}
