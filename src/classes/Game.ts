import SquareContainer from "./SquareContainer";
import ShootingManager from "./Managers/ShootingManager";
import Plane from "./Entities/Plane";

export default class Game {
  static checkCollisions(
    timestamp: number,
    container: SquareContainer,
    plane: Plane
  ) {
    Game.checkOutOfScreenBullets();
    Game.checkShipOutOfScreen(container);
    Game.checkBulletAndShipCollisions();
    Game.checkOutOfScreenMissiles(container);
    Game.checkCollisionWithEnnemyBullet(plane, container);
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

    for (let bullet of bulletsToRemove.reverse()) {
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
      if (
        missileRect.y <= 1 ||
        missileRect.y >= squareContainer.getHeight() ||
        missileRect.x >= squareContainer.getWidth() ||
        missileRect.x <= 0
      ) {
        missilesToRemove.push(j);
      }
    }

    for (let missile of missilesToRemove.reverse()) {
      SquareContainer.missileList[missile].getHtmlElement().remove();
      SquareContainer.missileList.splice(missile, 1);
    }
  }
  // Gestion des bateaux en sortie d'affichage
  static checkShipOutOfScreen(container: SquareContainer): void {
    let shipsToRemove: number[] = [];

    for (let i = 0; i < SquareContainer.shipList.length; i++) {
      const ship = SquareContainer.shipList[i];
      const shipRect = {
        x: ship.getCoordX(),
        y: ship.getCoordY(),
        width: ship.getWidth(),
        height: ship.getHeight(),
      };

      // test si le ship sort de l'écran
      if (shipRect.y > container.getHeight() - shipRect.height) {
        shipsToRemove.push(i);
      }
    }

    for (let i of shipsToRemove) {
      if (SquareContainer.shipList[i]){
        SquareContainer.shipList[i].getHtmlElement().remove();
        SquareContainer.shipList.splice(i, 1);
      }
      
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
          height: bullet.getHeight(),
        };
        console.log(SquareContainer.bulletList.length);
        console.log(SquareContainer.shipList.length);

        if (bulletRect.y <= 1) {
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
      if (SquareContainer.shipList[i]){
        SquareContainer.shipList[i].getHtmlElement().remove();
        SquareContainer.shipList.splice(i, 1);
      }
      
    }
    for (let j of bulletsToRemove.reverse()) {
      if (SquareContainer.shipList[j]){
        SquareContainer.bulletList[j].getHtmlElement().remove();
        SquareContainer.bulletList.splice(j, 1);
      }
      
    }
  }

  // gestion des collisions entre l'avion et les missiles ennemis :
  static checkCollisionWithEnnemyBullet(
    plane: Plane,
    container: SquareContainer
  ) {
    let missilesToRemove = [];
    let missileList = SquareContainer.missileList;
  

    // récupération des caractéristiques HTML de l'avion .
    const planeHtml = {
      x: plane.getCoords().x,
      y: plane.getCoords().y,
      width: plane.getWidth(),
      height: plane.getHeight(),
    };
    for (let j = 0; j < missileList.length; j++) {
      // récupération des caractéristiques html du missile 
      let missile = missileList[j];
      const missileHtml= {
        x: missile.getCoordX(),
        y: missile.getCoordY(), // Correction ici
        width: missile.getWidth(),
        height: missile.getHeight(),
      };
      // parcours du tableau des missiles et gestion des collisions
      if (missileHtml.y <= 1 || missileHtml.y >= container.getHeight() || missileHtml.x <= 0 || missileHtml.x >= container.getWidth()) {
        missilesToRemove.push(j);
      }

      // Vérifier si une collision a lieu
      else if (
        planeHtml.x < missileHtml.x + ( missileHtml.width - missileHtml.width * 0.5) &&
        planeHtml.x + (planeHtml.width - planeHtml.width * 0.5) > missileHtml.x &&
        planeHtml.y < missileHtml.y + ( missileHtml.height - missileHtml.height * 0.5) &&
        planeHtml.y + (planeHtml.height + planeHtml.height * 0.5) > missileHtml.y
      ) {
        // Collision détectée, marquer le ship et la bullet pour suppression
        console.log("hit");
        missilesToRemove.push(j);
      }
    }
    // suppression des missiels de leur conteneur ( reverse )
    for (let i of missilesToRemove.reverse()) {
      if(SquareContainer.missileList[i]){
        SquareContainer.missileList[i].getHtmlElement().remove();
        SquareContainer.missileList.splice(i, 1);
      }
      
    }
  }
}
