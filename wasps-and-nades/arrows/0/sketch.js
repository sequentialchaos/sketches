let s, n;
let angle = 0;
let t = 0;
let framerate = 60
let duration = 10
let animationFrames = framerate * duration;

// From [0;1] to [0;1]
function easeInOutQuart(t) {
  return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  frameRate(framerate)

  background(0)
  fill(255)
  noStroke()

  n = 5
  s = length / n

}

function draw() {
  t = (frameCount % animationFrames) / animationFrames
  background(0)
  // translate(width / 2, height / 2)
  // rotate()
  let shiftUp = Math.floor(t * 4) / 4;
  drawArrows((shiftUp + easeInOutQuart(4 * (t % 0.25)) / 4) * TWO_PI)
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

function drawArrows(angle) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
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