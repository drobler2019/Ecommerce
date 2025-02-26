export const TEMPLATE_TRANSPARENT =
    `<template class="container-template">
 <div class="bed-sheet" style="background-color: var(--transparent); inset:0; position: absolute;"></div>
</template>`;

export const getImg = (src: string, className: string, alt: string) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    img.alt = alt;
    return img;
}

export const addStyles = (shadow: ShadowRoot, styles: string): void => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    shadow.adoptedStyleSheets.push(sheet);
}