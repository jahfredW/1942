import SquareContainer from "../SquareContainer";
import ConcreteCloudFactory from "../Factories/ConcreteCloudFactory";

/**
 * permet de spawn les ennenies à intervales de temps définis
 */
export default class CloudSpawnManager {
    private lastTime: number = 0;
    // private accumulatedTime: number = 0;
    private nextSpawnTime: { [key: string]: number } = {};
    private shipSpawnRate: { [key: string]: number } = {
      'cloud1': 2000,
      'cloud2': 4000,
      // Ajoutez d'autres types de nuages ici
    };
    private cloudTypes: string[] = ['cloud1', 'cloud2'];

    // On définit les temps du prochain respawn à celui défini au départ : 
    // ( au départ 10s pour le cruiser et 6 s pour un sous-marin)
    constructor(private squareContainer: SquareContainer) {
        for (const cloudType of this.cloudTypes) {
            this.nextSpawnTime[cloudType] = this.shipSpawnRate[cloudType];
        }
    }

    /**
     * La méthode update prend le timestamp de la fonction de callBack ( GameLoop ) , 
     * passée à requestAnimationFrame
     */
    
    update(timestamp: number): void {
        // mise à jour du deltatime : différence entre le temps global passé - le temps  à la denrirèe exectution de update
        // à la première itération il sera 0. 
        const deltaTime: number = timestamp - this.lastTime;
        // attribution du temps global au nouveau lastime 
        this.lastTime = timestamp;
        // incrémentation du temps accumulé ( c'est juste l'ajout successif des deltas)
        // this.accumulatedTime += deltaTime; // PAS UTILE ICI 

        for (const cloudType of this.cloudTypes) {
            // pour chaque bateau on réduit le delta du temps de respawn 
            this.nextSpawnTime[cloudType] -= deltaTime;

            if (this.nextSpawnTime[cloudType] <= 0) {
                // si le temps de res est egale à 0, on produit le bateau 
                // on réinitialise le temps de respawn 
                this.nextSpawnTime[cloudType] = this.shipSpawnRate[cloudType];
                const shipFactory = new ConcreteCloudFactory();
                shipFactory.cloudOrder(cloudType, this.squareContainer);
            }
        }
    }
}