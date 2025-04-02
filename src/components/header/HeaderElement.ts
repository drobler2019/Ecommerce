import styles from './HeaderElement.css?raw';
import sneaker from '/logo/sneaker.svg';
import menu from '/logo/icon-menu.svg';
import { addStyles, cleanModal, getImg, getTemplate, MIN_SIZE_SCREEN_DESKTOP, templatePrice } from '../../utils/Util';
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
          <div class="container-user">
              <div class="icon-cart">
                <img src="/logo/icon-cart.svg" alt="icon-cart"/>
              </div>
              <div class="icon-avatar">
                <img src="/avatar/avatar.png" alt="icon-avatar" />
              </div>
          </div>
        </div>`
        const { firstElementChild: headerContainer } = shadow;
        const { firstElementChild: layoutIcoins, lastElementChild: layoutUser } = headerContainer!;
        const { firstElementChild: containerIcons } = layoutIcoins!;
        containerIcons!.append(this.getMenu(), this.getSneakers());
        const menu = containerIcons!.firstElementChild!;
        const containerCart = layoutUser!.querySelector<HTMLDivElement>('.icon-cart')!;
        containerCart.addEventListener('click', this);
        menu.addEventListener('click', this);
        window.addEventListener('resize', this);
        window.addEventListener('DOMContentLoaded', this);
    }

    handleEvent(event: Event): void {

        if (event.type === 'DOMContentLoaded') {
            if (innerWidth > MIN_SIZE_SCREEN_DESKTOP) {
                if (this.app && this.app.querySelector('sidebar-element')) {
                    const icon = this.shadowRoot!.querySelector('.menu')!;
                    this.app.removeChild(this.sidebar);
                    this.shadowRoot!.querySelector('.container-icons')?.removeChild(icon);
                    this.addOptionsMenuDesktop();
                }
            }
        }

        if (event.type === 'resize') {
            if (innerWidth < MIN_SIZE_SCREEN_DESKTOP && !this.status) {
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
            if (innerWidth > MIN_SIZE_SCREEN_DESKTOP && this.status) {
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
            const element = event.target as HTMLElement;
            if (element instanceof HTMLDivElement) {
                const containerIcon = element as HTMLDivElement;
                if (containerIcon.className === 'icon-cart') {
                    this.addModal(containerIcon.lastElementChild);
                    return;
                }
                this.viewSidebar();
            } else if (element instanceof HTMLImageElement) {
                const img = element as HTMLImageElement;
                if (img.alt == 'icon-cart') {
                    this.addModal(img.nextElementSibling);
                    return;
                }
                this.viewSidebar();
            }

        }
    }

    private viewSidebar(): void {
        if (this.sidebar) {
            document.body.appendChild(getTemplate('.container-template'));
            const { shadowRoot } = this.sidebar;
            addStyles(shadowRoot!, ':host(sidebar-element) {transform: translateX(0)}');
        }
    }

    private addModal(element?: Element | null) {
        const { firstElementChild } = this.shadowRoot!;
        if (firstElementChild) {
            const modal = firstElementChild.querySelector('.cart-container');
            if (modal) {
                firstElementChild.removeChild(modal);
            } else {
                const templateContent = getTemplate('.template-cart') as HTMLDivElement;
                if (element) {
                    const { firstElementChild: cartContainer } = templateContent;
                    const child = cartContainer!.lastElementChild!;
                    cartContainer!.removeChild(child);
                    const containerTotal = getTemplate('.template-total') as HTMLDivElement;
                    containerTotal.querySelector('.container-price-product')!.insertAdjacentHTML('beforeend', templatePrice(parseInt(element.textContent!)));
                    templateContent.lastElementChild!.append(containerTotal);
                }
                firstElementChild.appendChild(templateContent);
                cleanModal(firstElementChild.querySelector('.cart-container'));
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

}

customElements.define('header-element', HeaderElement);