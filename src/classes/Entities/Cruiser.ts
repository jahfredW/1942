import Ship from "./Ship";
import SquareContainer from "../SquareContainer";
import ConcreteWeaponFactory from "../Factories/ConcreteWeaponFactory";
import Missile from "./Missile";
import ShootingManager from "../Managers/ShootingManager";
import Plane from "./Plane";

export default class Cruiser extends Ship {
    // Contruction du rectangle

    // tableau contenant les missiles tirés par les ennemis 
    private missileContainer : Missile[] = []

    constructor(){
        super();
        // Ici on configure le taux de rechargement du tir à l'aide du shooting manager
        this.shootingManager = new ShootingManager(1000);
    }

    // Surcharge de la méthode build
    build(container: SquareContainer): void {
        let containerElt = container.getHtmlElement();
        this.htmlElement = document.createElement("img");

        this.htmlElement.classList.add("rect");

        this.htmlElement.src =  "/assets/cruiser/ship.png";
        this.coords.x =  (Math.floor(Math.random() * container.getWidth()) + 1); 
        this.coords.y = 0;

        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    
        containerElt.appendChild(this.htmlElement);

        this.dimensions.width = this.htmlElement.offsetWidth;
        this.dimensions.height = this.htmlElement.offsetHeight;

        console.log("dimensions conteneur", container.getWidth(), container.getHeight());
        
    
    
  }

  tryShoot(timestamp: number, squareContainer : SquareContainer, plane : Plane): void {
    if (this.shootingManager.canShoot(timestamp)) {
        // logique de tir ici, par exemple :
        let dx = plane.getCoords().x - this.getCoordX(); // suppose que `this.x` et `this.y` sont les coordonnées du navire
        let dy = plane.getCoords().y - this.getCoordY();
        let angle = Math.atan2(dy, dx);
     


        this.shoot(squareContainer, angle, timestamp);
    }
    }

  shoot(squareContainer: SquareContainer, angle : number, timeStamp: number): void {
    let weaponfactory = new ConcreteWeaponFactory();
    let missile = weaponfactory.weaponCreate("missile");
    missile.setAngle(angle);
    missile.setCoord(this.coords.x - 4, this.coords.y);  // Définir les coordonnées avant de construire
    missile.build(squareContainer);
    missile.setTimeStamp(timeStamp);
    

  }
}