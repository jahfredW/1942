

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
// Shape : classe abstraite qui permet de servir de base pour construire les éléments 
export default abstract class Shape {
    static DEFAULT_WIDTH : number = 50;
    static DEFAULT_HEIGHT : number = 50;
    protected coords : squareCoords = { x : 250, y : 430 };
    protected htmlElement : HTMLImageElement = document.querySelector<HTMLImageElement>('.rect')!
    protected dimensions : squareDimensions = { width : 5, height : 5};
    
}