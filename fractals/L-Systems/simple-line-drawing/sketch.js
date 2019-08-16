function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  angle = radians(90)
  len = 20
  circles = []
  l = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  }
}

function draw() {
  background(127)
  stroke(255)
  strokeWeight(4)
  line(l.x1, l.y1, l.x2, l.y2)
}

function mousePressed() {
  l.x1 = mouseX
  l.y1 = mouseY
  l.x2 = mouseX
  l.y2 = mouseY
}

function mouseReleased() {
  l.x2 = mouseX
  l.y2 = mouseY
  
}

function mouseDragged() {
  l.x2 = mouseX
  l.y2 = mouseY
  
}


function addCircle(x, y, d, color) {
  circles.push({
    x: x,
    y: y, 
    d: d,
    color: color
  })
}