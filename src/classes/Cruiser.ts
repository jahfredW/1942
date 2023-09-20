import Ship from "./Ship";
import SquareContainer from "./SquareContainer";

export default class Cruiser extends Ship {
    // Contruction du rectangle
    constructor(){
        super();
    }

    // Surcharge de la méthode build
    build(container: SquareContainer): void {
        let containerElt = container.getHtmlElement();
        this.htmlElement = document.createElement("img");

        this.htmlElement.classList.add("rect");

        this.htmlElement.src =  "/assets/cruiser/ship.png";
        this.coords.x =  Math.floor(Math.random() * 1000) + 1; ;
        this.coords.y = 0;

        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    
        containerElt.appendChild(this.htmlElement);

        this.dimensions.width = this.htmlElement.offsetWidth;
        this.dimensions.height = this.htmlElement.offsetHeight;
        
        console.log(getComputedStyle(this.htmlElement).getPropertyValue("width"));
    // stcokage des instances des objets dans sqaureContainer 
    
    
  }
}