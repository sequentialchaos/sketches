

let p = 0.025,
    clickCount = 0;

let dragon_curve = new L_system(
  axiom = 'FX',
  rules = {
    X: 'X+YF+',
    Y: '-FX-Y'
  },
  len = 5,
  angle = 90,
  max_iterations = 14
)

let instructions = axiom

function setup() {
  length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')

  frameRate(10)

  dragon_curve.getNextInstructions()
}


function mouseClicked() {
  dragon_curve.getNextInstructions()
  print(dragon_curve.turtle.instructions.count('F'))
  clickCount++
}


function draw() {
  background(0)

  if (clickCount <= 4) {
    showCLickText()
  }

  push()
  // translate(width * p, height * (1 - p))
  translate(width * 0.7, height * 0.3)
  dragon_curve.draw({len: 4, colormode:'rainbow'})
  pop()
}

function showCLickText() {
  push()
  resetMatrix()
  fill(255)
  textSize(map(width, 300, 2000, 26, 60))
  textAlign(CENTER, CENTER)
  text('click / tap', width/2, height * 2/3)
  pop()
}