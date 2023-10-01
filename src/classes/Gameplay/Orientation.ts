export default class Orientation {
    private beta: number;
    private gamma: number;

    constructor( beta: number = 45, gamma: number = 0) {
        this.beta = beta;
        this.gamma = gamma;
    }

    setOrientation(beta: number, gamma: number) {
        this.beta = beta;
        this.gamma = gamma;
    }

    getBeta() {
        return this.beta;
    }

    getGamma() {
        return this.gamma;
    }
}
