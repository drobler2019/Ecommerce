export const getImg = (src: string, className: string, alt: string) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    img.alt = alt;
    return img;
}