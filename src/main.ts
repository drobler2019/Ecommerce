import { HeaderElement } from './components/header/HeaderElement';
import { SidebarElement } from './components/sidebar/Sidebar';

import './style.css';
const app = document.querySelector<HTMLDivElement>('#app')!;

(() => {
    const sidebarElement = new SidebarElement();
    const headerElement = new HeaderElement(sidebarElement);
    app.append(headerElement, sidebarElement);
})();
