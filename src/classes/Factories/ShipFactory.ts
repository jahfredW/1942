import SquareContainer from "../SquareContainer";
import Ship from "../Entities/Ship";

export default abstract class ShipFactory {

    shipOrder(ship_type : string, container : SquareContainer){
        let ship = this.shipCreate(ship_type);
        ship.build(container);
        ship.display();
        ship.move();
    }

    abstract shipCreate(ship_type : string) : Ship
}