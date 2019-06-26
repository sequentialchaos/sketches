

let p = 0.025,
    clickCount = 0;

let hilbert = new L_system(
  axiom = 'L', 
  rules = {
    L: '+RF-LFL-FR+',
    R: '-LF+RFR+FL-'
  },
  len = 30,
  angle = 90,
  max_iterations = 7
)

let instructions = axiom

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')

  frameRate(10)
  
  hilbert.getNextInstructions()
  print(hilbert.instructions)

}


function mouseClicked() {
  hilbert.getNextInstructions()
  print(hilbert.instructions)

  clickCount++
}


function draw() {
  background(0)

  if (clickCount <= 1) {
    showCLickText()
  }

  let l = width / (pow(2, hilbert.iterations) - 1) * (1 - 2*p)

  push()
  translate(width * p, height * (1 - p))
  hilbert.draw({len:l, colormode:'rainbow'})
  pop()
}

function showCLickText() {
  push()
  resetMatrix()
  fill(255)
  textSize(map(width, 300, 2000, 26, 60))
  textAlign(CENTER, CENTER)
  text('click / tap', width/2, height/2)
  pop()
}