import Bullet from "./Bullet";
import Shape  from "./Shape";
import SquareContainer from "./SquareContainer";
import IHtmlElementInterface from "./IHtmlElementInterface";
import ConcreteWeaponFactory from "./ConcreteWeaponFactory";


/**
 * Interface coordonnées du carré 
 */
interface squareCoords {
    x : number,
    y : number
}


export default class Plane extends Shape implements IHtmlElementInterface  {
    static readonly DEFAULT_WIDTH = 50;
    static readonly DEFAULT_HEIGHT = 50;
    static isDragging = false;
    static startX = 0;
    static startY = 0;
    static initialX = 0; 
    static initialY = 0;


    constructor(
        
        private bulletContainer : Bullet[] = [] // tableau d'objets bullets
        
    ){  
        super();
        // this.bullet = new Bullet(super.coords);  
        this.htmlElement = document.createElement('img');
        // this.animateSquare();
    }
    

    display(posX : number, posY : number){
        this.htmlElement.style.setProperty("--x-position", `${posX}px`);
        this.htmlElement.style.setProperty("--y-position", `${posY}px`);
    }

    build(container : SquareContainer){
        this.htmlElement.classList.add("square");
        this.htmlElement.src = "/assets/plane/plane.png"
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        container.getHtmlElement().appendChild(this.htmlElement);
        
    }

    getWidth(): number {
        return this.htmlElement.width;
    }

    shoot(squareContainer : SquareContainer) : void {
        let weaponfactory = new ConcreteWeaponFactory();
        let bullet = weaponfactory.weaponCreate("bullet");
        
        bullet.setCoord(this.coords.x + 12, this.coords.y);  // Définir les coordonnées avant de construire
        bullet.build(squareContainer);
        this.bulletContainer.push(bullet);
        bullet.move();
    }
    

    getCoords() : squareCoords {
        return this.coords;
    }

    getHtmlElement() : HTMLElement {
        return this.htmlElement;
    }


    moveSquare(e :  Event, button: HTMLElement | null, squareContainer: SquareContainer)  : void {
       
                // mise à jour des positions du Blob ET de son tir Bullet 
                    // let posX = this.htmlElement.offsetLeft;
                    // let posY = this.htmlElement.offsetTop;
                    
                    if (e instanceof MouseEvent) {
                        e.preventDefault();
                        if(button){
                            switch (button.getAttribute('data-button')) {
                                case "right":
                                    this.coords.x += 10;
                                    
                                    break;
                                case "left":
                                    this.coords.x -= 10;
                                
                                    break;
                                case "down":
                                    this.coords.y+= 10;
                                
                                    break;
                                case "up":
                                    this.coords.y -= 10;
                                 
                                    break;
                        }
                        } else {
                            // if (e.type === 'mousedown') {
                            //     // Blob.isDragging = true;
                            //     // Blob.startX = e.clientX;
                            //     // Blob.startY = e.clientY;
                            //     // Blob.initialX = this.coords.x;
                            //     // Blob.initialY = this.coords.y;
                            // }
                            if (e.type === 'mousemove' ) {   // &Blob.isDragging
                                // ici on récupère la position de la souris. 
                                const dx = e.clientX - 20 - this.coords.x;
                                const dy = e.clientY - 20 - this.coords.y;
                                this.coords.x = this.coords.x + dx;
                                this.coords.y = this.coords.y + dy;
                            }
                            if (e.type === 'mousedown') {
                                this.shoot(squareContainer)
                            }
                        }
                        
                } else if (e instanceof KeyboardEvent) {
                    switch (e.key) {
                        case "ArrowRight":
                    
                            this.coords.x += 10;
                            break;
                        case "ArrowLeft":
                      
                            this.coords.x -= 10;
                            break;
                        case "ArrowDown":
                     
                            this.coords.y += 10;
                            break;
                        case "ArrowUp":
                            this.coords.y -= 10;
                            break;
                        case " ":
                            this.shoot(squareContainer);  
                    }
           

                

                // this.display(posX, posY)
                
    }
    // Limite les positions à l'intérieur du conteneur
    let containerWidth = squareContainer.getHtmlElement()?.getBoundingClientRect().width || 0;
    let containerHeigth = squareContainer.getHtmlElement()?.getBoundingClientRect().height || 0;
    this.coords.x = Math.min(Math.max(this.coords.x, 0), containerWidth - 50);
    this.coords.y = Math.min(Math.max(this.coords.y, 0), containerHeigth - 50);  // Peut-être utiliser containerHeight ici ?
    

    
    // Applique les nouvelles positions
    this.htmlElement.style.left = `${this.coords.x}px`;
    this.htmlElement.style.top = `${this.coords.y}px`;
    
}
}