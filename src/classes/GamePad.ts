import IHtmlElementInterface from "./IHtmlElementInterface";

export default class GamePad implements IHtmlElementInterface{
    constructor(
        private htmlElement : NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('[data-button]')!
    ){}

    getHtmlElement() : NodeListOf<HTMLElement> { 
        return this.htmlElement;
    }

    

}