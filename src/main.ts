import './style.css';
import { HeaderElement } from './components/header/HeaderElement';
import { SidebarElement } from './components/sidebar/Sidebar';
import { TEMPLATE_TRANSPARENT,OPTIONS } from './utils/Util';

const app = document.querySelector<HTMLDivElement>('#app')!;

(() => {
    app.insertAdjacentHTML('afterbegin',OPTIONS);
    const sidebarElement = new SidebarElement();
    const headerElement = new HeaderElement(sidebarElement);
    app.append(headerElement, sidebarElement);
    app.insertAdjacentHTML('beforeend', TEMPLATE_TRANSPARENT);
})();
