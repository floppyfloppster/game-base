export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 32;
        this.height = 64;
        this.x = 50;
        this.y = 100;
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10
    }

    draw(context) {
        context.fillStyle = '#fff';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
        update(deltaTime) {
        }       
    
}