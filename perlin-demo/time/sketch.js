

function setup() {
  createCanvas(innerWidth, innerHeight)
  frameRate(15)
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

  fill(220)
  noStroke()
  push()

  textAlign(CENTER, CENTER)
  textSize(60)
  text('Perlin Noise over time', width * 0.5, height * 0.06)
  pop()

  noiseDetail(s.detail, s.falloff)
  oneDimensionalNoise(t, s.dt)
  t += s.dt

  textSize(30)
  text(`min = ${round2(min)}`, width*0.03, height*0.035)
  text(`max = ${round2(max)}`, width*0.03, height*0.075)
  text(`avg = ${round2(avg)}`, width*0.03, height*0.115)
}

function round2(n) {
  return Math.round(n * 100) / 100
}

function oneDimensionalNoise(time, dt) {
  beginShape()
  noFill()
  stroke(230)
  strokeWeight(3)
  min = 1
  max = 0
  avg = 0
  for (let x = 0; x < width; x++) {
    let n = noise(time)
    // let a = height * cos(time) / 10
    let y = height - height * n
    if (n > max) {
      max = n
    }
    if (n < min) {
      min = n
    }
    vertex(x, y)
    avg += n
    time += dt
  }
  avg = avg / width
  endShape()
}