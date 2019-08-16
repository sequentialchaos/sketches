
class Sun {
  constructor(y, d, height) {
    this.x = 0
    this.y = y
    this.dy = 3
    this.d = d
    this.min_height = y + d
    this.max_height = y - height - d
  }

  draw() {
    fill('orange')
    noStroke()
    circle(this.x, this.y, this.d)
  }

  moveUp() {
    this.y -= this.dy
    if (this.y < this.max_height) {
      this.y = this.min_height
    }
  }
}

class Happy {
  constructor(y, d, height) {
    this.sun = new Sun(y, d, height)
  }

  draw() {
    this.sun.draw()
    this.sun.moveUp()
  }
}