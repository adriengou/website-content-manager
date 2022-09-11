function cloneTemplate(templateId) {
  let template = document.querySelector(`#${templateId}`);

  if (!template) {
    throw "Wrong template id";
    return false;
  }

  let clone = template.content.children[0].cloneNode(true);
  return clone;
}

export default cloneTemplate;
