import html from './PriceElement.html?raw';
import './PriceElement.css';

export class PriceElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = html;
    }
}

customElements.define('price-element', PriceElement);