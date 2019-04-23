// References:
// https://en.wikipedia.org/wiki/Barnsley_fern

let x = [0, 0],
    y = [0, 0];

function setup() {
  
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  background(40)
  

}

function draw() {
  stroke('springgreen')
  strokeWeight(1)
  for (let i = 0; i < 140; i++) {
    let scaleX = map(x[0], -2.1820, 2.6558, 0, width),
        scaleY = map(y[0], 0, 9.9983, height, 0)
    point(scaleX, scaleY)
    getNextPoint()
  }
}

function getNextPoint() {
  let sample = random(0, 1)
  if (sample <= 0.01) {
    x[1] = 0.00
    y[1] = 0.16*y[0]
  } else if (sample <= 0.86) {
    x[1] = 0.85*x[0] + 0.04*y[0]
    y[1] = -0.04*x[0] + 0.85*y[0] + 1.60
  } else if (sample <= 0.93) {
    x[1] = 0.20*x[0] - 0.26*y[0]
    y[1] = 0.23*x[0] + 0.22*y[0] + 1.60
  } else {
    x[1] = -0.15*x[0] + 0.28*y[0]
    y[1] = 0.26*x[0] + 0.24*y[0] + 0.44
  } 
  x[0] = x[1]
  y[0] = y[1]
}

function drawPoint() {
  let 
}