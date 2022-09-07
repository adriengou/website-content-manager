import router from "./navigation.js";
import requests from "./requests.js";

document.addEventListener("click", async function (e) {
  let route = e.target.getAttribute("route");
  if (route) {
    await router(route);
  }
});

console.log(requests);
router("/menu");
