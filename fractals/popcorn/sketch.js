
let h = 0.05;
let x0, y0, x1, y1;

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  background(0)

  x0 = 0
  y0 = 0


}

function draw() {
  stroke(255)
  point(x0, y0)
  x1 = x0 - h * sin(y0 + tan(3*y0))
  y1 = y0 - h * sin(x0 + tan(3*x0))
  console.log(x1, y1)
  x0 = x1
  y0 = y1
  // console.log(x0, y0)
}