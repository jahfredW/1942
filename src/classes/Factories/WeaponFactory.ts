import SquareContainer from "../SquareContainer";
import Weapon from "../Entities/Weapon";

export default abstract class WeaponFactory {

    weaponOrder(weapon_type : string, container : SquareContainer){
        let weapon = this.weaponCreate(weapon_type);
        weapon.build(container);
        weapon.move();
    }

    abstract weaponCreate(weapon_type : string) : Weapon;
}