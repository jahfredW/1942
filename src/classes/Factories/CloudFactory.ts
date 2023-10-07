import SquareContainer from "../SquareContainer";
import Cloud from "../Entities/Cloud";

export default abstract class CloudFactory {
  cloudOrder(cloud_type: string, container: SquareContainer) {
    let cloud = this.shipCreate(cloud_type);
    cloud.build(container);
    cloud.move();
  }

  abstract shipCreate(cloud_type: string): Cloud;
}
