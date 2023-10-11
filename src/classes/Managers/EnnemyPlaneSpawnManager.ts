import SquareContainer from "../SquareContainer";
import ConcreteEnnemyPlaneFactory from "../Factories/ConcreteEnnemyPlaneFactory";

/**
 * permet de spawn les ennenies à intervales de temps définis
 */
export default class EnnemyPlaneSpawnManager {
    private lastTime: number = 0;
    private planesInSalvo: number = 0;
    private planeNumberInSalvo: number = 0;
    private x: number = 0;
    // private accumulatedTime: number = 0;
    private nextSpawnTime: { [key: string]: number } = {};
    private shipSpawnRate: { [key: string]: number } = {
      'plane1': 5000,
   
      // Ajoutez d'autres types de bateaux ici
    };
    private ennemyPlaneTypes: string[] = ['plane1'];

    // On définit les temps du prochain respawn à celui défini au départ : 
    // ( au départ 10s pour le cruiser et 6 s pour un sous-marin)
    constructor(private squareContainer: SquareContainer) {
        for (const shipType of this.ennemyPlaneTypes) {
            this.nextSpawnTime[shipType] = this.shipSpawnRate[shipType];
        }
        this.x = Math.floor(Math.random() * this.squareContainer.getWidth()) + 1
    }

    /**
     * La méthode update prend le timestamp de la fonction de callBack ( GameLoop ) , 
     * passée à requestAnimationFrame
     */
    
    update(timestamp: number): void {
    const deltaTime: number = timestamp - this.lastTime;
    this.lastTime = timestamp;

    let xRatioValue = [0, 20, -20]

    for (const planeType of this.ennemyPlaneTypes) {
        this.nextSpawnTime[planeType] -= deltaTime;

        if (this.nextSpawnTime[planeType] <= 0) {
            if (this.planeNumberInSalvo < 3) {

                const ennemyPlaneFactory = new ConcreteEnnemyPlaneFactory();
                ennemyPlaneFactory.planeOrder(planeType, this.squareContainer, this.x + xRatioValue[this.planeNumberInSalvo]);
                this.planesInSalvo++;
                this.planeNumberInSalvo++;

                // Calculez le délai d'attente pour le prochain avion dans la série
                // en ajoutant un décalage (par exemple, 1 seconde) au délai de spawn.
                this.nextSpawnTime[planeType] += 1000; // Ajoutez 1 seconde de décalage.
            } else {
                // Tous les avions dans la série de 3 ont été générés,
                // réinitialisez le délai de respawn et le numéro de l'avion dans la série.
                this.nextSpawnTime[planeType] = this.shipSpawnRate[planeType];
                this.planeNumberInSalvo = 0; // Réinitialisez le numéro de l'avion dans la série.
                this.x = Math.floor(Math.random() * this.squareContainer.getWidth()) + 1
            }
        }
    }
}
}