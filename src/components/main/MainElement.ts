import html from './MainElement.html?raw';

export class MainElement extends HTMLElement {

    connectedCallback() : void {
        this.innerHTML = html;
    }

}

customElements.define('main-element',MainElement);