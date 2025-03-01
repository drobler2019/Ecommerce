import styles from './HeaderElement.css?raw';
import sneaker from '/logo/sneaker.svg';
import menu from '/logo/icon-menu.svg';
import cart from '/logo/icon-cart.svg';
import avatar from '/avatar/avatar.png';
import { addStyles, getImg, getTemplate } from '../../utils/Util';
import { SidebarElement } from '../sidebar/Sidebar';

export class HeaderElement extends HTMLElement {

    private app = document.querySelector('#app');
    private status = true;

    constructor(private sidebar: SidebarElement) {
        super();
    }

    connectedCallback(): void {
        const shadow = this.attachShadow({ mode: 'open' });
        addStyles(shadow, styles);
        shadow.innerHTML = /* html */`
        <div class="header-container">
          <div class="layout-icons">
            <div class="container-icons"></div>
          </div>
          <div class="container-user"></div>
        </div>`
        const { firstElementChild: headerContainer } = shadow;
        const { firstElementChild: layoutIcoins, lastElementChild: containerUser } = headerContainer!;
        const { firstElementChild: containerIcons } = layoutIcoins!;
        containerIcons!.append(this.getMenu(), this.getSneakers());
        containerUser!.append(this.getCart(), this.getAvatar());
        const menu = containerIcons!.firstElementChild!;
        menu.addEventListener('click', this);
        window.addEventListener('resize', this);
        window.addEventListener('DOMContentLoaded', this);
    }

    handleEvent(event: Event): void {

        if (event.type === 'DOMContentLoaded') {
            if (innerWidth > 768) {
                if (this.app && this.app.querySelector('sidebar-element')) {
                    const icon = this.shadowRoot!.querySelector('.menu')!;
                    this.app.removeChild(this.sidebar);
                    this.shadowRoot!.querySelector('.container-icons')?.removeChild(icon);
                    this.addOptionsMenuDesktop();
                }
            }
        }

        if (event.type === 'resize') {
            if (innerWidth < 768 && !this.status) {
                if (this.app && !this.app.querySelector('.sidebar-element')) {
                    this.app.append(this.sidebar);
                    const length = this.sidebar.shadowRoot!.adoptedStyleSheets.length;
                    this.getMenu().addEventListener('click', this);
                    const containerIcons = this.shadowRoot!.querySelector('.container-icons')!
                    containerIcons.insertAdjacentElement('afterbegin', this.getMenu());
                    const menu = containerIcons!.firstElementChild!;
                    menu.addEventListener('click', this);
                    if (length > 1) {
                        /*
                        cuando el componente sidebar está activado, y se destruye, elimina el último estilo css
                        que lo mantienen dentro de la ventana del navegador
                        */
                        this.sidebar.shadowRoot!.adoptedStyleSheets.pop();
                    }
                    const layoutIcons = this.shadowRoot!.querySelector('.layout-icons')!;
                    const optionsDesktop = layoutIcons.querySelector('.sidebar-container');
                    if (optionsDesktop) {
                        layoutIcons.removeChild(optionsDesktop);
                    }
                }
                this.status = true;
            }
            if (innerWidth > 768 && this.status) {
                if (this.app && this.app.querySelector('sidebar-element')) {
                    const icon = this.shadowRoot!.querySelector('.menu')!;
                    this.app.removeChild(this.sidebar);
                    this.shadowRoot!.querySelector('.container-icons')?.removeChild(icon);
                    this.addOptionsMenuDesktop();
                }
                this.status = false;
            }
        }

        if (event.type === 'click') {
            if (this.sidebar) {
                document.body.appendChild(getTemplate('.container-template'));
                const { shadowRoot } = this.sidebar;
                addStyles(shadowRoot!, ':host(sidebar-element) {transform: translateX(0)}');
            }
        }
    }

    private addOptionsMenuDesktop(): void {
        const containerOptions = document.querySelector<HTMLTemplateElement>('.container-options')!.content.cloneNode(true);
        const layoutIcons = this.shadowRoot!.querySelector('.layout-icons')!;
        layoutIcons.appendChild(containerOptions)

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