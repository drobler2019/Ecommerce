import './style.css';
import { HeaderElement } from './components/header/HeaderElement';
import { SidebarElement } from './components/sidebar/Sidebar';
import { TEMPLATE_TRANSPARENT, OPTIONS, TEMPLATE_NOTIFICATION, TEMPLATE_CART, TEMPLATE_PRICE_PRODUCT } from './utils/Util';
import { MainElement } from './components/main/MainElement';
import { PriceElement } from './components/sectionPrice/PriceElement';

const app = document.querySelector<HTMLDivElement>('#app')!;

(() => {
    app.insertAdjacentHTML('afterbegin', OPTIONS);
    app.insertAdjacentHTML('afterbegin', TEMPLATE_NOTIFICATION);
    app.insertAdjacentHTML('afterbegin', TEMPLATE_CART);
    app.insertAdjacentHTML('afterbegin', TEMPLATE_PRICE_PRODUCT);
    const sidebarElement = new SidebarElement();
    const headerElement = new HeaderElement(sidebarElement);
    const priceElement = new PriceElement(headerElement);
    const mainElement = new MainElement(priceElement);
    app.append(headerElement, sidebarElement, mainElement);
    app.insertAdjacentHTML('beforeend', TEMPLATE_TRANSPARENT);
})();
