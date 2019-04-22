// References:
// http://paulbourke.net/geometry/butterfly/

const e = Math.E;
let u, r, speed, count;
let prev_x = 0,
    prev_y = 0;

function setup() {
  
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  background(40)
  
  u = 0
  r = width * 0.12
  speed = PI / 100
  count = 0 
}

function draw() {
  translate(width/2, height/2)
  rotate(-PI/2)
  
  stroke(150, count % 56 + 200, (count * 2) % 56 + 200)
  strokeWeight(3)
  
  let x = r * cos(u) * (pow(e, cos(u)) - 2*cos(4*u) - pow(sin(u/12), 5))
  let y = r * sin(u) * (pow(e, cos(u)) - 2*cos(4*u) - pow(sin(u/12), 5))
  
  if (count > 0) {
    line(prev_x, prev_y, x, y)
  }
  
  prev_x = x
  prev_y = y
  
  u += speed
  count += 1
}