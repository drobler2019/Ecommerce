import './ProductElement.css';
import html from './ProductElement.html?raw';
import { MIN_SIZE_SCREEN_DESKTOP } from '../../../utils/Util';

export class ProductElement extends HTMLElement {

    private status = true;

    connectedCallback() {
        this.innerHTML = html;
        window.addEventListener('resize', this);
    }
    handleEvent(): void {
        if (innerWidth < MIN_SIZE_SCREEN_DESKTOP && !this.status) {
            const containerProducts = document.querySelector('.container-products');
            containerProducts!.removeChild(this);
            this.status = true;
        }
        if (innerWidth > MIN_SIZE_SCREEN_DESKTOP && this.status) {
            const containerProducts = document.querySelector('.container-products');
            containerProducts!.appendChild(this);
            this.status = false;
        }
    }
}

customElements.define('product-element', ProductElement);