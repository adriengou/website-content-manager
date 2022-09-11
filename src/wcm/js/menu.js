import route from "./route.js";
import requests from "./requests.js";
import cloneTemplate from "./template.js";

const PAGE_NAMES = document.querySelector("#page_names");

document.addEventListener("click", async function (e) {
  let link = e.target.getAttribute("link");

  switch (link) {
    case "/pages":
      await loadPages();
      break;
    case "/products":
      await loadProducts();
      break;
    default:
      break;
  }
});

async function loadPages() {
  while (PAGE_NAMES.firstChild) {
    PAGE_NAMES.removeChild(PAGE_NAMES.lastChild);
  }

  let result = await requests.getPages();
  for (const pageName of result) {
    let pageButton = cloneTemplate("page_name_button_temp");
    pageButton.textContent = pageName.split(".")[0];
    PAGE_NAMES.appendChild(pageButton);
    route("/pages");
  }
}

async function loadProducts() {}

export default {};
