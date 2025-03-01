import './style.css';
import { HeaderElement } from './components/header/HeaderElement';
import { SidebarElement } from './components/sidebar/Sidebar';
import { TEMPLATE_TRANSPARENT,OPTIONS } from './utils/Util';
import { MainElement } from './components/main/MainElement';

const app = document.querySelector<HTMLDivElement>('#app')!;

(() => {
    app.insertAdjacentHTML('afterbegin',OPTIONS);
    const sidebarElement = new SidebarElement();
    const headerElement = new HeaderElement(sidebarElement);
    const mainElement = new MainElement();
    app.append(headerElement, sidebarElement,mainElement);
    app.insertAdjacentHTML('beforeend', TEMPLATE_TRANSPARENT);
})();
