let hilbert = new L_system(
  axiom = 'L', 
  rules = {
    L: '+RF-LFL-FR+',
    R: '-LF+RFR+FL-',
  },
  len = 15,
  angle = 90,
  max_iterations = 7
)

let hilbert2 = new L_system(
  axiom = 'L', 
  rules = {
    L: '+R-LFL-R+',
    R: '-L+RFR+L-',
    A: 'BF+AFA+FB-',
    B: '--AF-BFB-FA+'
  },
  len = 5,
  angle = 90,
  max_iterations = 7
)

let hilbert3 = new L_system(
  axiom = 'L', 
  rules = {
    L: '+++R-LFL-R+++',
    R: '---L+RFR+L---',
    A: 'BF+AFA+FB-',
    B: '--AF-BFB-FA+'
  },
  len = 5,
  angle = 90,
  max_iterations = 7
)

let hilbert4 = new L_system(
  axiom = 'L', 
  rules = {
    L: '+R-LFL-RF+',
    R: '-LF+RFR+L-',
    A: 'BF+AFA+FB-',
    B: '--AF-BFB-FA+'
  },
  len = 1,
  angle = 90,
  max_iterations = 7
)

let triangles = new L_system(
  axiom = 'F+F+F',
  rules = {
    F: 'F-F+F'
  },
  len = 14,
  angle = 120,
  max_iterations = 10
)

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

// n = 3
let hex_steps = new L_system(
  axiom = 'F+F+F+F+F+F+F',
  rules = {
    F: '+F+F-F+F+F'
  },
  len = 15,
  angle = 60,
  max_iterations = 10
)

// n = 3
let penta_blade = new L_system(
  axiom = 'F+F+F+F+F',
  rules = {
    F: '+F+F-F+F'
  },
  len = 15,
  angle = 72,
  max_iterations = 10
)

// n = 3, or any
let penta_blade2 = new L_system(
  axiom = 'F++F++F++F++F',
  rules = {
    F: '+F+F-F+F'
  },
  len = 15,
  angle = 72,
  max_iterations = 10
)

// n = 3
let penta_blade_star = new L_system(
  axiom = 'F++F++F++F++F',
  rules = {
    F: '+F+F-F+F-F+F'
  },
  len = 15,
  angle = 72,
  max_iterations = 10
)

let some_board = new L_system(
  axiom = 'F+F+F+F',
  rules = {
    F: 'FF+F+F+F+FF'
  },
  len = 10,
  angle = 90,
  max_iterations = 10
)

let wavey_goodness_board = new L_system(
  axiom = 'F+F+F+F',
  rules = {
    F: 'FF+fF+fF+F+FF'
  },
  len = 5,
  angle = 90,
  max_iterations = 10
)

let hex_board1 = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: 'FF+F+F+F+F+F+FFF'
  },
  len = 6,
  angle = 60,
  max_iterations = 10
)

let hex_wavy_star = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: 'F-FF+F+FF+F-FF+F'
  },
  len = 6,
  angle = 60,
  max_iterations = 10
)

let hex_grid = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: 'f[-F+F+F+F+F+F]'
  },
  len = 20,
  angle = 60,
  max_iterations = 10
)

let hex_grid_spaced = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: 'f[-fF+F+F+F+F+F]'
  },
  len = 20,
  angle = 60,
  max_iterations = 10
)

let rainbow_wreath1 = new L_system(
  axiom = 'F--F--F--F--F--F--F--F',
  rules = {
    F: 'FF+[+F-F-F-F]-[-F+F+F+F]'
  },
  len = 12,
  angle = 22.5,
  max_iterations = 5
)

let rainbow_wreath2 = new L_system(
  axiom = 'F--F--F--F--F--F--F--F--F--F--F--F--F--F--F--F--F--F--F--F',
  rules = {
    F: 'F+[+F-F-F-F]-[-F+F+F+F]'
  },
  len = 12,
  angle = 9,
  max_iterations = 4
)

let tree1 = new L_system(
  axiom = '++++F',
  rules = {
    F: 'FF+[+F-F-F]-[-F+F+F]'
  },
  len = 10,
  angle = 22.5,
  max_iterations = 5
)

let quadratic_gosper = new L_system(
  axiom = '-YF',
  rules = {
    X: 'XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-',
    Y: '+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY'
  },
  len = 10,
  angle = 90,
  max_iterations = 10
)

let koch_snowflake = new L_system(
  axiom = 'F++F++F',
  rules = {
    F: 'F-F++F-F'
  },
  len = 1,
  angle = 60,
  max_iterations = 7
)



let dragon_curve = new L_system(
  axiom = 'FX',
  rules = {
    X: 'X+YF+',
    Y: '-FX-Y'
  },
  len = 5,
  angle = 90,
  max_iterations = 12
)


let weird_sun = new L_system(
  axiom = 'FF',
  rules = {
    F: '+F-F++F-F+F',
  },
  len = 5,
  angle = 30,
  max_iterations = 12
)

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

let fractal = new L_system(
  axiom = 'AB',
  rules = {
    // 'F': 'AFB',
    'A': '-BF+AFA+FB-',
    'B': '+AF-BFB-FA+'
    // 'F': '+F-F'
  },
  len = 5,
  angle = 90,
  max_iterations = 8
)

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length, P2D).center('horizontal')
  noLoop()


  background(0)
  translate(width * 0.5, height * 0.5)
  // rotate(radians(25))

  for (let i = 0; i < 5; i++) {
    penrose.getNextInstructions()
    print(penrose.instructions)
  }
  penrose.draw({len: map(length, 300, 2000, 20, 40), mode: 'absolute', colormode: 'rainbow', show: false})
  // print(fractal.turtle.lines.length)
  colorMode(HSB, penrose.turtle.lines.length, 100, 100)
  for (let [i, l] of penrose.turtle.lines.entries()) {
    stroke(i, 100, 100)
    // stroke(255)
    line(l.x1, l.y1, l.x2, l.y2)
  }
  // let num_copies = 5,
  //     num_iterations = 4;
  // for (let i = 0; i < num_copies; i++) {
  //   let f = fractal.copy({len: fractal.len / (i+1)})
  //   print(f)
  //   for (let j = 0; j < num_iterations; j++) {
  //     f.getNextInstructions()
  //   }
  //   f.draw({mode:'absolute', colormode:'rainbow'})
  //   print(f.turtle.lines)
  //   // fractal4.getNextInstructions()
  // }
  // rotate(radians(21))

  // fractal.draw()
  // fractal.draw({mode:'absolute', colormode:'rainbow', colors_ratio:1/10})
  // print(fractal.turtle.lines)
  // print(fractal.instructions)
}

// function draw() {
//   background(0)
//   translate(width * 0.2, height * 0.70)
//   fractal.draw({len: map(length, 300, 2000, 2, 20), mode: 'relative', colormode: 'rainbow', show: true})
  
// }

function mouseWheel() {
  scale(2)
}