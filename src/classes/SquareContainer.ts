import Bullet from "./Entities/Bullet";
import Missile from "./Entities/Missile";
import Ship from "./Entities/Ship";
import Plane from "./Entities/Plane";
import Cloud from "./Entities/Cloud";
import IHtmlElementInterface from "./Interfaces/IHtmlElementInterface";

interface ContainerCoords {
  x: number;
  y: number;
}

/**
 * Interface coordonnées du carré
 */
interface squareCoords {
  x: number;
  y: number;
}

/**
 * interface dimensions du carré
 */
// interface squareDimensions {
//     width : number,
//     height : number
// }

/**
 * Représente la grille de jeu,
 * Contient les arrays d'ennemis et de projectiles
 * Sous forme de tableaux statiques.
 */
export default class SquareContainer implements IHtmlElementInterface {
  static shipList: Ship[] = [];
  static bulletList: Bullet[] = [];
  static missileList: Missile[] = [];
  static cloudList: Cloud[] = [];

  constructor(
    private square: Plane = new Plane(),
    private coords: ContainerCoords = { x: 0, y: 0 },
    private htmlElement: HTMLElement = document.querySelector(
      ".container__square"
    )!,
    private width: number = htmlElement.clientWidth,
    private height: number = htmlElement.clientHeight
  ) {}

  init() {
    this.height = this.htmlElement.clientHeight;
    this.width = this.htmlElement.clientWidth;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setWidth(newWidth: number) {
    this.width = newWidth;
  }

  setHeight(newHeight: number) {
    this.height = newHeight;
  }

  getCoords(): ContainerCoords {
    return this.coords;
  }

  getSquareCoords(): squareCoords {
    return this.square.getCoords();
  }

  setCoords(coords: ContainerCoords): this {
    this.coords.x = coords.x;
    this.coords.y = coords.y;
    return this;
  }
  getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  getBlob(): Plane {
    return this.square;
  }
}
