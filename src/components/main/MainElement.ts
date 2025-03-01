import html from './MainElement.html?raw';
import './MainElement.css';
import { PriceElement } from '../sectionPrice/PriceElement';

export class MainElement extends HTMLElement {

    constructor(private priceElement: PriceElement) {
        super();
    }

    connectedCallback(): void {
        this.innerHTML = html;
        if (this.firstElementChild) {
            const { firstElementChild: priceContainer } = this.priceElement;
            this.firstElementChild.appendChild(priceContainer!);
        }
    }

}

customElements.define('main-element', MainElement);