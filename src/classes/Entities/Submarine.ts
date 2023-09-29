import Ship from "./Ship";
import SquareContainer from "../SquareContainer";
import ShootingManager from "../Managers/ShootingManager";
import Plane from './Plane';
import ConcreteWeaponFactory from "../Factories/ConcreteWeaponFactory";

/**
 * Equipé de missile à têtes chercheuses. 
 */
export default class Submarine extends Ship {
    constructor(){
        super();
        // définition de la fréquence de tir grace au ShootingManager
        this.shootingManager = new ShootingManager(1000);
    }

    // Surcharge de la méthode build
    build(container: SquareContainer): void {
        // définition de la partie html de l'élément 
        let containerElt = container.getHtmlElement();
        this.htmlElement = document.createElement("img");

        this.htmlElement.classList.add("rect");

        this.htmlElement.src=  "/assets/submarine/ship.png";
        this.coords.x =  Math.floor(Math.random() * container.getWidth()) + 1; 
        this.coords.y = 0;

        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    
        containerElt.appendChild(this.htmlElement);

        this.dimensions.width = this.htmlElement.offsetWidth;
        this.dimensions.height = this.htmlElement.offsetHeight; 
    
  }
  /**
   * Méthode qui permet au bateau de tirer: 
   * - la méthode canShoot vérifie si le délai de tir est respecté 
   * - la méthode shoot effectue un tir en direction de la cible 
   * @param timestamp le timestamp global depuis le début du jeu 
   * @param squareContainer la "grille" de jeu 
   * @param plane l'objet avion
   */
  tryShoot(timestamp: number, squareContainer : SquareContainer, plane : Plane): void {
    if (this.shootingManager.canShoot(timestamp)) {
        // logique de tir ici, par exemple :
        let dx = plane.getCoords().x - this.getCoordX(); // suppose que `this.x` et `this.y` sont les coordonnées du navire
        let dy = plane.getCoords().y - this.getCoordY();
        let angle = Math.atan2(dy, dx);


        this.shoot(squareContainer, angle, timestamp);
    }
    }

    /**
     * méthode de shoot: effectue un tir en direction de la position de la cible.
     * @param squareContainer : l'aire de jeu
     * @param angle : l'angle vers la cible
     * @param timeStamp : le temps global passé depuis le début du jeu 
     */
  shoot(squareContainer: SquareContainer, angle : number, timeStamp: number): void {
    let weaponfactory = new ConcreteWeaponFactory();
    // commande d'un nouveau missile 
    let missile = weaponfactory.weaponCreate("subMissile");

    // mise à jour de propriété des l'objet missile lors du tir de ce dernier. 
    missile.setAngle(angle);
    missile.setCoord(this.coords.x - 4, this.coords.y);  // Définir les coordonnées avant de construire
    missile.build(squareContainer);
    missile.setTimeStamp(timeStamp);
    

  }
}