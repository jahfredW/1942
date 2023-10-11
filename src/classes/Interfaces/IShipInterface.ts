import SquareContainer from "../SquareContainer";
import Plane from "../Entities/Plane";

/**
 * Interface pour la construction des bateaux 
 */
export default interface IEnnemyInterface {
    build(container : SquareContainer) : void;
    display(x : number) : void;
    move(vInit : number, accel : number) : void;
    getHtmlElement(): HTMLElement;
    shoot(squareContainer : SquareContainer, angle : number, timeStamp : number) : void 
    tryShoot(time : number, squareContainer: SquareContainer, plane : Plane) : void;
}