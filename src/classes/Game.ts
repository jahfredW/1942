import SquareContainer from "./SquareContainer";

export default class Game {

  // Gestion des collisions   
  static checkCollisions() {
    let shipsToRemove: number[] = [];
    let bulletsToRemove: number[] = [];

    // Pour chaque ship dans le tableau
    for (let i = 0; i < SquareContainer.shipList.length; i++) {

      const ship = SquareContainer.shipList[i];

      const shipRect = {
        x: ship.getCoordX(),
        y: ship.getCoordY(),
        width: ship.getWidth(),
        height: ship.getHeight(),
      };
      // si le bateau sort del'écran, on le supprime 
      // Sinon on gére 
      if(shipRect.y > 450){
            shipsToRemove.push(i);
      } 
      

      else {
         // Pour chaque bullet dans le tableau
      for (let j = 0; j < SquareContainer.bulletList.length; j++) {
        const bullet = SquareContainer.bulletList[j];
        const bulletRect = {
          x: bullet.getCoordX(),
          y: bullet.getCoordY(), // Correction ici
          width: bullet.getWidth(),
          height: bullet.getHeight()
        };
        // console.log( "bullet : ", bulletRect.x, bulletRect.y, bulletRect.width, bulletRect.height);
        // console.log("ship : ", shipRect.x, shipRect.y, shipRect.width, shipRect.height);
        console.log(SquareContainer.bulletList.length)
        console.log(SquareContainer.shipList.length)


        if(bulletRect.y <= 1){
            bulletsToRemove.push(j);
        }

        // Vérifier si une collision a lieu
        else if (
          shipRect.x < bulletRect.x + bulletRect.width &&
          shipRect.x + shipRect.width > bulletRect.x &&
          shipRect.y < bulletRect.y + bulletRect.height &&
          shipRect.y + shipRect.height > bulletRect.y
        ) {
          // Collision détectée, marquer le ship et la bullet pour suppression
          console.log("hit");
          shipsToRemove.push(i);
          bulletsToRemove.push(j);
        }

       
      }
      }

     
    }

    // Supprimer les éléments marqués
    for (let i of shipsToRemove.reverse()) {
      SquareContainer.shipList[i].getHtmlElement().remove();
      SquareContainer.shipList.splice(i, 1);
    }
    for (let j of bulletsToRemove.reverse()) {
      SquareContainer.bulletList[j].getHtmlElement().remove();
      SquareContainer.bulletList.splice(j, 1);
    }
  }
}