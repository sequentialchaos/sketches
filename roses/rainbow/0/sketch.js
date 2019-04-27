let i;
let u = 0,
    k = 4;

let d, max_d;

let x = [0, 0], 
    y = [0, 0];

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  
  colorMode(HSB)
  background(10)
  
  i = TWO_PI / 800
  max_d = (width*width + height*height) * 0.1
}

function draw() {
  translate(width/2, height/2)
  
  d = x[1]*x[1] + y[1]*y[1]
  let h = map(d, 0, max_d, 0, 255)
  stroke(h, 200, 200)
  strokeWeight(7)
  
  let r = width * 0.49 * cos(k*u)
  
  x[1] = r * cos(u)
  y[1] = r * sin(u)
  
  if (u > 0) {
    line(x[0], y[0], x[1], y[1])
    if (floor(u / TWO_PI) >= 1) {
      noLoop()
      // restart, increase k
      // background(10)
      // u = 0
      // k += 2
    }
  }
  
  x[0] = x[1]
  y[0] = y[1]
  
  u += i
}