import SquareContainer from "./SquareContainer";
import ConcreteEnnemyShipFactory from "./ConcreteEnnemyShipFactory";

/**
 * permet de spawn les ennenies à intervales de temps définis
 */
export default class SpawnManager {
    private lastTime: number = 0;
    // private accumulatedTime: number = 0;
    private nextSpawnTime: { [key: string]: number } = {};
    private shipSpawnRate: { [key: string]: number } = {
      'cruiser': 3000,
      'submarine': 8000,
      // Ajoutez d'autres types de bateaux ici
    };
    private shipTypes: string[] = ['cruiser', 'submarine'];

    // On définit les temps du prochain respawn à celui défini au départ : 
    // ( au départ 10s pour le cruiser et 6 s pour un sous-marin)
    constructor(private squareContainer: SquareContainer) {
        for (const shipType of this.shipTypes) {
            this.nextSpawnTime[shipType] = this.shipSpawnRate[shipType];
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

        for (const shipType of this.shipTypes) {
            // pour chaque bateau on réduit le delta du temps de respawn 
            this.nextSpawnTime[shipType] -= deltaTime;

            if (this.nextSpawnTime[shipType] <= 0) {
                // si le temps de res est egale à 0, on produit le bateau 
                console.log("Spawning", shipType);
                // on réinitialise le temps de respawn 
                this.nextSpawnTime[shipType] = this.shipSpawnRate[shipType];
                const shipFactory = new ConcreteEnnemyShipFactory();
                shipFactory.shipOrder(shipType, this.squareContainer);
            }
        }
    }
}