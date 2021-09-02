import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { signUp } from "./services/sign-up.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import tabs from "./views/tabs";

import {
  countriesAutocomplete,
  onAutocompleteHandler,
} from "./services/autocomplete.service";

const {
  loginTab,
  signUpTab,
  form,
  signUpForm,
  inputEmail,
  inputPassword,
  inputSignUpEmail,
  inputSignUpNickname,
  inputSignUpFirstName,
  inputSignUpLastName,
  selectSignUpGender,
  inputSignUpDate,
  inputSignUpPhone,
  inputSignUpCountry,
  inputSignUpCity,
  inputSignUpPassword,
} = UI;
const inputs = [inputEmail, inputPassword];
const signUpInputs = [
  inputSignUpEmail,
  inputSignUpNickname,
  inputSignUpFirstName,
  inputSignUpLastName,
  selectSignUpGender,
  inputSignUpDate,
  inputSignUpPhone,
  inputSignUpCountry,
  inputSignUpCity,
  inputSignUpPassword,
];

// Events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSignUpSubmit();
});

loginTab.addEventListener("click", (e) => {
  e.preventDefault();
  tabs.onLoginTabHandler();
});

signUpTab.addEventListener("click", (e) => {
  e.preventDefault();
  tabs.onSignUpHandler();
});

inputSignUpCountry.addEventListener("change", (e) => {
  onAutocompleteHandler();
});

inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

signUpInputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

countriesAutocomplete();

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}

async function onSignUpSubmit() {
  const isValidForm = signUpInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm || !inputSignUpDate) return;

  const [year, month, day] = inputSignUpDate.value.split("-");

  try {
    await signUp(
      inputSignUpEmail.value,
      inputSignUpPassword.value,
      inputSignUpNickname.value,
      inputSignUpFirstName.value,
      inputSignUpLastName.value,
      inputSignUpPhone.value,
      selectSignUpGender.value,
      inputSignUpCity.value,
      inputSignUpCountry.value,
      day,
      month,
      year
    );

    signUpForm.reset();
    notify({ msg: "Sign-up success", className: "alert-success" });
  } catch (err) {
    notify({ msg: "Sign-up failed", className: "alert-danger" });
  }
}
