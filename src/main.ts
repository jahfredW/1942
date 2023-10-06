// imports

import SquareContainer from "./classes/SquareContainer";

import Plane from "./classes/Entities/Plane";

import SpawnManager from "./classes/Managers/SpawnManager";
import AnimationManager from "./classes/Managers/AnimationManager";
import Game from "./classes/Game";
import SubMissile from "./classes/Entities/SubMissile";

// fonction utilitaires

// traitement des évènements
function handleEvent(event: Event) {
  if (currentState === gameStatut.RUNNING) {
    plane.moveSquare(event, null, squareContainer);
  }
}

// traitement de la taille du device
const determinateDevice = (width: number) => {
  if (width <= 600) {
    return deviceType.MOBILE;
  }
  return deviceType.DESKTOP;
};

// Instanciation des éléments

const plane = new Plane();

const squareContainer = new SquareContainer();

// etat de la partie ( running ou paused) :
const gameStatut = {
  RUNNING: "running",
  PAUSED: "paused",
};

// taille de l"écran
const deviceType = {
  MOBILE: "mobile",
  DESKTOP: "desktop",
};

let currentState = gameStatut.RUNNING;
let currentType: null | string = null;

plane.build(squareContainer);

// récupération des éléments HTML correspondants à la classe

let lastTime = 0;
let spawnManager = new SpawnManager(squareContainer);

const helice = document.querySelector(".helice") as HTMLImageElement;
const animationManager = new AnimationManager(helice);

// main Game Loop
function gameLoop(timestamp: number): void {
  if (currentState === gameStatut.RUNNING) {
    // temps écoulé = temps total - temps dernière boucle
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Gestion du respawn des bateaux
    spawnManager.update(timestamp);

    // déplacement des bateaux
    for (const ship of SquareContainer.shipList) {
      ship.move(deltaTime);
      // Si le temps écoulé depuis le dernier tir est supérieur à 1000 ms, alors tirer

      ship.tryShoot(timestamp, squareContainer, plane); // Mettre à jour le moment du dernier tir
    }

    // déplacement des missiles
    for (const bullet of SquareContainer.bulletList) {
      // Assume BulletList est le tableau contenant toutes vos instances de Bullet
      bullet.move(deltaTime);
    }

    for (const missile of SquareContainer.missileList) {
      // Assume BulletList est le tableau contenant toutes vos instances de Bullet
      if (missile instanceof SubMissile) {
        missile.seekAndDestroy2(deltaTime, squareContainer, plane);
      } else {
        missile.seekAndDestroy(deltaTime, squareContainer, plane);
      }
      missile.checkTTL(timestamp);
    }
    // Gestion des collisions
    Game.checkCollisions(timestamp, squareContainer, plane);
    // Mettez ici le code pour créer des bateaux, etc.
    // Vous pouvez utiliser deltaTime pour ajuster le timing

    // gestion des animations de l'hélice
    // Gestion des animations de l'hélice

    animationManager.animate(timestamp);

    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);

// Global Events

// factorisation des events :

const events = ["keydown", "mousedown", "mousemove", "mouseup"];

console.log(currentType);
events.forEach((event) => {
  document.addEventListener(event, function (e) {
    if (currentType === deviceType.DESKTOP) {
      handleEvent(e);
    }
  });
});

// gestion des evenements pour le format mobile

// evts bindés sur l'avion pour le mode mobile.
plane
  .getHtmlElement()
  .addEventListener("touchstart", (e) =>
    plane.moveSquare(e, null, squareContainer)
  );
document.addEventListener("touchstart", (e) =>
  plane.moveSquare(e, null, squareContainer)
);
plane
  .getHtmlElement()
  .addEventListener("touchmove", (e) =>
    plane.moveSquare(e, null, squareContainer)
  );

// document.addEventListener('keydown', (e) => plane.moveSquare(e, null, squareContainer));
// document.addEventListener('mousedown', (e) => {
//   if(currentState === gameStatut.RUNNING) {
//   plane.moveSquare(e, null, squareContainer)
// }});

// document.addEventListener('mousemove', (e) => plane.moveSquare(e, null, squareContainer));
// document.addEventListener('mouseup', (e) => plane.moveSquare(e, null, squareContainer));

// plus tard ajout du gyroscope.
window.addEventListener("deviceorientation", (e) =>
  plane.moveSquare(e, null, squareContainer)
);

// on met un eventListener de resize sur le conteneur pour mettre à jours ses dimensions en temps réel
const element = squareContainer.getHtmlElement();
if (element) {
  const resizeObserver = new ResizeObserver((entries) => {
    let container_height = entries[0].contentRect.height;
    let container_width = entries[0].contentRect.width;

    squareContainer.setWidth(container_width);
    squareContainer.setHeight(container_height);

    currentType = determinateDevice(container_width);

    console.log(currentType);
    // for (let entry of entries) {
    //   // Vous pouvez inspecter 'entry' pour plus d'informations sur les changements de taille.
    //   console.log(entry.contentRect.width, entry.contentRect.height);
    // }
  });
  resizeObserver.observe(element);
}
