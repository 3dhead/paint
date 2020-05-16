const SplitButtonDefinition = (templateSelector) => {

return class extends HTMLElement {
    constructor() {
      super();
      let template = document.querySelector(templateSelector);
      let templateContent = template.content;

      this._shadowRoot = this.attachShadow({mode: 'open'})
      this._shadowRoot.appendChild(templateContent.cloneNode(true));

      this._shadowRoot.querySelector('.dropdown-toggle').addEventListener('click', () => this.toggleDropdown())
      this._shadowRoot.querySelector('.main').addEventListener('click', () => this.pressMain())
    }

    pressMain() {
      const mainButton = this._shadowRoot.querySelector('.main')
      mainButton.dispatchEvent(new Event('button-press', {bubbles: true, composed: true}));
    }

    toggleDropdown() {
      this._shadowRoot.querySelector('.dropdown').classList.toggle('active')
    }
  }
}

export const splitButtonSetup = (templateSelector, mainCallback) => {
  customElements.define('split-button', SplitButtonDefinition(templateSelector))
  document.querySelector('split-button').addEventListener('button-press', mainCallback)
}