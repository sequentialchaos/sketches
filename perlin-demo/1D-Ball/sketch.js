

function setup() {
  createCanvas(innerWidth, innerHeight)
  frameRate(60)
  t = 0
  dt = 0.01

  min = 1
  max = 0
  avg = 0

  settings = function() {
    this.dt = 0.01
    this.detail = 4
    this.falloff = 0.5
  }
  s = new settings()
  gui = new dat.GUI(s)
  gui.add(s, 'dt', 0.002, 0.1)
  gui.add(s, 'detail', 1, 20, 1)
  gui.add(s, 'falloff', 0, 0.9)
}

function draw() {
  background(50)
  noiseDetail(s.detail, s.falloff)
  drawBall(t, 30)
  t += s.dt
}

function drawBall(t, d) {
  let x = noise(t) * width,
      y = height / 2
  circle(x, y, d)
}