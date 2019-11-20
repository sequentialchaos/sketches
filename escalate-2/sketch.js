function setup() {
  looping = true

  dimension = max(innerWidth, innerHeight)
  createCanvas(innerWidth, innerHeight)
  frameRate(60)

  colorMode(HSB, 1, 1, 1, 1)
  noStroke()
  background(0)

  square = {
    cx: 0,
    cy: 0,
    side: dimension,
    numSides: 8,
    draw: function() {
      // rect(this.cx, this.cy, this.side, this.side)
      drawShape(this.cx, this.cy, this.side, this.numSides)
    },
    grow: function(rate) {
      this.side += rate
      this.numSides = constrain((this.numSides + 0.02) % 8, 4, 8)
    },
    shrink: function(rate) {
      this.side -= rate
      this.numSides = constrain((this.numSides - 0.2) % 8, 4, 8)
    },

    isShrinking: true,
    rainbow: function() {}
  }

  angle = 0
  rate = Math.floor(width * 0.005)
  hueOffset = 0
  numRainbows = 1
  hueMin = 0
  hueMax = 1
  rectMode(CENTER)
  noFill()
  strokeWeight(map(dimension, 300, 2000, 1, 13))
}

function draw() {
  translate(width / 2, height / 2)
  rotate(angle)

  // background(0, map(square.side, 0, width, 0.005, 0.05));
  hue = (square.side / width + hueOffset) % (1 / numRainbows)
  hue = map(hue, 0, 1 / numRainbows, hueMin, hueMax)
  stroke(hue, 1, 1, 1)
  square.draw()

  if (square.isShrinking) {
    square.shrink(rate)
    if (square.side <= 0) {
      square.isShrinking = false
      redirect()
    }
  } else {
    square.grow(rate)
    if (square.side >= width * 1.3) {
      square.isShrinking = true
      redirect()
    }
  }

  angle += PI / 500
}

function drawShape(cx, cy, s, numSides) {
  beginShape()
  for (let i = 0; i < numSides; i++) {
    let angle = map(i, 0, numSides, 0, TWO_PI)
    let x = cx + s * 0.7 * cos(angle)
    let y = cy + s * 0.7 * sin(angle)
    vertex(x, y)
  }
  endShape(CLOSE)
}

function redirect() {
  // background(0);
  rate = Math.floor(width * random(0.003, 0.009))
  hueOffset = Math.random()
  numRainbows = Math.ceil(random(0, 10))
  hueMin = Math.random()
  hueMax = Math.random()
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
