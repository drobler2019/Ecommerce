import { cleanModal, getTemplate, templatePrice } from '../../utils/Util';
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
        const button = this.querySelector('button')!;
        plus.addEventListener('click', this);
        minus.addEventListener('click', this);
        button.addEventListener('click', this);
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
            } else if (img.alt.includes('minus')) {
                if (this.count === 0) {
                    return;
                }
                this.count--;
                this.addNumber();
            } else if(img.alt.includes('cart')) {
                this.eventAddProductToCart(element);
            }
        } else if (element instanceof HTMLButtonElement) {
          this.eventAddProductToCart(element);
        }
    }

    private eventAddProductToCart(element: HTMLButtonElement | HTMLImageElement) : void {
        if(element instanceof HTMLImageElement) {
            const img = element as HTMLImageElement;
            if(img.alt.includes('cart')) {
                 this.addProductToCart();
            }
            return;
        }
        this.addProductToCart();
    }

    private addProductToCart() : void {
        const { shadowRoot } = this.headerElement;
        const containerIconCart = shadowRoot!.querySelector<HTMLDivElement>('.icon-cart')!;
        const quantityBuy = containerIconCart.querySelector<HTMLDivElement>('.quantity-buy');
        if (this.count === 0) {
            if (quantityBuy) {
                this.deleteProductOfModal(shadowRoot!, containerIconCart, quantityBuy);
            }
            return;
        }
        if (quantityBuy) {
            quantityBuy.firstElementChild!.textContent = this.count.toString();
            const cartModalContainer = shadowRoot!.querySelector<HTMLDivElement>('.cart-container')!;
            if (cartModalContainer) {
                const containerProduct = cartModalContainer.querySelector<HTMLDivElement>('.container-product-and-price');
                if (containerProduct) {
                    this.updatePriceProduct(containerProduct);
                }
            }
            return;
        }
        const templateContent = getTemplate('.template-buy-quantity')! as HTMLDivElement;
        const paragraph = templateContent.querySelector<HTMLParagraphElement>('p')!;
        paragraph.textContent = this.count.toString();
        containerIconCart.appendChild(templateContent);
        this.addProductToModal(shadowRoot!);
    }

    private addNumber(): void {
        const quantityProducts = this.querySelector('.quantity')!;
        quantityProducts.textContent = this.count.toString();
    }

    private deleteProductOfModal(shadowRoot: ShadowRoot, containerIconCart: HTMLDivElement, quantityBuy: HTMLDivElement): void {
        const cartModalContainer = shadowRoot!.querySelector<HTMLDivElement>('.cart-container');
        containerIconCart.removeChild(quantityBuy);
        if (cartModalContainer) {
            const containerProduct = cartModalContainer.querySelector('.container-product-and-price')!;
            cartModalContainer.removeChild(containerProduct);
            const cartEmpty = (getTemplate('.template-cart') as HTMLDivElement).querySelector('.cart-content')!;
            cartModalContainer.appendChild(cartEmpty);
        }
    }

    private addProductToModal(shadowRoot: ShadowRoot): void {
        const cartModalContainer = shadowRoot!.querySelector<HTMLDivElement>('.cart-container')!;
        if (cartModalContainer) {
            const cartContent = cartModalContainer.querySelector('.cart-content');
            if (cartContent) {
                cartModalContainer.removeChild(cartContent);
                const containerTotal = getTemplate('.template-total') as HTMLDivElement;
                containerTotal.querySelector('.container-price-product')!.insertAdjacentHTML('beforeend', templatePrice(this.count));
                this.updatePriceProduct(containerTotal);
                cartModalContainer.appendChild(containerTotal);
                cleanModal(cartModalContainer);
            }
        }
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