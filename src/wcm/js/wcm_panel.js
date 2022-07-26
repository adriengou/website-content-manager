//All buttons to navigate to the pages list section
const pagesNavButtons = document.querySelectorAll(".nav_pages");

//All buttons to navigate to the products list section
const productsNavButtons = document.querySelectorAll(".nav_products");

//All buttons to navigate to the menu section
const menuNavButtons = document.querySelectorAll(".nav_menu");

//All buttons to navigate to the modification section
const modifNavButtons = document.querySelectorAll(".nav_modif");

//list of page name buttons in pages section
const pageNamesList = document.querySelector("#page_names");

//iframe of the modif section
const modifIframe = document.querySelector("#modif_iframe");

//sections array
let sections = {
  menu: document.querySelector("#menu"),
  pages: document.querySelector("#pages"),
  products: document.querySelector("#products"),
  modif: document.querySelector("#modif"),
};

function loadSect(sect) {
  for (const key in sections) {
    sections[key].classList.add("hidden");
  }

  sections[sect].classList.remove("hidden");
}

async function getPagesNames() {
  const url = "/wcm/pages";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  let data = await response.json();
  console.log(data);

  return data;
}

function clonePageButton(name) {
  const template = document
    .querySelector("#page_name_button_temp")
    .content.querySelector("button");

  console.log(template);

  let clone = template.cloneNode(true);
  console.log(clone);

  clone.textContent = name;

  return clone;
}

async function loadPageSect() {
  console.log("page button event");

  let pageNames = await getPagesNames();

  while (pageNamesList.lastElementChild) {
    pageNamesList.removeChild(pageNamesList.lastElementChild);
  }

  for (const name of pageNames) {
    pageNamesList.appendChild(clonePageButton(name));
  }

  for (const pageButton of pageNamesList.children) {
    console.log(pageButton);
    pageButton.addEventListener("click", loadModifSect);
  }

  loadSect("pages");
}

async function loadModifSect(e) {
  const name = e.target.textContent.split(".")[0];

  modifIframe.setAttribute("src", name);

  loadSect("modif");
  console.log(modifIframe.contentDocument.designMode);
  // modifIframe.contentDocument.designMode = "on";

  setTimeout(() => {
    let doc = modifIframe.contentDocument || modifIframe.contentWindow.document;
    doc.designMode = "on";
    console.log(doc.designMode, modifIframe);
  }, 1000);
}

for (const nav of pagesNavButtons) {
  nav.addEventListener("click", loadPageSect);
}

for (const nav of productsNavButtons) {
  nav.addEventListener("click", function () {
    loadSect("products");
  });
}

for (const nav of menuNavButtons) {
  nav.addEventListener("click", function () {
    loadSect("menu");
  });
}
