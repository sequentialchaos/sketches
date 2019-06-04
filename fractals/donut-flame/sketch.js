// n = 4
let donut_flame = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: '+F+F-F'
  },
  len = 20,
  angle = 60,
  max_iterations = 10
)

let donut_flame2 = new L_system(
  axiom = 'F+F+F+F+F',
  rules = {
    F: '+F+F-F'
  },
  len = 2,
  angle = 72,
  max_iterations = 10
)

let d;

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  noLoop()
  frameRate(3)
  d = donut_flame.copy()
  for (let i = 0; i < 4; i++) {
    donut_flame.getNextInstructions()
  }

  // d.draw({
  //   len: length * 0.035,
  //   mode: 'absolute',
  //   colormode: 'normal',
  //   show: false
  // })
  // translate(-200, 0)
  donut_flame.draw({
    len: length * 0.035,
    mode: 'absolute',
    colormode: 'normal',
    show: false
  })
  console.log(donut_flame.turtle.angle_delta)


}


function draw() {
  background(0)
  translate(width * 0.2, height * 0.56)
  // rotate(radians(25))
  // rotate(frameCount / PI)

  colorMode(HSB, 100)
  for (let l of donut_flame.turtle.lines) {
    stroke(random(100), 100, 100)
    strokeWeight(3)
    line(l.x1, l.y1, l.x2, l.y2)
  }
  translate(200, 0)
  for (let l of d.turtle.lines) {
    stroke(random(100), 100, 100)
    strokeWeight(3)
    line(l.x1, l.y1, l.x2, l.y2)
  }
  print(donut_flame.turtle.lines)

}