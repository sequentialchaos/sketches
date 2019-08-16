function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  angle = 90
  len = 50
  p1 = createVector(0, 0)
  p2 = createVector(0, 0)


  current_angle = 0
  instructions = ''
}

function draw() {
  background(127)
  stroke(255)
  strokeWeight(4)
  line(p1.x, p1.y, p2.x, p2.y)
}

function mousePressed() {
  p1.set(mouseX, mouseY)
  p2.set(mouseX, mouseY)
}

function mouseReleased() {
  // print(degrees(p5.Vector.sub(p2, p1).heading()))
  let to_angle = degrees(p5.Vector.sub(p2, p1).heading())
  print(to_angle, angle)
  to_angle = radians(round(to_angle / angle) * angle)
  print(to_angle)
  let p3 = p5.Vector.fromAngle(to_angle, len)
  p2 = p5.Vector.add(p1, p3)
  // p2.sub(p1)
  if ()
}

function mouseDragged() {
  p2.set(mouseX, mouseY)
}

function addCircle(x, y, d, color) {
  circles.push({
    x: x,
    y: y, 
    d: d,
    color: color
  })
}