function setup() {
  createCanvas(innerWidth, innerHeight)

  looping = true
  if (!looping) {
    noLoop()
  }
  frameRate(20)

  max_hue = 1
  colorMode(HSB, max_hue, 1, 1, 1)
  background(0)

  walkers = []
  num_walkers = 50
  for (let i = 0; i < num_walkers; i++) {
    max_spread = PI * 0.8
    _spread = random(PI * 0.2, max_spread)
    walkers.push(
      new RandomWalker({
        x: width / 2,
        y: height / 2,
        direction: random(TWO_PI),
        spread: _spread,
        diameter: 3,
        min_distance: 1,
        max_distance: 30,
        fill_color: color(
          random(max_hue),
          1,
          1,
          map(_spread, 0, max_spread, 0.5, 0.05)
        )
      })
    )
  }
}

function draw() {
  background(0, 0.05)
  noStroke()
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].draw()
    walkers[i].move()
    walkers[i].wrap()
  }
}

class RandomWalker {
  constructor({
    x = width / 2,
    y = height / 2,
    direction = 0,
    spread = PI / 8,
    diameter = 3,
    min_distance = 1,
    max_distance = 4,
    fill_color = 'white'
  } = {}) {
    this.x = x
    this.y = y
    this.x2 = x
    this.y2 = y
    this.x3 = x
    this.y3 = y
    this.direction = direction
    this.spread = spread
    this.diameter = diameter
    this.min_distance = min_distance
    this.max_distance = max_distance
    this.fill_color = fill_color
  }
  draw({ override_fill = false } = {}) {
    const { x, y, x2, y2, x3, y3 } = this
    if (!override_fill) fill(this.fill_color)
    triangle(x, y, x2, y2, x3, y3)
  }
  move() {
    this.direction += random(-this.spread, this.spread)
    let distance = random(this.min_distance, this.max_distance)
    this.x3 = this.x2
    this.y3 = this.y2
    this.x2 = this.x
    this.y2 = this.y
    this.x += distance * cos(this.direction)
    this.y += distance * sin(this.direction)
  }
  wrap() {
    if (this.x < 0) {
      this.x = width
      this.resetPrevPositions()
    }
    if (this.x > width) {
      this.x = 0
      this.resetPrevPositions()
    }
    if (this.y < 0) {
      this.y = height
      this.resetPrevPositions()
    }
    if (this.y > height) {
      this.y = 0
      this.resetPrevPositions()
    }
  }
  resetPrevPositions() {
    this.x2 = this.x
    this.y2 = this.y
    this.x3 = this.x
    this.y3 = this.y
  }
}

function mousePressed() {
  if (looping) {
    noLoop()
    looping = false
  } else {
    loop()
    looping = true
  }
}
