import { HeaderElement } from './components/header/HeaderElement';

import './style.css';
const app = document.querySelector<HTMLDivElement>('#app')!;

(() => {
    const headerElement = new HeaderElement();
    app.append(headerElement);
})();
