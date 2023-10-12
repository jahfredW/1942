// imports

import SquareContainer from "./classes/SquareContainer";

import Plane from "./classes/Entities/Plane";

import SpawnManager from "./classes/Managers/SpawnManager";
import EnnemyPlaneSpawnManager from "./classes/Managers/EnnemyPlaneSpawnManager";
import CloudSpawnManager from "./classes/Managers/CloudSpawnManager";
import AnimationManager from "./classes/Managers/AnimationManager";
import Game from "./classes/Game";
import SubMissile from "./classes/Entities/SubMissile";

// mise en route de l'audio
const audio = new Audio("/audios/tom.mp3");
audio.loop = true; // Définissez la propriété loop sur true
// audio.play(); // Commencez la lecture audio

// const audio = document.querySelector("audio")!;

// récupération du bouton start :
const startButton = document.querySelector("#startButton");
startButton?.addEventListener("click", pauseGame);

// récupération du bouton pause :
const pauseButton = document.querySelector(".pause-icon");
pauseButton?.addEventListener("click", pauseGame);

// récupération du menu de pause.
const pauseMenu = document.querySelector(".pause-menu")!;

// fonction utilitaires

// traitement des évènements
function handleEvent(event: Event) {
  if (currentState === gameStatut.RUNNING) {
    plane.moveSquare(event, null, squareContainer);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    // Ici, vous pouvez ajouter le code à exécuter lorsque la touche Échap est enfoncée
    // Par exemple, pour mettre en pause le jeu, vous pouvez appeler la fonction pauseGame().
    pauseGame(); // Exemple
  }
});

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

let currentState = gameStatut.PAUSED;
let currentType: null | string = null;

let requestId: number;
let pausedTime = 0; // Ajoutez cette variable

plane.build(squareContainer);

// récupération des éléments HTML correspondants à la classe

let lastTime = 0;
let spawnManager = new SpawnManager(squareContainer);

let cloudManager = new CloudSpawnManager(squareContainer);

let ennemyPlaneSpawnManager = new EnnemyPlaneSpawnManager(squareContainer);

const helice = document.querySelector(".helice") as HTMLImageElement;
const animationManager = new AnimationManager(helice);

const adviceMenu = document.querySelector(".advice-menu") as HTMLElement;

let firstPlay = true;

setTimeout(() => {
  document.querySelector(".advice-menu");
}, 4000);

// main Game Loop
function gameLoop(timestamp: number): void {
  if (currentState === gameStatut.RUNNING) {
    if (pausedTime > 0) {
      // Si le jeu était en pause, ajustez lastTime
      lastTime += timestamp - pausedTime;
      pausedTime = 0; // Réinitialisez pausedTime
    }
    // Reste du code inchangé
    // ...

    // temps écoulé = temps total - temps dernière boucle
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Gestion du respawn des bateaux
    spawnManager.update(timestamp);

    // Gestion du respawn des avions ennemys
    ennemyPlaneSpawnManager.update(timestamp);

    // Gestion du respawn des nuages
    cloudManager.update(timestamp);
    // déplacement des bateaux
    for (const ship of SquareContainer.shipList) {
      ship.move(deltaTime);
      // Si le temps écoulé depuis le dernier tir est supérieur à 1000 ms, alors tirer

      ship.tryShoot(timestamp, squareContainer, plane); // Mettre à jour le moment du dernier tir
    }

    // déplacement des avions ennemy
    for (const eplane of SquareContainer.ennemyPlaneList) {
      eplane.move(deltaTime);
      // Si le temps écoulé depuis le dernier tir est supérieur à 1000 ms, alors tirer

      eplane.tryShoot(timestamp, squareContainer, plane); // Mettre à jour le moment du dernier tir
    }

    // déplacement des nuages
    for (const cloud of SquareContainer.cloudList) {
      // Assume BulletList est le tableau contenant toutes vos instances de Bullet
      cloud.move(deltaTime);
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

    requestId = requestAnimationFrame(gameLoop);
  } else if (currentState === gameStatut.PAUSED) {
    if (pausedTime === 0) {
      // Si le jeu vient d'être mis en pause, enregistrez le timestamp
      pausedTime = timestamp;
    }
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

if (gameStatut.RUNNING) {
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
}

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

// fonction de pause
// Pour mettre en pause le jeu
function pauseGame() {
  if (firstPlay && currentType == deviceType.MOBILE) {
    adviceMenu.style.display = "flex";
    pauseMenu.classList.remove("flex");
    pauseMenu.classList.add("off");
    setTimeout(() => {
      adviceMenu.style.display = "none";
      firstPlay = false;
      document.querySelector("body")?.classList.remove("has-bg");
      audio.play();
      currentState = gameStatut.RUNNING;
      requestAnimationFrame(gameLoop);
    }, 6000);
  } else {
    if (currentState === gameStatut.RUNNING) {
      currentState = gameStatut.PAUSED;

      audio.pause(); // Commencez la lecture audio
      pauseMenu.classList.remove("off");
      pauseMenu.classList.add("flex");
      document.querySelector("body")?.classList.add("has-bg");
    } else if (currentState === gameStatut.PAUSED) {
      currentState = gameStatut.RUNNING;

      audio.play(); // Commencez la lecture audio
      pauseMenu.classList.remove("flex");
      pauseMenu.classList.add("off");
      document.querySelector("body")?.classList.remove("has-bg");

      // Redémarrer la boucle du jeu
      requestAnimationFrame(gameLoop);
    }
  }
}
