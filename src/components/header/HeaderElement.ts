import styles from './HeaderElement.css?raw';
import sneaker from '/logo/sneaker.svg';
import menu from '/logo/icon-menu.svg';
import cart from '/logo/icon-cart.svg';
import avatar from '/avatar/avatar.png';

export class HeaderElement extends HTMLElement {

    private readonly sheet = new CSSStyleSheet();

    connectedCallback(): void {
        const shadow = this.attachShadow({ mode: 'open' });
        this.initStyle(shadow);
        shadow.innerHTML = /* html */`
        <div class="container-icons"></div>
        <div class="container-user"></div>
        `;
        const { firstElementChild, lastElementChild } = shadow;
        firstElementChild!.append(this.getMenu(), this.getSneakers());
        lastElementChild!.append(this.getCart(), this.getAvatar());
    }

    private initStyle(shadow: ShadowRoot): void {
        this.sheet.replaceSync(styles);
        shadow.adoptedStyleSheets = [this.sheet];
    }

    private getSneakers(): HTMLImageElement {
        return this.getImg(sneaker, 'sneakers', 'logo zapatillas');
    }

    private getMenu(): HTMLImageElement {
        return this.getImg(menu, 'menu', 'logo menu');
    }

    private getCart(): HTMLImageElement {
        return this.getImg(cart, 'cart', 'logo cart');
    }

    private getAvatar(): HTMLImageElement {
        return this.getImg(avatar, 'avatar', 'avatar usuario')
    }

    private getImg(src: string, className: string, alt: string): HTMLImageElement {
        const img = document.createElement('img');
        img.src = src;
        img.className = className;
        img.alt = alt;
        return img;
    }

}

customElements.define('header-element', HeaderElement);