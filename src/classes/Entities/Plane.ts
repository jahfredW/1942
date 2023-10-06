import Bullet from "./Bullet";
import Shape from "./Shape";
import SquareContainer from "../SquareContainer";
import IHtmlElementInterface from "../Interfaces/IHtmlElementInterface";
import ConcreteWeaponFactory from "../Factories/ConcreteWeaponFactory";
import Orientation from "../Gameplay/Orientation";
import Helice from "./Helice";

/**
 * Interface coordonnées du carré
 */
interface squareCoords {
  x: number;
  y: number;
}

export default class Plane extends Shape implements IHtmlElementInterface {
  static readonly DEFAULT_WIDTH = 50;
  static readonly DEFAULT_HEIGHT = 50;
  static isDragging = false;
  static startX = 0;
  static startY = 0;
  static initialX = 0;
  static initialY = 0;

  private orientation: Orientation; // orientation de la device
  private neutralOrientation: Orientation; // remise à zéro de l'oritentation
  private helice: Helice;

  constructor(
    private bulletContainer: Bullet[] = [] // tableau d'objets bullets
  ) {
    super();
    // this.bullet = new Bullet(super.coords);
    this.htmlElement = document.createElement("img");
    this.neutralOrientation = new Orientation();
    this.orientation = new Orientation();
    this.helice = new Helice();

    // this.animateSquare();
  }

  //   display(posX: number, posY: number) {
  //     console.log("ici");
  //     this.htmlElement.style.setProperty("--x-position", `${posX}px`);
  //     this.htmlElement.style.setProperty("--y-position", `${posY}px`);
  //   }

  build(container: SquareContainer) {
    this.htmlElement.classList.add("square");
    this.htmlElement.src = "/assets/plane/plane.png";
    this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
    this.helice.build();
    this.helice.setCoord(this.coords.x + 21, this.coords.y - 5);
    container.getHtmlElement().appendChild(this.htmlElement);
  }

  setNeutralOrientation() {
    // Supposons que ces valeurs soient celles que vous lisez du gyroscope
    const currentBeta = this.orientation.getBeta();
    const currentGamma = this.orientation.getGamma();

    this.neutralOrientation.setOrientation(currentBeta, currentGamma);
  }

  updateOrientation(newBeta: number, newGamma: number) {
    const adjustedBeta = newBeta - this.neutralOrientation.getBeta();
    const adjustedGamma = newGamma - this.neutralOrientation.getGamma();

    this.orientation.setOrientation(adjustedBeta, adjustedGamma);
  }

  getWidth(): number {
    return this.htmlElement.width;
  }

  getHeight(): number {
    return this.htmlElement.height;
  }

  shoot(squareContainer: SquareContainer): void {
    let weaponfactory = new ConcreteWeaponFactory();
    let bullet = weaponfactory.weaponCreate("bullet");

    bullet.setCoord(this.coords.x + 28, this.coords.y); // Définir les coordonnées avant de construire
    bullet.build(squareContainer);
    this.bulletContainer.push(bullet);
    bullet.move();
  }

  getCoords(): squareCoords {
    return this.coords;
  }

  getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  moveSquare(
    e: Event,
    button: HTMLElement | null,
    squareContainer: SquareContainer
  ): void {
    // mise à jour des positions du Blob ET de son tir Bullet
    // let posX = this.htmlElement.offsetLeft;
    // let posY = this.htmlElement.offsetTop;

    if (e instanceof MouseEvent) {
      e.preventDefault();
      if (button) {
        switch (button.getAttribute("data-button")) {
          case "right":
            this.coords.x += 10;

            break;
          case "left":
            this.coords.x -= 10;

            break;
          case "down":
            this.coords.y += 10;

            break;
          case "up":
            this.coords.y -= 10;

            break;
        }
      } else {
        // if (e.type === 'mousedown') {
        //     // Blob.isDragging = true;
        //     // Blob.startX = e.clientX;
        //     // Blob.startY = e.clientY;
        //     // Blob.initialX = this.coords.x;
        //     // Blob.initialY = this.coords.y;
        // }
        if (e.type === "mousemove") {
          // &Blob.isDragging
          // ici on récupère la position de la souris.
          const dx = e.clientX - 40 - this.coords.x;
          const dy = e.clientY - 20 - this.coords.y;
          if (dx < 0) {
            // Incliner l'avion vers la gauche
            this.htmlElement.src = "/assets/plane/leftPlane.png";
            this.htmlElement.classList.remove("right-plane");
            this.htmlElement.classList.add("left-plane");
          } else if (dx > 0) {
            // Incliner l'avion vers la droite
            this.htmlElement.src = "/assets/plane/rightPlane.png";
            this.htmlElement.classList.remove("left-plane");
            this.htmlElement.classList.add("right-plane");
          }
          setTimeout(() => {
            this.htmlElement.classList.remove("left-plane", "right-plane");
            this.htmlElement.src = "/assets/plane/plane.png";
          }, 800);

          this.coords.x = this.coords.x + dx;
          this.coords.y = this.coords.y + dy;

          // limitation de l'hélice en x :

          console.log("x helice", this.helice.getCoordX());
          console.log("largeur contenuer", squareContainer.getWidth() - 40);

          if (this.helice.getCoordX() > squareContainer.getWidth() - 35) {
            // on met à jours les coords de l'hélice
            this.helice.setCoord(
              squareContainer.getWidth() - 35,
              this.coords.y - 5
            );
          } else if (this.helice.getCoordX() < 15) {
            this.helice.setCoord(15, this.coords.y - 5);
          } else if (
            this.helice.getCoordY() >
            squareContainer.getHeight() - this.getHeight()
          ) {
            this.helice.setCoord(
              this.coords.x + 21,
              squareContainer.getHeight() - this.getHeight()
            );
          } else {
            this.helice.setCoord(this.coords.x + 20, this.coords.y - 5);
          }
        }
        if (e.type === "mousedown") {
          this.shoot(squareContainer);
        }
      }
    } else if (e instanceof TouchEvent) {
      // Traitement des événements tactiles
      e.preventDefault();
      if (e.type === "touchmove") {
        // Utilisez touch.clientX et touch.clientY au lieu de e.clientX et e.clientY

        const touch = e.touches[0];
        const dx = touch.clientX - 20 - this.coords.x;
        const dy = touch.clientY - 20 - this.coords.y;
        this.coords.x = this.coords.x + dx;
        this.coords.y = this.coords.y + dy;
      }
      if (e.type === "touchstart") {
        // Vous pourriez déclencher un tir lorsque l'utilisateur touche l'avion
        this.shoot(squareContainer);
      }
    }
    // evenements liés au gyroscope
    else if (e instanceof DeviceOrientationEvent) {
      e.preventDefault();
      if (e.beta !== null && e.gamma !== null) {
        this.updateOrientation(e.beta, e.gamma);

        // gestion du debug
        let alphaInput = document.querySelector("#alpha") as HTMLInputElement;
        let betaInput = document.querySelector("#beta") as HTMLInputElement;
        let gammaInput = document.querySelector("#gamma") as HTMLInputElement;

        if (e.alpha && alphaInput) {
          alphaInput.value = e.alpha.toString();
        }

        if (e.beta && betaInput) {
          betaInput.value = e.beta.toString();
        }

        if (e.gamma && gammaInput) {
          gammaInput.value = e.gamma.toString();
        }

        const adjustedBeta = this.orientation.getBeta();
        const adjustedGamma = this.orientation.getGamma();

        this.coords.y += adjustedBeta;
        this.coords.x += adjustedGamma;
      }

      // gestion des evenements du clavier
    } else if (e instanceof KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
          this.coords.x += 10;
          break;
        case "ArrowLeft":
          this.coords.x -= 10;
          break;
        case "ArrowDown":
          this.coords.y += 10;
          break;
        case "ArrowUp":
          this.coords.y -= 10;
          break;
        case " ":
          this.shoot(squareContainer);
      }

      // this.display(posX, posY)
    }
    // Limite les positions à l'intérieur du conteneur
    let containerWidth =
      squareContainer.getHtmlElement()?.getBoundingClientRect().width || 0;
    let containerHeigth =
      squareContainer.getHtmlElement()?.getBoundingClientRect().height || 0;
    this.coords.x = Math.min(Math.max(this.coords.x, 0), containerWidth - 50);
    this.coords.y = Math.min(Math.max(this.coords.y, 0), containerHeigth - 50); // Peut-être utiliser containerHeight ici ?

    // Applique les nouvelles positions
    this.htmlElement.style.left = `${this.coords.x}px`;
    this.htmlElement.style.top = `${this.coords.y}px`;
  }
}
