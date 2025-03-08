const TEMPLATE_TRANSPARENT = /*html*/
    `<template class="container-template">
        <div class="bed-sheet" style="background-color: var(--transparent); inset:0; position: fixed;"></div>
    </template>`;

const OPTIONS = /*html*/ `
   <template class="container-options">
      <div class="sidebar-container">
              <ul>
                <li>Collections</li>
                <li>Men</li>
                <li>Women</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
     </div>
   </template>
`;

const TEMPLATE_NOTIFICATION = /* html */`
<template class="template-buy-quantity">
    <div class="quantity-buy">
      <p></p>
    </div>
</template>`;

const MIN_SIZE_SCREEN_DESKTOP = 768;

 const getImg = (src: string, className: string, alt: string) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    img.alt = alt;
    return img;
}

const addStyles = (shadow: ShadowRoot, styles: string): void => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    shadow.adoptedStyleSheets.push(sheet);
}

const getTemplate = (className: string) : Node => {
  const template = document.querySelector<HTMLTemplateElement>(className)!;
  return template.content.cloneNode(true);
}

export {
 TEMPLATE_TRANSPARENT,
 OPTIONS,
 MIN_SIZE_SCREEN_DESKTOP,
 TEMPLATE_NOTIFICATION,
 getImg,
 addStyles,
 getTemplate
}