import IEnnemyInterface from "../Interfaces/IShipInterface";
import SquareContainer from "../SquareContainer";
import ConcreteWeaponFactory from "../Factories/ConcreteWeaponFactory";
import Bullet from "./Bullet";
import ShootingManager from "../Managers/ShootingManager";
import Plane from "./Plane";



/**
 * Interface coordonnées du carré 
 */
interface squareCoords {
    x : number,
    y : number
}

/**
 * interface dimensions du carré 
 */
interface squareDimensions {
    width : number,
    height : number
} 

/**
 * classe rectangle : classe abstraite qui permet de servir de base pour construire les rectangles,
 * en leur ajouter la classe 'rect' définie dans le fichier input.scss
 */
export default class EnnemyPlane {
    static allEnnemyPlane : EnnemyPlane[] = [];

  constructor(
        protected coords : squareCoords = { x : 250, y : 430 },
        protected htmlElement : HTMLImageElement = document.querySelector<HTMLImageElement>('.ennemyPlane1')!,
        protected dimensions : squareDimensions = { width : 200, height : 57},
        protected lastShotTime : number = 0,
        protected shootingManager : ShootingManager = new ShootingManager(1000),
        protected acceleration : number = 1
  ) {
     
    
    
    
  }

  tryShoot(time : number, squareContainer: SquareContainer, plane : Plane)
  {}

  // Contruction du rectangle
  build(container: SquareContainer, x: number): void {
    SquareContainer.ennemyPlaneList.push(this);
  }

  getCoordX() : number {
    return this.coords.x;
  }

  getCoordY() : number {
    return this.coords.y;
  }

  getWidth() : number {
    return this.dimensions.width;
  }

  getHeight() : number {
    return this.dimensions.height;
  }

  // affichage du rectangle en utlisant les propriétés CSS 
  display(): void {
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    this.htmlElement.classList.add("ennemyPlane1");
    
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
    return this
  }

  move(deltaTime: number = 0): void {
    let acceleration = 1;
    let vInit = 1;

    // Utilisez deltaTime pour rendre l'animation indépendante du taux de rafraîchissement
    this.coords.y += vInit * acceleration * (deltaTime / 10);

    // Mettez à jour la propriété CSS
    this.htmlElement.style.setProperty(
        "--y-position",
        `${this.coords.y}px`
    );

  }


  shoot(squareContainer : SquareContainer, angle : number, timeStamp : number) : void {
    
}
}