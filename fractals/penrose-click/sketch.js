

let penrose = new L_system(
  axiom = '[B]++[B]++[B]++[B]++[B]',
  rules = {
    A: 'CF++DF----BF[-CF----AF]++',
    B: '+CF--DF[---AF--BF]+',
    C: '-AF++BF[+++CF++DF]-',
    D: '--CF++++AF[+DF++++BF]--BF',
    F: ''
  },
  len = 10,
  angle = 36,
  max_iterations = 5
)

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length, P2D).center('horizontal')
  // noLoop()
  frameRate(10)
  clickCount = 0
}

function draw() {
  background(0)
  translate(width * 0.5, height * 0.5)
  penrose.draw({len: map(length, 300, 2000, 25, 40), mode: 'absolute', colormode: 'rainbow', show: false})
  // print(fractal.turtle.lines.length)
  colorMode(HSB, penrose.turtle.lines.length, 100, 100)
  for (let [i, l] of penrose.turtle.lines.entries()) {
    stroke(i, 100, 100)
    // stroke(255)
    line(l.x1, l.y1, l.x2, l.y2)
  }
}

function mouseClicked() {
  penrose.getNextInstructions()
  clickCount++
}