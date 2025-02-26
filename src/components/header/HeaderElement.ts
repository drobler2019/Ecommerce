import styles from './HeaderElement.css?raw';
import sneaker from '/logo/sneaker.svg';
import menu from '/logo/icon-menu.svg';
import cart from '/logo/icon-cart.svg';
import avatar from '/avatar/avatar.png';
import { addStyles, getImg } from '../../utils/Util';
import { SidebarElement } from '../sidebar/Sidebar';

export class HeaderElement extends HTMLElement {

    constructor(private sideber: SidebarElement) {
        super();
    }

    connectedCallback(): void {
        const shadow = this.attachShadow({ mode: 'open' });
        addStyles(shadow, styles);
        shadow.innerHTML = /* html */`
        <div class="header-container">
           <div class="container-icons"></div>
           <div class="container-user"></div>
        </div>`
        const { firstElementChild: headerContainer } = shadow;
        const { firstElementChild: containerIcons, lastElementChild: containerUser } = headerContainer!;
        containerIcons!.append(this.getMenu(), this.getSneakers());
        containerUser!.append(this.getCart(), this.getAvatar());
        const menu = containerIcons!.firstElementChild!;
        menu.addEventListener('click', this);
    }

    handleEvent(): void {
        if (this.sideber) {
            const { shadowRoot } = this.sideber;
            addStyles(shadowRoot!, ':host(sidebar-element) {transform: translateX(0)}');
        }
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