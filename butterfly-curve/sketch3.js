// References:
// http://paulbourke.net/geometry/butterfly/

const e = Math.E;
let u, r, speed, count;
let prev_x, prev_y;
let min_x = 0, min_y = 0;
let lines = [], translated_lines = [];

function setup() {
  const length = 5000//min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noCanvas()
  background(40)
  noLoop()

  prev_x = 0
  prev_y = 0
  u = 0
  r = length * 0.12
  speed = PI / 200
  count = 0 

  let v = -PI/2
  while (u <= 72) {
    let d = r * (pow(e, cos(u)) - 2*cos(4*u) - pow(sin(u/12), 5))
    let x = d * cos(u + v)
    let y = d * sin(u + v)
    
    if (count > 0) {
      lines.push([prev_x, prev_y, x, y])
    }
    
    prev_x = x
    prev_y = y
  
    u += speed
    count += 1
  }

  for (let l of lines) {
    let a = []
    for (let c of l) {
      a.push(round(c + length/2))
    }
    translated_lines.push(a)
  }

  // createP('SP1;')
}

function draw() {
  // translate(width/2, height/2)
  // rotate(-PI/2)

  stroke(255)
  strokeWeight(3)
  let i = 0
  for (let l of translated_lines) {
    line(round(l[0]), l[1], l[2], l[3])
    // createP('PA' + l[0] + ',' + l[1] + ';')
    if (i == 0) {
      // createP('PD;')
    }
    i++
  }
  // createP('PU;')
  // createP('SP0;')

  
}