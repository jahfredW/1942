import Ship from "./Ship";
import SquareContainer from "./SquareContainer";
import ConcreteWeaponFactory from "./ConcreteWeaponFactory";
import Missile from "./Missile";
import ShootingManager from "./ShootingManager";

export default class Cruiser extends Ship {
    // Contruction du rectangle

    // tableau contenant les missiles tirés par les ennemis 
    private missileContainer : Missile[] = []

    constructor(){
        super();
        this.shootingManager = new ShootingManager(1000);
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

  tryShoot(timestamp: number, squareContainer : SquareContainer): void {
    if (this.shootingManager.canShoot(timestamp)) {
        // logique de tir ici, par exemple :
        this.shoot(squareContainer);
    }
    }

  shoot(squareContainer: SquareContainer): void {
    let weaponfactory = new ConcreteWeaponFactory();
    let missile = weaponfactory.weaponCreate("missile");
    
    missile.setCoord(this.coords.x - 4, this.coords.y);  // Définir les coordonnées avant de construire
    missile.build(squareContainer);
    this.missileContainer.push(missile);
    missile.move();
  }
}