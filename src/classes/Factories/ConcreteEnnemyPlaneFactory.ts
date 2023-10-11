import EnnemyPlaneFactory from "./EnnemyPlaneFactory";
import EnnemyPlane from "../Entities/EnnemyPlane";
import EnnemyPlane1 from "../Entities/EnnemyPlane1";


/**
 * 
 */
export default class ConcreteEnnemyPlaneFactory extends EnnemyPlaneFactory {
    planeCreate(ennemyPlane_type: string): EnnemyPlane {
        if (ennemyPlane_type === "plane1") {
            return new EnnemyPlane1();
        } else {
            throw new Error("ship type not found");
        }
    }
}