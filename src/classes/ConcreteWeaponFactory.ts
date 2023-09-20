import WeaponFactory from "./WeaponFactory";
import Missile from "./Missile";
import Bullet from "./Bullet";
import Weapon from "./Weapon";

export default class ConcreteWeaponFactory extends WeaponFactory {
    weaponCreate(bullet_type: string): Weapon {
        if (bullet_type === "bullet") {
            return new Bullet();
        } else if (bullet_type === "missile") {
            return new Missile();
        } else {
            throw new Error("ship type not found");
        }
    }
}