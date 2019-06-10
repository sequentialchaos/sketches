function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  t = 0
  dt = 0.02
}

function draw() {
  background(50)
  translate(width / 2, height / 2)
  drawJelly(0, 0, width * 0.6, t, 'pink')
  t += dt
}

function drawJelly(x, y, d, t, color) {
  push()
  fill(color)
  arc(x, y, d, d, PI, TWO_PI)
  for (let i = 0; i < 6; i++) {
    beginShape()
    stroke(color)
    strokeWeight(map(d, 0, 1000, 0, 20))
    noFill()
    let x0 = map(i, 0, 5, x - d * 0.45, x + d * 0.45)
    let ydt = 0.01
    for (let y0 = 0; y0 < map(d, 0, 1000, 0, 500); y0++) {
      let n = 0
      let r = map(d, 0, 1000, 0, 40)
      n = map(noise(t + y0 * ydt + i), 0, 1, -r, r)
      vertex(x0 + n, y0)      
    }
    endShape()
  }
  pop()
}