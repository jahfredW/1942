import Bullet  from "./Bullet";
import Ship from "./Ship";
import Plane from "./Plane";
import IHtmlElementInterface from "./IHtmlElementInterface";


interface ContainerCoords {
    x : number,
    y : number
}


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
// interface squareDimensions {
//     width : number,
//     height : number
// } 


export default class SquareContainer implements IHtmlElementInterface {
    
    static shipList : Ship[] = [];
    static bulletList : Bullet[] = [];

    constructor( 
        private square : Plane = new Plane(),
        private coords : ContainerCoords = {x:0,y:0},
        private htmlElement : HTMLElement = document.querySelector('.container__square')!,
        private width : number = htmlElement.offsetWidth,
        private height : number = htmlElement.offsetHeight
        
        ) {
           
        }


    init(){
        this.height = this.htmlElement.offsetHeight;
        this.width = this.htmlElement.offsetWidth;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getCoords() : ContainerCoords {
        return this.coords;
    }

    getSquareCoords() : squareCoords {
        return this.square.getCoords();
    }

    setCoords(coords : ContainerCoords) : this {
        this.coords.x = coords.x;
        this.coords.y = coords.y;
        return this;
    }
    getHtmlElement() : HTMLElement {
        return this.htmlElement;
    }

    getBlob() : Plane {
        return this.square
    }
    
}
