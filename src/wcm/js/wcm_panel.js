//All buttons to navigate to the pages list section
const pagesNavButtons = document.querySelectorAll(".nav_pages");

//All buttons to navigate to the products list section
const productsNavButtons = document.querySelectorAll(".nav_products");

//All buttons to navigate to the menu section
const menuNavButtons = document.querySelectorAll(".nav_menu");

//All buttons to navigate to the modification section
const modifNavButtons = document.querySelectorAll(".nav_modif");

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

function loadProductsSect() {
  for (const sect of sections) {
    sect.classList.add("hidden");
  }
  sections[2].classList.remove("hidden");
}

function loadMenuSect() {
  for (const sect of sections) {
    sect.classList.add("hidden");
  }
  sections[0].classList.remove("hidden");
}

async function loadPageSect() {
  console.log("page button event");

  for (const sect of sections) {
    sect.classList.add("hidden");
  }
  sections[1].classList.remove("hidden");

  let pageNames = await getPagesNames();

  while (pageBtnList.lastElementChild) {
    pageBtnList.removeChild(pageBtnList.lastElementChild);
  }

  for (const name of pageNames) {
    pageBtnList.appendChild(clonePageButton(name));
  }

  for (const pageButton of pageBtnList.children) {
    console.log(pageButton);
    pageButton.addEventListener("click", loadModifSect);
    console.log("click click");
  }
}

async function loadModifSect(e) {
  const name = e.target.textContent.split(".")[0];
  const iframe = cloneIframe(name);

  console.log(iframe.src);

  const backButton = document.querySelector("#modif .back");
  const saveButton = document.querySelector("#modif .save");

  sections[3].appendChild(iframe);
  for (const sect of sections) {
    sect.classList.add("hidden");
  }
  sections[3].classList.remove("hidden");
}

pageButton.addEventListener("click", loadPageSect);

productsButton.addEventListener("click", loadProductsSect);

for (const button of backButtons) {
  button.addEventListener("click", loadMenuSect);
}
