import './PriceElement.css';
import html from './PriceElement.html?raw';

export class PriceElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = html;
    }
}

customElements.define('price-element', PriceElement);