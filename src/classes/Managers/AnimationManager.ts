export default class AnimationManager {
  private element: HTMLImageElement;
  private lastTimestamp: number | null = null;
  private imageIndex: number = 0;
  private imagePaths: string[] = [
    "/assets/plane/helice1.png",
    "/assets/plane/helice2.png",
    "/assets/plane/helice3.png",
  ];
  private elapsedTime: number = 0; // Ajout de cette variable

  constructor(element: HTMLImageElement) {
    this.element = element;
  }

  animate(timestamp: number) {
    if (timestamp === undefined || isNaN(timestamp)) {
      // Vérifiez si timestamp est undefined ou NaN, et ignorez l'animation dans ce cas
      return;
    }

    if (this.lastTimestamp === null) {
      this.lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - this.lastTimestamp;
    this.elapsedTime += deltaTime; // Incrémentation du temps écoulé

    if (this.elapsedTime > 200) {
      // Changez l'image après 1 seconde
      this.imageIndex = (this.imageIndex + 1) % this.imagePaths.length;
      this.element.src = this.imagePaths[this.imageIndex];

      // Réinitialisez le temps écoulé
      this.elapsedTime = 0;
    }

    this.lastTimestamp = timestamp;
  }
}
