import axios from "../plugins/axios";
import UI from "../config/ui.config";

const { inputSignUpCountry } = UI;

function optionWrapHandler(el) {
  const option = document.createElement("option");
  option.textContent = el;
  return option;
}

function clearContainer(container) {
  container.innerHTML = "";
}

function onCountriesInit(res) {
  const fragment = document.createDocumentFragment();
  const datalist = document.getElementById("countries");
  clearContainer(datalist);
  Object.values(res).forEach((el) => {
    const elem = optionWrapHandler(el);
    fragment.appendChild(elem);
  });
  datalist.appendChild(fragment);
}

function onCitiesInit(res) {
  const fragment = document.createDocumentFragment();
  const datalist = document.getElementById("cities");
  clearContainer(datalist);
  res.forEach((el) => {
    const elem = optionWrapHandler(el);
    fragment.appendChild(elem);
  });
  datalist.appendChild(fragment);
}

function enableCities() {
  const inputCities = document.getElementById("city-sign-up");
  inputCities.removeAttribute("disabled");
}

function getKeyByValue(obj, val) {
  return Object.keys(obj).find((key) => obj[key] === val);
}

export async function countriesAutocomplete() {
  try {
    const response = await axios.get("/location/get-countries");

    onCountriesInit(response);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function onAutocompleteHandler() {
  try {
    const countryRes = await countriesAutocomplete();

    if (Object.values(countryRes).indexOf(inputSignUpCountry.value) == -1)
      return;

    const countryIndex = getKeyByValue(countryRes, inputSignUpCountry.value);

    const response = await axios.get(`/location/get-cities/${countryIndex}`);

    enableCities();
    onCitiesInit(response);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
