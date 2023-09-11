import SquareContainer from "./SquareContainer";

/**
 * Interface pour la construction des bateaux 
 */
export default interface IShipInterface {
    build(container : SquareContainer) : void;
    display(x : number) : void;
    move(vInit : number, accel : number) : void;
    getHtmlElement(): HTMLElement;
}