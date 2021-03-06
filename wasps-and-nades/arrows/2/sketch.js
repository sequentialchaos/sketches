let s, n
let angle = 0
let t = 0
let framerate = 60
let duration = 10
let animationFrames = framerate * duration
let drawWhite
let gui

// GUI control variables
function controls() {
  this.n = 3
}

let c = new controls()

// From [0;1] to [0;1]
function easeInOutQuart(t) {
  return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  frameRate(framerate)

  noStroke()


  gui = new dat.GUI()
  // gui.remember(c)
  gui.add(c, 'n', 1, 10, 1)
  n = 3
  s = length / c.n
}

function draw() {
  s = width / c.n
  t = (frameCount % animationFrames) / animationFrames
  let phase = Math.floor(t * 4)
  let angleAddition = 0
  if (phase == 0 || phase == 2) {
    background(0)
    fill(255)
  } else {
    translate(-s / 2, -s / 2)
    background(255)
    fill(0)
    angleAddition = 0.5
  }


  // translate(width / 2, height / 2)
  // rotate()
  let shiftUp = phase / 4
  drawArrows(s, c.n, (shiftUp + angleAddition + easeInOutQuart(4 * (t % 0.25)) / 4) * TWO_PI)
}

function upArrow(w, h) {

  push()
  // translate(-x - w / 2, -y - h / 2)
  // rotate(angle)
  beginShape()

  vertex(w / 4, 0)
  vertex(w * 3 / 4, 0)
  vertex(w * 3 / 4, h / 2)
  vertex(w, h / 2)
  vertex(w / 2, h)
  vertex(0, h / 2)
  vertex(w / 4, h / 2)

  endShape()
  pop()
}

function drawArrows(s, n, angle) {
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      let x = map(i, 0, n, 0, width),
        y = map(j, 0, n, 0, height);
      push()
      translate(x + s / 2, y + s / 2)
      rotate(angle)
      translate(-s / 2, -s / 2)
      upArrow(s, s)
      pop()
    }
  }
}