import ShipFactory from "./ShipFactory";
import Ship from "../Entities/Ship";
import Submarine from "../Entities/Submarine";
import Cruiser from "../Entities/Cruiser";

/**
 * 
 */
export default class ConcreteEnnemyShipFactory extends ShipFactory {
    shipCreate(ship_type: string): Ship {
        if (ship_type === "cruiser") {
            return new Cruiser();
        } else if (ship_type === "submarine") {
            return new Submarine();
        } else {
            throw new Error("ship type not found");
        }
    }
}