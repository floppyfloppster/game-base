import Enemy from './Enemy'
import spriteImage from './assets/sprites/enemysprite.png'


export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 22
    this.height = 23
    this.x = this.game.width
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
    this.speedX = Math.random() * -0.5 - 0.5
    this.lives = 2
  }
}
