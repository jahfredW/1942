import SquareContainer from "../SquareContainer";
import IHtmlElementInterface from "../Interfaces/IHtmlElementInterface";
import Cloud from "./Cloud";

/**
 * Classe représentant l'arme de l'avion
 */
export default class Cloud1 extends Cloud implements IHtmlElementInterface {
  constructor() {
    super();
  }

  // Contruction de la bullet en html
  build(container: SquareContainer): void {
    this.htmlElement = document.querySelector<HTMLImageElement>(".cloud1")!;
    let containerElt = container.getHtmlElement();
    this.htmlElement = document.createElement("img");
    this.htmlElement.classList.add("cloud1");

    this.htmlElement.src = "/assets/clouds/cloud1.png";

    // initialisation des coordonnées
    this.coords.x = Math.floor(Math.random() * container.getWidth()) + 1;
    this.coords.y = 0;

    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);

    // dimensions qui viennent du DOM, à récupérer après l'injection dans le DOM !!!!
    // this.dimensions.width = this.htmlElement.offsetWidth;
    // this.dimensions.height = this.htmlElement.offsetHeight;

    // ajout des bullets au tableau global.
    SquareContainer.cloudList.push(this);

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

  // méthode censée ajouter un peu de vent
  // A approfondir par la suite.
  move(deltaTime: number = 0): void {
    let vInit = 1;

    // Utilisez deltaTime pour rendre l'animation indépendante du taux de rafraîchissement
    this.coords.y += vInit * (deltaTime / 2);

    // Mettez à jour la propriété CSS ! TRES IMPORTANT
    if (this.htmlElement) {
      this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
      this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    }
  }
}
