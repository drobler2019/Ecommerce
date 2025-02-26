import styles from './Sidebar.css?raw';
import { addStyles, getImg } from "../../utils/Util";
import close from "/logo/icon-close.svg";

export class SidebarElement extends HTMLElement {

    connectedCallback(): void {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        addStyles(shadowRoot, styles);
        shadowRoot.innerHTML = /*html*/
            `<div class="sidebar-container">
              <ul>
                <li>Collections</li>
                <li>Men</li>
                <li>Women</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>`;
        const { firstElementChild: containerSidebar } = shadowRoot;
        if (containerSidebar) {
            containerSidebar.insertAdjacentElement('afterbegin', this.getClose());
            const close = containerSidebar.firstElementChild!;
            close.addEventListener('click', this);
        }

    }

    handleEvent(): void {
        addStyles(this.shadowRoot!, ':host(sidebar-element) {transform: translateX(-300px)}');
    }

    private getClose() {
        return getImg(close, 'close', 'icono cerrar');
    }
}

customElements.define('sidebar-element', SidebarElement);