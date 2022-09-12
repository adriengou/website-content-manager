import cloneTemplate from "./template.js";

const EDIT_IFRAME = document.querySelector("#modif_iframe");
const CANCEL_BUTTON = document.querySelector(".modif_cancel_button");
const IMG_UPLOAD_INPUT = document.querySelector("#modif_img_upload");
const IMG_UPLOAD_MODAL = document.querySelector("#modif_upload_modal");

//list of forbidden text in edited element's innerHtml
const FORBIDDEN_TEXT = ["<div>", "</div>", "<br>", "&nbsp;"];

//variable holding the currently edited element
let editedElement;

//variable holding the original innerHtml
let originalHtml;

//array of all changes
let changes = [];

//relation between file and img dom elements
let namesAndBlobs = {};

//wait for the iframe to be loaded to add event listeners
EDIT_IFRAME.addEventListener("load", addEvents);

function disableEditedElement(e) {
  if (editedElement && !editedElement.isSameNode(e.target)) {
    //set contenteditable attribute to false;
    editedElement.removeAttribute("contenteditable");

    //remove forbidden text
    let html = editedElement.innerHTML;
    for (const word of FORBIDDEN_TEXT) {
      html = html.replaceAll(word, "");
    }
    // html = html.trim();
    editedElement.innerHTML = originalHtml;
    editedElement.textContent = html;
    addTextChange(editedElement, originalHtml, html);
    editedElement = false;
  }
}

function addEvents(e) {
  //element for when edited element loose focus
  document.addEventListener("click", disableEditedElement);

  //element for when an iframe element is clicked
  EDIT_IFRAME.contentDocument.addEventListener("click", handleIframeClick);

  //Cancel button event
  CANCEL_BUTTON.addEventListener("click", undo);

  //ctr+Z keydown event
  document.addEventListener("keydown", undoKeyPress);
}

function handleIframeClick(e) {
  console.log(e.target);
  disableEditedElement(e);
  //if the element is an image
  if (e.target.tagName === "IMG") {
    handleImgClick(e);
  }
  //if the element is childless
  else if (e.target.children.length === 0) {
    //save original text
    originalHtml = e.target.innerHTML;

    //set editable attribute to true
    e.target.setAttribute("contenteditable", true);
    e.target.focus();
    editedElement = e.target;
  }
}

function addTextChange(element, oldText, newText) {
  if (oldText === newText) {
    return false;
  }

  changes.push({
    type: "text",
    element,
    oldText,
    newText,
  });
}

function addImageChange(element, oldSrc, newSrc) {
  if (oldSrc === newSrc) {
    return false;
  }

  changes.push({
    type: "image",
    element,
    oldSrc,
    newSrc,
  });
}

function undoKeyPress(e) {
  if (e.key === "z" && e.ctrlKey) {
    undo();
  }
}

function undo() {
  if (changes.length === 0) {
    return false;
  }

  console.log(changes);
  let lastChange = changes.pop();
  console.log(changes);

  switch (lastChange.type) {
    case "text":
      lastChange.element.textContent = lastChange.oldText;
      break;

    case "image":
      lastChange.element.setAttribute("src", lastChange.oldSrc);

      break;
    default:
      break;
  }
}

function handleImgClick(e) {
  //show the file input

  let fileInput = cloneTemplate("img_input_template");
  if (IMG_UPLOAD_MODAL.hasChildNodes()) {
    IMG_UPLOAD_MODAL.removeChild(IMG_UPLOAD_MODAL.lastChild);
  }
  IMG_UPLOAD_MODAL.appendChild(fileInput);
  IMG_UPLOAD_MODAL.classList.remove("hidden");

  //file chosen event
  fileInput.addEventListener("change", function () {
    showNewImage(e.target, fileInput);
  });
}

function showNewImage(clickedImage, fileInput) {
  IMG_UPLOAD_MODAL.classList.add("hidden");
  let oldSrc = clickedImage.getAttribute("src");
  let newSrc = URL.createObjectURL(fileInput.files[0]);
  clickedImage.setAttribute("src", newSrc);
  addImageChange(clickedImage, oldSrc, newSrc);
}

export default {};
