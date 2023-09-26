import SubMissile from "./SubMissile";

export default class ShootingManager {
    private lastShotTime: number = 0;
    private shootInterval: number; // en millisecondes
    
    constructor(shootInterval: number) {
        this.shootInterval = shootInterval;
    }
    
    // Méthode pour déterminer si un navire peut tirer
    canShoot(timestamp: number): boolean {
        if (!this.lastShotTime || timestamp - this.lastShotTime >= this.shootInterval) {
            this.lastShotTime = timestamp; // mettre à jour le moment du dernier tir
            return true;
        }
        return false;
    }

    // méthode pour détruire les tirs au bout d'un certains temps
    // missileTimeOut(timestamp: number) : boolean {
    //     // si le delta entre le temps écoulé global et le temps du dernier tri est supérieur à 3 secondes, 
    //     // alors on supprime le tir. 
    //     if(timestamp - this.lastShotTime >= 3000) {
    //         return true;
    // }
    // return false;
// }
}
