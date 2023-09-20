import SquareContainer from "./SquareContainer";
import IHtmlElementInterface from "./IHtmlElementInterface";
import Weapon from "./Weapon";

export default class Missile extends Weapon implements IHtmlElementInterface  {

    constructor() {
          super();
    }

    // Contruction de la bullet en html
    build(container: SquareContainer): void {
        this.htmlElement = document.querySelector<HTMLImageElement>('.missile')!
        let containerElt = container.getHtmlElement();
        this.htmlElement = document.createElement("img");
        this.htmlElement.classList.add("missile");
        this.htmlElement.src = "/assets/SpaceGame/Projectiles/MachineGun01.png"
        
        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
        

        // dimensions qui viennent du DOM, à récupérer après l'injection dans le DOM !!!!
        // this.dimensions.width = this.htmlElement.offsetWidth;
        // this.dimensions.height = this.htmlElement.offsetHeight;

        
        console.log("this before pushing", this);  // Debugging line
        SquareContainer.missileList.push(this);
        console.log("SquareContainer after pushing", SquareContainer.bulletList);  // Debugging line

        containerElt.appendChild(this.htmlElement);

        this.dimensions.width = this.htmlElement.offsetWidth;
        this.dimensions.height = this.htmlElement.offsetHeight;
    }

    getHtmlElement(): HTMLImageElement {
        return this.htmlElement;
    }

    setCoord(x : number, y : number) : void {
        this.coords.x = x ;
        this.coords.y = y ;
    }

    getCoord(){
        return { "x" : this.coords.x, "y" : this.coords.y }
    }

    getCoordX() : number {
        return this.coords.x
    }

    getCoordY() : number {
        return this.coords.y
    }

    getWidth() : number  {
        return this.dimensions.width
    }

    getHeight() : number {
        return this.dimensions.height
    }

    move(deltaTime: number = 0): void {
    let vInit = 1;

    // Utilisez deltaTime pour rendre l'animation indépendante du taux de rafraîchissement
    this.coords.y -= vInit * (deltaTime / 5);

    // Appliquez les limites et supprimez si nécessaire
    // if (this.coords.y < 0) {
    //     this.htmlElement.classList.add("off");
    //     this.htmlElement.remove();
        
        // Supprimez cette instance de Bullet du tableau BulletList
    

    // Mettez à jour la propriété CSS
    if(this.htmlElement){
        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    }
    
}
}