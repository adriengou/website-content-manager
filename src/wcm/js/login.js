import requests from "./requests.js";
import route from "./route.js";

const PASSWORD_INPUT = document.querySelector("#password");
const LOGIN_ERROR = document.querySelector("#login_error");

const REGISTER_BUTTON = document.querySelector("#register");
const LOGIN_BUTTON = document.querySelector("#login");

document.addEventListener("click", async function (e) {
  switch (e.target.id) {
    case "register":
      await register();
      break;

    case "login":
      await login();

    default:
      break;
  }
});

async function login() {
  let password = PASSWORD_INPUT.value;
  let result = await requests.login(password);
  console.log("login result: " + JSON.stringify(result));

  if (result.valid) {
    route("/menu");
  } else {
    LOGIN_ERROR.textContent = "";
    setTimeout(function () {
      LOGIN_ERROR.textContent = "Mauvais mot de passe !";
    }, 500);
  }
}

async function register() {
  let password = PASSWORD_INPUT.value;
  let result = await requests.register(password);
  console.log("register result: " + JSON.stringify(result));

  if (result) {
    route("/menu");
  } else {
    LOGIN_ERROR.textContent = "";
    setTimeout(function () {
      LOGIN_ERROR.textContent = "Mot de passe déjà enregistré";
    }, 500);
  }
}

export default {};
