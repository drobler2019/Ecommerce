import { getTemplate, templatePrice } from '../../utils/Util';
import { HeaderElement } from '../header/HeaderElement';
import './PriceElement.css';
import html from './PriceElement.html?raw';

export class PriceElement extends HTMLElement {

    private count = 0;

    constructor(private headerElement: HeaderElement) {
        super();
        this.innerHTML = html;
    }

    connectedCallback(): void {
        const minus = this.querySelector('.icon-minus')!;
        const plus = this.querySelector('.icon-plus')!;
        plus.addEventListener('click', this);
        minus.addEventListener('click', this);
    }

    handleEvent(event: Event) {
        const element = event.target;
        if (element instanceof HTMLDivElement) {
            const container = element as HTMLDivElement;
            if (container.className.includes('.icon-plus')) {
                this.count++;
                this.addNumber();
            } else {
                if (this.count === 0) {
                    return;
                }
                this.count--;
                this.addNumber();
            }
        } else if (element instanceof HTMLImageElement) {
            const img = element as HTMLImageElement;
            if (img.alt.includes('plus')) {
                this.count++;
                this.addNumber();
            } else {
                if (this.count === 0) {
                    return;
                }
                this.count--;
                this.addNumber();
            }
        }
    }

    private addNumber(): void {
        const { shadowRoot } = this.headerElement;
        const containerIconCart = shadowRoot!.querySelector('.icon-cart')!;
        const quantityBuy = containerIconCart.querySelector('.quantity-buy');
        const cartContainerPrice = shadowRoot!.querySelector<HTMLDivElement>('.container-price-product');
        if (quantityBuy) {
            if (this.count === 0) {
                const cartModalContainer = shadowRoot!.querySelector<HTMLDivElement>('.cart-container')!;
                containerIconCart.removeChild(quantityBuy);
                const containerProduct = cartModalContainer.querySelector('.container-product-and-price')!;
                cartModalContainer.removeChild(containerProduct);
                const cartEmpty = (getTemplate('.template-cart') as HTMLDivElement).querySelector('.cart-content')!;
                cartModalContainer.appendChild(cartEmpty);
                return;
            }
            const para = quantityBuy.querySelector<HTMLParagraphElement>('p');
            para!.textContent = this.count.toString();
            if (cartContainerPrice) {
                this.updatePriceProduct(cartContainerPrice);
            }
            return;
        }

        const cartModalContainer = shadowRoot!.querySelector<HTMLDivElement>('.cart-container')!;
        if (cartModalContainer) {
            const cartContent = cartModalContainer.querySelector('.cart-content');
            if (cartContent) {
                cartModalContainer.removeChild(cartContent);
                const containerTotal = getTemplate('.template-total') as HTMLDivElement;
                containerTotal.querySelector('.container-price-product')!.insertAdjacentHTML('beforeend', templatePrice(this.count));
                this.updatePriceProduct(containerTotal);
                cartModalContainer.appendChild(containerTotal);
            }
        }

        const templateContent = getTemplate('.template-buy-quantity')! as HTMLDivElement;
        const p = templateContent.querySelector('p')!;
        p.textContent = this.count.toString();
        containerIconCart.append(templateContent);
    }

    private updatePriceProduct(cartContainerPrice: HTMLDivElement) {
        const p = cartContainerPrice.querySelector<HTMLParagraphElement>('.price')!;
        const strong = cartContainerPrice.querySelector('strong')!;
        p.textContent = `$125.00 x ${this.count}`;
        strong.textContent = ` ${this.count * 125}.00`;
        p.append(strong);
    }

}

customElements.define('price-element', PriceElement);