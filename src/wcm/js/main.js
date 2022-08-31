//list of page name buttons in pages section
const pageNamesList = document.querySelector("#page_names");

//iframe of the modif section
const modifIframe = document.querySelector("#modif_iframe");

//modif cancel button
const modifCancelButton = document.querySelector(".modif_cancel_button");

//modif save button
const modifSaveButton = document.querySelector(".modif_save_button");

document.addEventListener("click", async function (e) {
  let route = e.target.getAttribute("route");
  if (route) {
    await router(route);
  }
});

async function router(route) {
  let views = document.querySelectorAll("[view]");
  console.log(views);
  let nextView;

  switch (route) {
    case "/pages":
      nextView = route;
      loadPageSect();
      break;

    case "/modif":
      nextView = route;
      break;

    default:
      nextView = route;
      break;
  }

  //hide all views to show the next one
  for (const view of views) {
    console.log({ route }, view.getAttribute("view"), { nextView });
    if (view.getAttribute("view") === nextView) {
      view.classList.remove("hidden");
    } else {
      view.classList.add("hidden");
    }
    console.log({ view });
  }
}

router("/menu");

//page names array
let pageNames = [];

function changePathFileName(path, name) {
  let newPath = path.split("/");
  newPath[newPath.length - 1] = name;
  newPath = newPath.join("/");
  console.log(path, newPath);
  return newPath;
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

async function sendModifiedPage() {
  //get innerHtml
  let html = modifIframe.contentDocument.children[0].outerHTML;
  console.log(html);

  const url = "/wcm/modif";

  const obj = {
    fileName: modifIframe.getAttribute("src"),
    content: html,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(url, options);
  let data = await response.json();
  console.log(data);
}

async function uploadImage(element) {
  //create the input element
  let fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("name", "file");
  fileInput.click();

  fileInput.addEventListener("change", async function (e) {
    //creating form data object and append file into that form data
    console.log(fileInput.files[0]);
    let formData = new FormData();
    formData.append("files", fileInput.files[0]);
    formData.append("oldFile", element.src);

    for (const entry of formData.entries()) {
      console.log(entry);
    }

    console.log(formData.entries());

    //network request using POST method of fetch
    const url = "/wcm/upload";

    const options = {
      method: "POST",
      // headers: {
      //   "Content-Length": fileInput.files[0].length,
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    };

    const response = await fetch(url, options);
    let data = await response.text();
    console.log(data);

    element.src = changePathFileName(element.src, fileInput.files[0].name);
  });
}

// document.addEventListener("click", async function (e) {
//   await uploadImage();
// });

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

  pageNames = await getPagesNames();

  while (pageNamesList.lastElementChild) {
    pageNamesList.removeChild(pageNamesList.lastElementChild);
  }

  for (const name of pageNames) {
    let newName = name.split(".")[0];
    pageNamesList.appendChild(clonePageButton(newName));
  }

  for (const pageButton of pageNamesList.children) {
    console.log(pageButton);
    pageButton.addEventListener("click", loadModifSect);
  }
}

function getElementWithoutChild(elems) {
  let foundElems = [];
  for (const elem of elems) {
    if (!elem.children.length && elem.tagName !== "IMG") {
      foundElem.push(elem);
    }
  }

  return foundElems;
}

let editableElements = [];

async function loadModifSect(e) {
  const name = `/${e.target.textContent.split(".")[0]}`;
  console.log(name);

  modifIframe.setAttribute("src", name);
  console.log(modifIframe.contentDocument.designMode);
  // modifIframe.contentDocument.designMode = "on";

  setTimeout(() => {
    let doc = modifIframe.contentDocument || modifIframe.contentWindow.document;

    //get all modifiable element
    let allElements = doc.querySelectorAll("body *");
    console.log(allElements);
    for (const elem of allElements) {
      if (!elem.children.length && elem.tagName !== "IMG") {
        editableElements.push(elem);
        elem.contentEditable = "true";
        console.log(elem);
      }
    }

    //run uploadImage each time we click an image
    doc.addEventListener("click", async function (e) {
      console.log(e.target.tagName);
      if (e.target.tagName !== "IMG") return false;

      await uploadImage(e.target);
    });

    // doc.designMode = "on";
    // console.log(doc.designMode, modifIframe);
  }, 1000);
}

modifSaveButton.addEventListener("click", async function () {
  //get all modifiable element
  let doc = modifIframe.contentDocument || modifIframe.contentWindow.document;

  let allElements = doc.querySelectorAll("body *");
  console.log(allElements);

  for (const elem of allElements) {
    if (!elem.children.length) {
      elem.contentEditable = "inherit";
      console.log(`${elem} --> ${elem.innerHTML}`);
    }
  }

  await sendModifiedPage();

  for (const elem of allElements) {
    if (!elem.children.length) {
      elem.contentEditable = "true";
      console.log(elem);
    }
  }
});
