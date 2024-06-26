import Slime from './Slime.js'
import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Platform from './Platform.js'

export default class Game {
  constructor(width, height) {
    this.player = new Player(this)
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.score = 0

    this.url = 'https://pyrite-trusting-rest.glitch.me'

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 2000

    this.player = new Player(this)

    this.ground = this.height - 100

    this.platforms = [
      new Platform(this, 0, this.ground, this.width, 100),
      new Platform(this, this.width - 200, 280, 200, 20),
      new Platform(this, 200, 200, 300, 20),
    ]
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    } else {
      console.log("det här skrivs ut om gameover är true")
      return
    }
    this.player.update(deltaTime)

    this.platforms.forEach((platform) => {
      if (this.checkPlatformCollision(this.player, platform)) {
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height
        this.player.grounded = true
      }
      this.enemies.forEach((enemy) => {
        if (this.checkPlatformCollision(enemy, platform)) {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
        }
      })
    })

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.gameOver = true
        this.newHiscore()
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true
          projectile.markedForDeletion = true
          this.score += 1
          console.log(this.score)
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }


  draw(context) {
    this.ui.draw(context)
    this.platforms.forEach((platform) => platform.draw(context))
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }

  addEnemy() {
    this.enemies.push(new Slime(this))
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }

  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }

  newHiscore() {
    // ny variabel för ditt namn
    // spara prompt("ditt namn") i namn
    // använd i post request 
    let name = prompt("enter your name",);
    const hiscore = { score: this.score, name: name }
    fetch(`${this.url}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hiscore),
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text)
      })

    console.log("skicka in en new hiscore med fetch till server")

  }
}
