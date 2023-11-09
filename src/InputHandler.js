export default class InputHandler {
    constructor(game) {
        this.game = game
        window.addEventListener('keydown', (event) => {
        }
        if (
            (event.key === 'ArrowUp' ||
              event.key === 'ArrowDown' ||
              event.key === 'ArrowLeft' ||
              event.key === 'ArrowRight') &&
            this.game.keys.indexOf(event.key) === -1
          ) {
            this.game.keys.push(event.key)
          }
          if (event.key === 'd') {
              this.game.debug = !this.game.debug
            }
            window.addEventListener('keyup', (event) => {
                if (this.game.keys.indexOf(event.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
                  }
                  update(deltaTime) }
                    if (this.game.keys.includes('ArrowUp')) {
                      this.speedY = -this.maxSpeed;
                    } else if (this.game.keys.includes('ArrowDown')) {
                        this.speedY = this.maxSpeed;
                    } else {
                        this.speedY = 0;
                    }
                    this.y += this.speedY;
                  }
                }