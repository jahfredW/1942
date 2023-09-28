import SquareContainer from "../SquareContainer";
import IHtmlElementInterface from "../Interfaces/IHtmlElementInterface";
import Plane from "./Plane";

export default class Weapon implements IHtmlElementInterface  {

    constructor(protected coords : { x : number, y : number} = { x : 0, y : 0}, 
        protected dimensions : { width : number, height : number} = { width : 5, height : 5 },
        protected htmlElement : HTMLImageElement = document.querySelector<HTMLImageElement>('.bullet')!,
        protected angle : number = 0,
        protected ttl : number = 0,
        protected timeStamp : number = 0) 
        {
          
    }

    // Contruction de la bullet en html
    build(container: SquareContainer): void {
        // let containerElt = container.getHtmlElement();
        // this.htmlElement = document.createElement("img");
        // this.htmlElement.classList.add("bullet");
        // this.htmlElement.src = " ../../assets/plane/missile.png"
        
        // this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        // this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
        

        // dimensions qui viennent du DOM, à récupérer après l'injection dans le DOM !!!!
        // this.dimensions.width = this.htmlElement.offsetWidth;
        // this.dimensions.height = this.htmlElement.offsetHeight;

        
        


        // console.log("this before pushing", this);  // Debugging line
       
        // console.log("SquareContainer after pushing", SquareContainer.bulletList);  // Debugging line

        // containerElt.appendChild(this.htmlElement);

        // this.dimensions.width = this.htmlElement.offsetWidth;
        // this.dimensions.height = this.htmlElement.offsetHeight;
    }

    getHtmlElement(): HTMLImageElement {
        return this.htmlElement;
    }

    setCoord(x : number, y : number) : void {
        this.coords.x = x ;
        this.coords.y = y ;
    }

    getCoord(){
        return { "x" : this.coords.x, "y" : this.coords.y }
    }

    getCoordX() : number {
        return this.coords.x
    }

    getCoordY() : number {
        return this.coords.y
    }

    getWidth() : number  {
        return this.dimensions.width
    }

    getHeight() : number {
        return this.dimensions.height
    }

    setAngle(angle : number) : void {
        this.angle = angle;
    }

    setTimeStamp(value : number) : void {
        this.timeStamp = value;
    }

    setTtl(value : number) : void {
        this.ttl = value;
    }

    destroy() {
        // Supprimez l'élément HTML associé à cette arme
        console.log("destroy");
        if (this.htmlElement) {
            console.log('remove', this.htmlElement);
            this.htmlElement.remove();
        }
        
        // Supprimez cette instance de Weapon de tous les tableaux ou structures de données
        // qui la contiennent (par exemple, vous pourriez avoir un tableau de toutes les armes actuellement actives)
        const index = SquareContainer.missileList.indexOf(this);
        if (index > -1) {
            SquareContainer.missileList.splice(index, 1);
        }

        // … effectuez ici tout autre nettoyage nécessaire …
    }

// Dans cette méthode, this.htmlElement.remove() supprime l'élément HTML associé de la page, et le code qui suit supprime l'instance de l'objet Weapon du tableau bulletList pour s'assurer qu'il ne continue pas à être mis à jour ou rendu après sa destruction. Vous devrez peut-être adapter ces détails pour correspondre à la structure exacte et aux noms de votre projet.







    move(deltaTime: number = 0): void {
    let vInit = 1;

    

   

    // Utilisez deltaTime pour rendre l'animation indépendante du taux de rafraîchissement
    this.coords.x += vInit * (deltaTime / 5);

    // Appliquez les limites et supprimez si nécessaire
    // if (this.coords.y < 0) {
    //     this.htmlElement.classList.add("off");
    //     this.htmlElement.remove();
        
        // Supprimez cette instance de Bullet du tableau BulletList
    

    // Mettez à jour la propriété CSS
    if(this.htmlElement){
        this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
        this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
    }
    
}

    // méthode qui permet de diriger le tir ennemi vers l'avion 
    seekAndDestroy2(deltaTime : number, squareContainer : SquareContainer, plane : Plane){
        let vInit = 1;

        // Utilisez deltaTime pour rendre l'animation indépendante du taux de rafraîchissement
        // this.coords.y += vInit * (deltaTime / 5);

        // récupérer les coordonnées de l'avion : 
        let planeCoords = plane.getCoords();
        let planeX = planeCoords.x;
        let planeY = planeCoords.y;

        this.moveToplanePosition(deltaTime, planeX, planeY);
        
    }

    // dirige le tir vers les coordonnées de l'avion. 
    seekAndDestroy(deltaTime: number, squareContainer: SquareContainer, plane: Plane) {
     
        let speed = 0.3;  // Vitesse du missile, à ajuster
        this.coords.x += speed * Math.cos(this.angle) * deltaTime;
        this.coords.y += speed * Math.sin(this.angle) * deltaTime;

        if(this.htmlElement){
            this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
            this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
        }
        
        //... autres logiques, comme la vérification de la collision
    }

    // calcul de la tangente : missiles à têtes chercheuses. 
    moveToplanePosition(deltaTime: number = 0, planeX: number, planeY: number): void {
        // Calculer la distance horizontale entre le bateau et l'avion
        let dx = planeX - this.coords.x;
        
        // Calculer la distance verticale entre le bateau et l'avion
        let dy = planeY - this.coords.y;
    
        // Calculer l'angle entre le bateau et l'avion
        let angle = Math.atan2(dy, dx);
    
        // Si vous voulez utiliser deltaTime pour mettre à jour la position du bateau, 
        // vous pouvez le faire ici en utilisant l'angle.
        
        // Par exemple, pour mettre à jour les coordonnées x et y:
        let speed = 0.3;  // Vitesse du bateau, à ajuster
        this.coords.x += speed * Math.cos(angle) * deltaTime;
        this.coords.y += speed * Math.sin(angle) * deltaTime;

         // Mettez à jour la propriété CSS
         if(this.htmlElement){
            this.htmlElement.style.setProperty("--y-position", `${this.coords.y}px`);
            this.htmlElement.style.setProperty("--x-position", `${this.coords.x}px`);
        }
    }

    checkTTL(timeStamp: number){
        console.log("timeStamp", timeStamp);
        console.log("timeStamp missile", this.timeStamp);
        console.log("this.ttl:", this.ttl);
        if(timeStamp - this.timeStamp > this.ttl){
            this.destroy();
        }
    }   

    
}