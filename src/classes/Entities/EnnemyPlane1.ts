import IShipInterface from "../Interfaces/IShipInterface";
import SquareContainer from "../SquareContainer";
import ConcreteWeaponFactory from "../Factories/ConcreteWeaponFactory";
import Bullet from "./Bullet";
import ShootingManager from "../Managers/ShootingManager";
import Plane from "./Plane";
import EnnemyPlane from "./EnnemyPlane";
import MovePattern from "../Gameplay/MovePattern";

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
interface squareDimensions {
  width: number;
  height: number;
}

/**
 * classe rectangle : classe abstraite qui permet de servir de base pour construire les rectangles,
 * en leur ajouter la classe 'rect' définie dans le fichier input.scss
 */
export default class EnnemyPlane1 extends EnnemyPlane {
  static allEnnemyPlane: EnnemyPlane[] = [];

  constructor() {
    super();
    this.shootingManager = new ShootingManager(300);
    this.acceleration = 1;
  }

  // Contruction du rectangle
  build(container: SquareContainer, x: number): void {
    this.htmlElement =
      document.querySelector<HTMLImageElement>(".ennemyPlane1")!;
    let containerElt = container.getHtmlElement();
    this.htmlElement = document.createElement("img");

    this.htmlElement.classList.add("ennemyPlane1");

    this.htmlElement.src = "/assets/ennemyPlanes/avion1.png";

    if (x != 0) {
      this.coords.x = x;
    } else {
      this.coords.x = Math.floor(Math.random() * container.getWidth()) + 1;
    }

    this.coords.y = 0;

    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);

    containerElt.appendChild(this.htmlElement);

    this.dimensions.width = this.htmlElement.offsetWidth;
    this.dimensions.height = this.htmlElement.offsetHeight;

    this.vInit = 1;
    this.acceleration = 0.3;

    SquareContainer.ennemyPlaneList.push(this);

    console.log(
      "dimensions conteneur",
      container.getWidth(),
      container.getHeight()
    );
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

  // affichage du rectangle en utlisant les propriétés CSS
  display(): void {
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
  }

  // récupération de l'élement html correspondant à ce rectangle
  getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  //récupération de lastTimeShot
  getLastTimeShot(): number {
    return this.lastShotTime;
  }

  setLastTimeShot(value: number): this {
    this.lastShotTime = value;
    return this;
  }

  move(deltaTime: number = 0): void {
    MovePattern.goDown(deltaTime, this);
  }

  tryShoot(
    timestamp: number,
    squareContainer: SquareContainer,
    plane: Plane
  ): void {
    if (this.shootingManager.canShoot(timestamp)) {
      // logique de tir ici, par exemple :
      let dx = plane.getCoords().x - this.getCoordX(); // suppose que `this.x` et `this.y` sont les coordonnées du navire
      let dy = plane.getCoords().y - this.getCoordY();
      let angle = Math.atan2(dy, dx);

      this.shoot(squareContainer, angle, timestamp);
    }
  }

  shoot(
    squareContainer: SquareContainer,
    angle: number,
    timeStamp: number
  ): void {
    let weaponfactory = new ConcreteWeaponFactory();
    let missile = weaponfactory.weaponCreate("missile");
    missile.setAngle(angle);
    missile.setCoord(this.coords.x - 4, this.coords.y); // Définir les coordonnées avant de construire
    missile.build(squareContainer);
    missile.setTimeStamp(timeStamp);
  }
}
