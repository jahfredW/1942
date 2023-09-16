import SquareContainer from './classes/SquareContainer';

import Plane  from './classes/Plane';
import SpawnManager  from './classes/SpawnManager';

import Game  from './classes/Game';

// Instanciation des éléments 

const plane = new Plane();
const squareContainer = new SquareContainer();
plane.build(squareContainer);

// récupération des éléments HTML correspondants à la classe
const squareContainerElement = squareContainer.getHtmlElement();

let lastTime = 0
let spawnManager = new SpawnManager(squareContainer);


// main Game Loop
function gameLoop(timestamp : number) : void {

    // temps écoulé = temps total - temps dernière boucle
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Gestion du respawn des bateaux
    spawnManager.update(timestamp);

    // déplacement des bateaux
    for (const ship of SquareContainer.shipList) {
        ship.move(deltaTime);
    }
    
    // déplacemet des missiles
    for (const bullet of SquareContainer.bulletList) { // Assume BulletList est le tableau contenant toutes vos instances de Bullet
        bullet.move(deltaTime);
    }    

    // Gestion des collisions 
    Game.checkCollisions(squareContainer);
    // Mettez ici le code pour créer des bateaux, etc.
    // Vous pouvez utiliser deltaTime pour ajuster le timing
  
    requestAnimationFrame(gameLoop);
  }
  
requestAnimationFrame(gameLoop);


// let colorTab = ['cruiser'];
// let x  = 100;
// let vInit = 1;
// let accel = 1;

// let timer = 5000;
// function executeInterval() {
    
//     // rect.build(squareContainer);
//     // rect.display(x, colorTab[i]);
//     // squareContainer.addShape(rect);
//     // vInit = Math.floor(Math.random() * 10) / 10 + 1;
//     // accel = Math.floor(Math.random() * 10) / 100;
//     // rect.move(vInit, accel);
//     // x = Math.floor(Math.random() * 1000) + 1;

//     setTimeout(executeInterval, timer);
// }

// executeInterval();

// Button Events
// directionButtons.forEach(button => {
//     if (button instanceof HTMLElement) {
//         button.addEventListener('click', (e) => blob.moveSquare(e, button, squareContainerElement));
//     }
// });

// Global Events
document.addEventListener('keydown', (e) => plane.moveSquare(e, null, squareContainerElement));
document.addEventListener('mousedown', (e) => plane.moveSquare(e, null, squareContainerElement));
document.addEventListener('mousemove', (e) => plane.moveSquare(e, null, squareContainerElement));
document.addEventListener('mouseup', (e) => plane.moveSquare(e, null, squareContainerElement));




