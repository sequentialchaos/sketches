

let p = 0.025
let j = 0


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
  // noLoop()

  background(0)

  // for (let i = 0; i < num_iterations; i++) {
  //   // console.log(mapInstructions(instructions, rules))
  //   instructions = nextInstructions(instructions, rules)
  // }
  // console.log(instructions)
  // // translate(width)
  // stroke(255)
  
  // strokeWeight(map(num_iterations, 1, 9, 10, 1))
  // rainbowTurtleRemix(instructions, width / (pow(2, num_iterations) - 1) * 0.95, 90)
  // drawHilbertRainbow(6, 0, 0, width, height, 0.025)


  print(hilbert.iterations, hilbert.len, hilbert.angle)
  // for (let i = 0; i < 19; i++) {
  //   hilbert.getNextInstructions()
  // }
  let leng = width / (pow(2, hilbert.iterations) - 1) * (1 - 2*p)
  hilbert.draw({len:leng, mode:'rainbow remix'})
  print(hilbert.iterations)
}

function mouseClicked() {
  hilbert.getNextInstructions()
}


function draw() {
  background(0)
  translate(width * p, height * (1 - p))
  let l = width / (pow(2, hilbert.iterations) - 1) * (1 - 2*p)
  hilbert.draw({len:l, colormode:'rainbow remix'})
  //   // print(i)
  // translate(width * 0.015, height * 0.98)
  // let i = instructions[j]
  // console.log(i)
  // let a = radians(90)
  // let len = width / pow(2, num_iterations)
  // if (i == '+') {
  //   rotate(-a)
  //   // console.log('turned left')
  // } else if (i == '-') {
  //   rotate(a)
  //   // console.log('turned right')
  // } else if (i == 'F') {
  //   line(0, 0, len, 0)
  //   translate(len, 0)
  //   // console.log(count + ') made a path forward')
  //   // count++
  // } else if (i == '[') {
  //   push()
  // } else if (i == ']') {
  //   pop()
  // }
  // j++
}

// String.prototype.count = function(s) {
//   let c = 0
//   for (let i = 0; i < this.length - s.length + 1; i++) {
//     if (this.substring(i, i + s.length) == s) {
//       c++
//     }
//   }
//   return c
// }

// function nextInstructions(instructions, rules) {
//   let new_instructions = ''
//   for (let i of instructions) {
//     if (i in rules) {
//       new_instructions += rules[i]
//     } else {
//       new_instructions += i
//     }
//   }
//   return new_instructions
// }

// function turtle(instructions, len, angle) {
//   // Go turtle, go! <3
//   let a = radians(angle)
//   let t = instructions.length * 1.1
//   for (let i of instructions) {
//     if (i == '+') {
//       rotate(-a)
//     } else if (i == '-') {
//       rotate(a)
//     } else if (i == 'F') {
//       line(0, 0, len, 0)
//       translate(len, 0)
//     } else if (i == '[') {
//       push()
//     } else if (i == ']') {
//       pop()
//     }
//   }
// }

// function rainbowTurtle(instructions, len, angle) {
//   // Go rainbow turtle, go! <3
//   let a = radians(angle)
//   let count = 0;
//   let t = instructions.count('F') * 1.1
//   for (let i of instructions) {
//     colorMode(HSB, t)
//     stroke(count, t, t * 0.9)
//     if (i == '+') {
//       rotate(-a)
//     } else if (i == '-') {
//       rotate(a)
//     } else if (i == 'F') {
//       line(0, 0, len, 0)
//       translate(len, 0)
//       count++
//     } else if (i == '[') {
//       push()
//     } else if (i == ']') {
//       pop()
//     }
//   }
// }

// function rainbowTurtleRemix(instructions, len, angle) {
//   // Go rainbow turtle, go! <3
//   let a = radians(angle)
//   let count = 0;
//   let t = 7//instructions.count('F') * 1.1
//   for (let i of instructions) {
//     colorMode(HSB, t)
//     stroke(count % 7, t, t * 0.9)
//     if (i == '+') {
//       rotate(-a)
//     } else if (i == '-') {
//       rotate(a)
//     } else if (i == 'F') {
//       line(0, 0, len, 0)
//       translate(len, 0)
//       count++
//     } else if (i == '[') {
//       push()
//     } else if (i == ']') {
//       pop()
//     }
//   }
// }

// function mapInstructions(instructions, rules) {
//   let m = {
//     turn: [],
//     draw: [],
//     rule: []
//   }

//   for (let i = 0; i < instructions.length; i++) {
//     let c = instructions[i]
//     if (c == '+' || c == '-') {
//       m.turn.push(i+1)
//     } else if (c == 'F') {
//       m.draw.push(i+1)
//     } else if (c in rules) {
//       m.rule.push(i+1)
//     }
//   }
//   return m
// }

// function getHilbertInstructions(iterations) {
//   if (iterations < 1) {
//     iterations = 1
//   }
//   if (iterations > 9) {
//     iterations = 9
//   }
//   let axiom = 'L'
//   let rules = {
//     L: '+RF-LFL-FR+',
//     R: '-LF+RFR+FL-'
//   }
//   let instructions = axiom
//   for (let i = 0; i < iterations; i++) {
//     instructions = nextInstructions(instructions, rules)
//   }
//   return instructions
// }

// function drawHilbertRainbow(iterations, x, y, w, h, paddingRatio) {
//   let instructions = getHilbertInstructions(iterations)
//   translate(x + w * paddingRatio, y + h * (1 - paddingRatio))
//   let maxStrokeWeight = map(w, 0, 2000, 1, 20)
//   strokeWeight(map(iterations, 1, 9, maxStrokeWeight, 1))
//   rainbowTurtle(instructions, w / (pow(2, iterations) - 1) * (1 - 2 * paddingRatio), 90)
// }


