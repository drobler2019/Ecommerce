import { getTemplate } from '../../utils/Util';
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
        if (quantityBuy) {
            if(this.count === 0) {
                containerIconCart.removeChild(quantityBuy);
                return;
            }
            const para = quantityBuy.querySelector<HTMLParagraphElement>('p');
            para!.textContent = this.count.toString();
            return;
        }
        const templateContent = getTemplate('.template-buy-quantity')! as HTMLDivElement;
        const p = templateContent.querySelector('p')!;
        p.textContent = this.count.toString();
        containerIconCart.append(templateContent);
    }

}

customElements.define('price-element', PriceElement);