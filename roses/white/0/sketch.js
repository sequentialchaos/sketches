let i;
let u = 0,
    k = 2;

let x = [0, 0], 
    y = [0, 0];

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal');
  background(30);
  
  i = TWO_PI / 300;
}

function draw() {
  translate(width/2, height/2)
  
  stroke(225)
  strokeWeight(10)
  
  let r = width * 0.49 * cos(k*u)
  
  x[1] = r * cos(u)
  y[1] = r * sin(u)
  
  if (u > 0) {
    line(x[0], y[0], x[1], y[1])
    if (floor(u / TWO_PI) == 1) {
      background(30)
      u = 0
      k += 2
    }
  }
  
  x[0] = x[1]
  y[0] = y[1]
  
  u += i
}