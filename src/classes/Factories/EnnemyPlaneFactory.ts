import SquareContainer from "../SquareContainer";
import EnnemyPlane from "../Entities/EnnemyPlane";

export default abstract class EnnemyFactory {

    planeOrder(ennemyPlane_type : string, container : SquareContainer, x: number = 0){
        let ennemyPlane = this.planeCreate(ennemyPlane_type, x);
        ennemyPlane.build(container, x);
        ennemyPlane.display();
        ennemyPlane.move();
    }

    abstract planeCreate(ennemyPlane_type : string, x: number) : EnnemyPlane
}