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
const VALUE_SNEAKERS = 125;

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

const getTemplate = (className: string): Node => {
  const template = document.querySelector<HTMLTemplateElement>(className)!;
  return template.content.cloneNode(true);
}

const templatePrice = (value: number) => `<p class="price">$125.00 x ${value} <strong>${value * VALUE_SNEAKERS}.00</strong></p>`;

const TEMPLATE_CART = /* html */`
<template class="template-cart">
   <div class="cart-container">
     <div><h4>Cart</h4></div>
     <div class="cart-content"><p>Your cart is empty</p></div>
   </div>
</template>
`;

const TEMPLATE_PRICE_PRODUCT = /*html*/`
 <template class="template-total">
   <div class="container-product-and-price">
       <div class="container-image-product">
          <img src="/img/image-product-1.jpg" />
          <div class="container-price-product">
              <p>Fall Limited Edition Sneakers</p>
         </div>
         <div class="container-icon"><img src="/logo/icon-delete.svg" /></div>
       </div>
       <button>Checkout</button>
   </div>
 </template>
`

export {
  TEMPLATE_TRANSPARENT,
  OPTIONS,
  MIN_SIZE_SCREEN_DESKTOP,
  TEMPLATE_NOTIFICATION,
  TEMPLATE_CART,
  TEMPLATE_PRICE_PRODUCT,
  getImg,
  addStyles,
  getTemplate,
  templatePrice
}