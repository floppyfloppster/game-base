export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 32;
        this.height = 64;
        this.x = 50;
        this.y = 100;

        update(deltaTime) {
            draw(context) {
                context.fillStyle = '#f00';
                context.fillRect(this.x, this.y, this.width, this.height);

            }
            import Player from './Player.js'
            export default class Game {
                constructor(width, height) {
                    this.player = new Player(this)


                }

                draw(context) {
                    this.player.draw(context)
                }
                constructor(game) {
                    this.speedX = 1
                    this.speedY = 0
                }
                update(deltaTime) {
                    this.x += this.speedX
                }
                update(deltaTime) {
                    this.player.update(deltaTime)
                  }
            }

        }
    }
}