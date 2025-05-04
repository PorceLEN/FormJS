const form = document.querySelector("form");

function errorObject(inputs) {
  const errors = {};

  const pseudoRegex = /^(?=.*[A-Z])[A-Za-z0-9\-_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!pseudoRegex.test(inputs.pseudo)) {
    errors.pseudo = "Pseudo incorrect !";
  }

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email incorrect !";
  }

  if (!passwordRegex.test(inputs.password)) {
    errors.password = "Mot de passe incorrect !";
  }

  if (inputs.password !== inputs.confirm) {
    errors.confirm = "Le mot de passe ne correspond pas !";
  }

  return errors;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const pseudoInput = document.getElementById("pseudo");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm");

  const inputRemoveErrors = form
    .querySelectorAll("*:is(div, span)")
    .forEach((input) => {
      input.classList.remove("error");
    });

  const errorInputs = errorObject({
    pseudo: pseudoInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    confirm: confirmInput.value,
  });

  Object.entries(errorInputs).forEach(([key, value]) => {
    const inputs = document.querySelector("." + key + "-container");
    const span = document.querySelector("." + key + "-container > span");

    inputs.classList.add("error");
    span.textContent = value;
  });
});
