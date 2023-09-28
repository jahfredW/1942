// interface pour la méthode de récupération de l'élément HTML
export default interface IHtmlElementInterface<T = HTMLElement | NodeListOf<HTMLElement>>{
    getHtmlElement(): T;
}