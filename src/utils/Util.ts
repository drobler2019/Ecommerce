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