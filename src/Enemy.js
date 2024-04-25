import spriteImage from './assets/sprites/enemysprite.png'

export default class Enemy {
  constructor(game) {
    this.game = game
    this.width = 78
    this.height = 58
    this.x = 50
    this.y = 350

    this.frameX = 0
  

    this.projectiles = []

    this.direction = 1
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.jumpSpeed = 14
    this.jumpTimer = 0
    this.jumpInterval = 600
    this.grounded = false


    this.flip = true
    const image = new Image()
    image.src = spriteImage
    this.image = image
  
    
    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 2000 / this.fps
    this.lives = 2

  }

  update() {
    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0) this.markedForDeletion = true
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height - 14,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )
    if (this.flip) {
      context.restore()
    }
  }
}
