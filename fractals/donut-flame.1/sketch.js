
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
  axiom = 'F+F+F+F+F+F+F',
  rules = {
    F: '+F+F-F'
  },
  len = 2,
  angle = 360/7,
  max_iterations = 10
)

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  // frameRate(1)

  for (let i = 0; i < 2; i++) {
    donut_flame2.getNextInstructions()
  }
  donut_flame2.draw({len: length * 0.035, mode: 'absolute', colormode: 'normal', show: false})
  console.log(donut_flame2.turtle.angle_delta)
}


function draw() {
  background(0)
  translate(width * 0.5, height * 0.5)
  // rotate(radians(25))
  rotate(frameCount / PI)

  colorMode(HSB, 100)
  for (let l of donut_flame2.turtle.lines) {
    // stroke(random(100), 100, 100)
    stroke(255)
    strokeWeight(3)
    line(l.x1, l.y1, l.x2, l.y2)
  }

}