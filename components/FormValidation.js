import { getElement } from "../utilities/utilities.js";

export const FormValidation = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  console.log(formData);

  const validationHadler = {
    set: (obj, key, value) => {
      if (key === "name") {
        if (!/^[A-Za-z]{2,30}$/.test(value) && value.trim() === "") {
          const name = getElement({ selector: ".form" }).name;
          name.classList.add(".error");
          name.setCustomValidity(
            "Por favor introduce un nombre que sea valido"
          );
        }
      }
      if (key === "lastname") {
        if (!/^[A-Za-z]{2,30}$/.test(value) && value.trim() === "") {
          const lastname = getElement({ selector: ".form" }).lastname;
          lastname.classList.add(".error");
          lastname.setCustomValidity(
            "Por favor introduce un apellido que sea valido"
          );
        }
      }
      if (key === "email") {
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) &&
          value.trim() === ""
        ) {
          const email = getElement({ selector: ".form" }).email;
          email.classList.add(".error");
          email.setCustomValidity(
            "Por favor introduce un e-mail que sea valido"
          );
        }
      }
      if (key === "message") {
        if (
          !/^[a-zA-Z0-9.,!?\"'()$%&:;<>\\/+\-@\\[\\]{}\\s]*$/.test(value) &&
          value.trim() === ""
        ) {
          const message = getElement({ selector: ".form" }).message;
          message.classList.add(".error");
          message.setCustomValidity(
            "Por favor introduce un mensaje que sea valido"
          );
        }
      }
    },
  };

  const formProxy = new Proxy(formData, validationHadler);
};
