import SquareContainer from "../SquareContainer";
import IHtmlElementInterface from "../Interfaces/IHtmlElementInterface";
import Shape from "./Shape";

/**
 * Classe représentant l'arme de l'avion
 */
export default class Helice extends Shape implements IHtmlElementInterface {
  constructor() {
    super();
  }

  // Contruction de la bullet en html
  build(): void {
    // this.htmlElement = document.querySelector<HTMLImageElement>(".helice")!;
    // let containerElt = container.getHtmlElement();
    let containerElt = document.querySelector(".container__square")!;
    console.log("container", containerElt);
    this.htmlElement = document.createElement("img");
    this.htmlElement.classList.add("helice");
    this.htmlElement.src = "../assets/plane/helice1.png";

    // this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    // this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);

    containerElt.appendChild(this.htmlElement);

    this.dimensions.width = this.htmlElement.offsetWidth;
    this.dimensions.height = this.htmlElement.offsetHeight;
  }

  getHtmlElement(): HTMLImageElement {
    return this.htmlElement;
  }

  setCoord(x: number, y: number): void {
    this.coords.x = x;
    this.coords.y = y;

    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
  }

  getCoord() {
    return { x: this.coords.x, y: this.coords.y };
  }

  getCoordX(): number {
    return this.coords.x;
  }

  getCoordY(): number {
    return this.coords.y;
  }

  getWidth(): number {
    return this.dimensions.width;
  }

  getHeight(): number {
    return this.dimensions.height;
  }
}
