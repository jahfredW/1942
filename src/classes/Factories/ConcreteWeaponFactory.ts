import WeaponFactory from "./WeaponFactory";
import Missile from "../Entities/Missile";
import Bullet from "../Entities/Bullet";
import Weapon from "../Entities/Weapon";
import SubMissile from "../Entities/SubMissile";

/**
 * classe Factory qui sert à instancier les nouvelles armes 
 */
export default class ConcreteWeaponFactory extends WeaponFactory {
    weaponCreate(bullet_type: string): Weapon {
        if (bullet_type === "bullet") {
            return new Bullet();
        } else if (bullet_type === "missile") {
            return new Missile();
        } else if (bullet_type === "subMissile") {
            return new SubMissile();
        }
        else {
            throw new Error("ship type not found");
        }
    }
}