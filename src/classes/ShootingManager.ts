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
}