import route from "./route.js";

const EDIT_IFRAME = document.querySelector("#modif_iframe");

document.addEventListener("click", function (e) {
  if (e.target.getAttribute("link") === "/modif") {
    loadPageEdit(e.target.textContent);
  }
});

function loadPageEdit(pageName) {
  let url = `/${pageName}`;
  EDIT_IFRAME.src = url;
  route("/modif");
}

export default {};
