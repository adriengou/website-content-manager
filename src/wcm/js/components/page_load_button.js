class MyCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    console.log("I am leaving");
  }

  static get observedAttributes() {
    return ["src", "text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute has changed: ${name} from ${oldValue} to ${newValue}`
    );
    this.render();
  }

  render() {
    console.log("I am connecting");

    const link = this.attributes.imageLink.value;
    const text = this.attributes.text.value;

    //Render the list itself
    this.innerHTML = /*html*/ `

    `;
  }
}

customElements.define("my-card", MyCard);

export { MyCard };
