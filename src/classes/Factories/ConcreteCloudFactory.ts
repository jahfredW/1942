import CloudFactory from "./CloudFactory";
import Cloud from "../Entities/Cloud";
import Cloud1 from "../Entities/Cloud1";
import Cloud2 from "../Entities/Cloud2";



/**
 * 
 */
export default class ConcreteCloudFactory extends CloudFactory {
    cloudCreate(cloud_type: string): Cloud {
        if (cloud_type === "cloud1") {
            return new Cloud1();
        } else if (cloud_type === "cloud2") {
            return new Cloud2();
        } else {
            throw new Error("ship type not found");
        }
    }
}