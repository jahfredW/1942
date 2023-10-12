export default class MovePattern {
  /**
   * permet de diriger un élement vers le bas
   * @param deltaTime
   * @param $target
   * @param $vInit
   * @param $acceleration
   *
   * return void
   */
  static goDown(deltaTime: number, entity: any): void {
    // récupération des coordonnées de l'entités
    console.log("deltaTime", deltaTime);
    let posY = entity.getCoordY();
    // --ship.vy = ship.vy + 0.5*dt
    //     ship.y = ship.y + ship.vy

    entity.vInit = entity.vInit + entity.acceleration * (deltaTime / 50);
    // mise à jour de la position couche métier

    posY += entity.vInit;

    entity.setCoordY(posY);

    console.log("posY", posY);
    // mise à jour de la postion ( couche html)
    // Mettez à jour la propriété CSS
    entity.getHtmlElement().style.setProperty("--y-position", `${posY}px`);
  }
}
