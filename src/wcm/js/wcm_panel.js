const pageButton = document.querySelector("#page_button");
const productsButton = document.querySelector("#products_button");
const sections = document.querySelectorAll("section");
const backButtons = document.querySelectorAll(".back_button");
console.log(sections);

pageButton.addEventListener("click", async function () {
  console.log("page button event");
  sections[0].classList.add("hidden");
  sections[1].classList.remove("hidden");

  await getPagesNames();
});

productsButton.addEventListener("click", async function () {
  console.log("product button event");
  sections[0].classList.add("hidden");
  sections[2].classList.remove("hidden");
});

for (const button of backButtons) {
  console.log("back button event");
  button.addEventListener("click", function () {
    for (const sect of sections) {
      sect.classList.add("hidden");
    }
    sections[0].classList.remove("hidden");
  });
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
