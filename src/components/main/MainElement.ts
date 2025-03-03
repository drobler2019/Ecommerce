import './MainElement.css';
import html from './MainElement.html?raw';
import { PriceElement } from '../sectionPrice/PriceElement';
import { ProductElement } from './product/ProductElement';
import { MIN_SIZE_SCREEN_DESKTOP } from '../../utils/Util';

export class MainElement extends HTMLElement {

    private productElement = new ProductElement();

    constructor(private priceElement: PriceElement) {
        super();
    }

    connectedCallback(): void {
        this.innerHTML = html;
        if (this.firstElementChild) {
            const { firstElementChild: mainContainer } = this;
            const { firstElementChild: containerProducts } = mainContainer;
            mainContainer.appendChild(this.priceElement);
            if (innerWidth > MIN_SIZE_SCREEN_DESKTOP)
                containerProducts!.appendChild(this.productElement);
        }
    }

}

customElements.define('main-element', MainElement);