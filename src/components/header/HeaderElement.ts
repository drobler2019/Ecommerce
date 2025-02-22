import styles from './HeaderElement.css?raw';
import sneaker from '/logo/sneaker.svg';
import menu from '/logo/icon-menu.svg';
import cart from '/logo/icon-cart.svg';
import avatar from '/avatar/avatar.png';
import { getImg } from '../../utils/Util';

export class HeaderElement extends HTMLElement {

    private readonly sheet = new CSSStyleSheet();

    connectedCallback(): void {
        const shadow = this.attachShadow({ mode: 'open' });
        this.initStyle(shadow);
        shadow.innerHTML = /* html */`
        <div class="header-container">
           <div class="container-icons"></div>
           <div class="container-user"></div>
        </div>`
        const { firstElementChild: headerContainer } = shadow;
        const { firstElementChild: containerIcons, lastElementChild: containerUser } = headerContainer!;
        containerIcons!.append(this.getMenu(), this.getSneakers());
        containerUser!.append(this.getCart(), this.getAvatar());
        console.log(headerContainer)
    }

    private initStyle(shadow: ShadowRoot): void {
        this.sheet.replaceSync(styles);
        shadow.adoptedStyleSheets = [this.sheet];
    }

    private getSneakers(): HTMLImageElement {
        return getImg(sneaker, 'sneakers', 'logo zapatillas');
    }

    private getMenu(): HTMLImageElement {
        return getImg(menu, 'menu', 'logo menu');
    }

    private getCart(): HTMLImageElement {
        return getImg(cart, 'cart', 'logo cart');
    }

    private getAvatar(): HTMLImageElement {
        return getImg(avatar, 'avatar', 'avatar usuario')
    }

}

customElements.define('header-element', HeaderElement);