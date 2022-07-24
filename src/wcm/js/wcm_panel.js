const pageButton = document.querySelector("#page_button");
const productsButton = document.querySelector("#products_button");
const sections = document.querySelectorAll("section");
const backButtons = document.querySelectorAll(".back_button");
const pageBtnList = document.querySelector("#page_names");

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
  sections[0].classList.add("hidden");
  sections[1].classList.remove("hidden");

  let pageNames = await getPagesNames();

  while (pageBtnList.lastElementChild) {
    pageBtnList.removeChild(pageBtnList.lastElementChild);
  }

  for (const name of pageNames) {
    const template = document
      .querySelector("#page_name_button_temp")
      .content.querySelector("button");
    console.log(template);

    let clone = template.cloneNode(true);
    console.log(clone);

    clone.textContent = name;
    pageBtnList.appendChild(clone);
  }
}

pageButton.addEventListener("click", loadPageSect);

productsButton.addEventListener("click", loadProductsSect);

for (const button of backButtons) {
  button.addEventListener("click", loadMenuSect);
}
