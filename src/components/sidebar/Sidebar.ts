import styles from './Sidebar.css?raw';
import { addStyles, getImg, getTemplate } from "../../utils/Util";
import close from "/logo/icon-close.svg";

export class SidebarElement extends HTMLElement {

    private shadow!: ShadowRoot;

    connectedCallback(): void {
        if (this.shadow) {
            return;
        }
        this.shadow = this.attachShadow({ mode: 'open' });
        addStyles(this.shadow, styles);
        this.shadow.appendChild(getTemplate('.container-options'));
        const { firstElementChild: containerSidebar } = this.shadow;
        if (containerSidebar) {
            containerSidebar.insertAdjacentElement('afterbegin', this.getClose());
            const close = containerSidebar.firstElementChild!;
            close.addEventListener('click', this);
        }
    }

    disconnectedCallback(): void {
        const bed = document.querySelector('.bed-sheet');
        if (bed) {
            document.body.removeChild(bed);
        }
    }

    handleEvent(): void {
        const bedSheet = document.querySelector('.bed-sheet');
        if (bedSheet) {
            document.body.removeChild(bedSheet);
        }
        addStyles(this.shadow!, ':host(sidebar-element) {transform: translateX(-300px)}');
        this.shadow!.adoptedStyleSheets = [];
        addStyles(this.shadow!, styles);
    }

    private getClose() {
        return getImg(close, 'close', 'icono cerrar');
    }
}

customElements.define('sidebar-element', SidebarElement);