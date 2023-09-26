import SquareContainer from "./SquareContainer";
import ShootingManager from "./ShootingManager";

export default class Game {

  static checkCollisions(timestamp: number, container: SquareContainer){
    Game.checkOutOfScreenBullets();
    Game.checkShipOutOfScreen(container);
    Game.checkBulletAndShipCollisions();
    Game.checkOutOfScreenMissiles(container);

  }

  static checkOutOfScreenBullets() {
  let bulletsToRemove: number[] = [];
  for (let j = 0; j < SquareContainer.bulletList.length; j++) {
    const bullet = SquareContainer.bulletList[j];
    const bulletRect = {
      x: bullet.getCoordX(),
      y: bullet.getCoordY(),
      width: bullet.getWidth(),
      height: bullet.getHeight(),
    };
    if (bulletRect.y <= 1) {
      bulletsToRemove.push(j);
    }
  }

  for ( let bullet of bulletsToRemove.reverse() ) {
    SquareContainer.bulletList[bullet].getHtmlElement().remove();
    SquareContainer.bulletList.splice(bullet, 1);
  }
}


static checkOutOfScreenMissiles(squareContainer: SquareContainer) {
  let missilesToRemove: number[] = [];
  for (let j = 0; j < SquareContainer.missileList.length; j++) {
    const missile = SquareContainer.missileList[j];
    const missileRect = {
      x: missile.getCoordX(),
      y: missile.getCoordY(),
      width: missile.getWidth(),
      height: missile.getHeight(),
    };
    if (missileRect.y <= 1 || missileRect.y >= squareContainer.getHeight() || missileRect.x >= squareContainer.getWidth() || missileRect.x <= 0
   ) {
      missilesToRemove.push(j);
    }
  }

  for ( let missile of missilesToRemove.reverse() ) {
    SquareContainer.missileList[missile].getHtmlElement().remove();
    SquareContainer.missileList.splice(missile, 1);
  }
}

  static checkShipOutOfScreen(container : SquareContainer): void {

    let shipsToRemove: number[] = [];

    for ( let i = 0; i < SquareContainer.shipList.length; i++ ) {
      const ship = SquareContainer.shipList[i];
      const shipRect = {
        x : ship.getCoordX(),
        y : ship.getCoordY(),
        width : ship.getWidth(),
        height :
         ship.getHeight()
      }

      // test si le ship sort de l'écran
      if (shipRect.y > container.getHeight() - shipRect.height) {
        shipsToRemove.push(i);
      }
    }

    for(let i of shipsToRemove) {
      SquareContainer.shipList[i].getHtmlElement().remove();
      SquareContainer.shipList.splice(i,1);

    }

    }

  // Gestion des collisions   
  static checkBulletAndShipCollisions() {
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

    
      // Pour chaque bullet dans le tableau
      for (let j = 0; j < SquareContainer.bulletList.length; j++) {
        const bullet = SquareContainer.bulletList[j];
        const bulletRect = {
          x: bullet.getCoordX(),
          y: bullet.getCoordY(), // Correction ici
          width: bullet.getWidth(),
          height: bullet.getHeight()
        };
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