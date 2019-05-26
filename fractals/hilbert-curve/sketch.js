let j = 0
let num_iterations = 8
let axiom = 'L'
let rules = {
  L: '+RF-LFL-FR+',
  R: '-LF+RFR+FL-'
}

let instructions = axiom

function setup() {
  const length = min(innerWidth, innerHeight)
  if (length == innerWidth) {
    createCanvas(length, length * 3/2).center('horizontal')
  } else {
    createCanvas(length * 3/2, length).center('horizontal')
  }
  

  noLoop()

  background(0)

  // for (let i = 0; i < num_iterations; i++) {
  //   // console.log(mapInstructions(instructions, rules))
  //   instructions = nextInstructions(instructions, rules)
  // }
  // console.log(instructions)
  // // translate(width)
  // stroke(255)

  // translate(width * 0.025, height * 0.975)
  // strokeWeight(map(num_iterations, 1, 9, 10, 1))
  // rainbowTurtleRemix(instructions, width / (pow(2, num_iterations) - 1) * 0.95, 90)
  
  // drawHilbertRainbowRemix(4, 0, 0, width/2, height/2, 0.025, c)
  // drawHilbertRainbowRemix(5, width/2, 0, width/2, height/2, 0.025, c)
  // drawHilbertRainbowRemix(6, 0, height/2, width/2, height/2, 0.025, c)
  // drawHilbertRainbowRemix(7, width/2, height/2, width/2, height/2, 0.025, c)
  let c = 2
  let d = 3
  let count = 1
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < d; j++) {
      let x = j * width / d,
          y = i * height / c;
      // drawHilbertRainbowRemix(count, x, y, width/d, height/d, 0.05, 1/d)
      drawHilbertRainbow(count, x, y, width/d, height/c, 0.05)
      count++
    }
  }
}

function draw() {
    // print(i)
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

String.prototype.count = function(s) {
  let c = 0
  for (let i = 0; i < this.length - s.length + 1; i++) {
    if (this.substring(i, i + s.length) == s) {
      c++
    }
  }
  return c
}

function nextInstructions(instructions, rules) {
  let new_instructions = ''
  for (let i of instructions) {
    if (i in rules) {
      new_instructions += rules[i]
    } else {
      new_instructions += i
    }
  }
  return new_instructions
}

function turtle(instructions, len, angle) {
  // Go turtle, go! <3
  let a = radians(angle)
  let t = instructions.length * 1.1
  for (let i of instructions) {
    if (i == '+') {
      rotate(-a)
    } else if (i == '-') {
      rotate(a)
    } else if (i == 'F') {
      line(0, 0, len, 0)
      translate(len, 0)
    } else if (i == '[') {
      push()
    } else if (i == ']') {
      pop()
    }
  }
}

function rainbowTurtle(instructions, len, angle) {
  // Go rainbow turtle, go! <3
  let a = radians(angle)
  let count = 0;
  let t = instructions.count('F') * 1.1
  for (let i of instructions) {
    colorMode(HSB, t)
    stroke(count, t, t * 0.9)
    if (i == '+') {
      rotate(-a)
    } else if (i == '-') {
      rotate(a)
    } else if (i == 'F') {
      line(0, 0, len, 0)
      translate(len, 0)
      count++
    } else if (i == '[') {
      push()
    } else if (i == ']') {
      pop()
    }
  }
}

function rainbowTurtleRemix(instructions, len, angle, colors_ratio) {
  // Go rainbow turtle, go! <3
  let a = radians(angle)
  let count = 0;
  let t = instructions.count('F') * 1.05
  let num_colors = int(t * colors_ratio)
  if (num_colors == 1) {
    num_colors = 3
  }
  for (let i of instructions) {

    colorMode(HSB, num_colors)
    stroke(count % num_colors, num_colors, num_colors * 0.9)
    if (i == '+') {
      rotate(-a)
    } else if (i == '-') {
      rotate(a)
    } else if (i == 'F') {
      line(0, 0, len, 0)
      translate(len, 0)
      count++
    } else if (i == '[') {
      push()
    } else if (i == ']') {
      pop()
    }
  }
}

function mapInstructions(instructions, rules) {
  let m = {
    turn: [],
    draw: [],
    rule: []
  }

  for (let i = 0; i < instructions.length; i++) {
    let c = instructions[i]
    if (c == '+' || c == '-') {
      m.turn.push(i+1)
    } else if (c == 'F') {
      m.draw.push(i+1)
    } else if (c in rules) {
      m.rule.push(i+1)
    }
  }
  return m
}

function getHilbertInstructions(iterations) {
  if (iterations < 1) {
    iterations = 1
  }
  if (iterations > 9) {
    iterations = 9
  }
  let axiom = 'L'
  let rules = {
    L: '+RF-LFL-FR+',
    R: '-LF+RFR+FL-'
  }
  let instructions = axiom
  for (let i = 0; i < iterations; i++) {
    instructions = nextInstructions(instructions, rules)
  }
  return instructions
}

function drawHilbertRainbow(iterations, x, y, w, h, paddingRatio) {
  let instructions = getHilbertInstructions(iterations)
  push()
  translate(x + w * paddingRatio, y + h * (1 - paddingRatio))
  let maxStrokeWeight = map(w, 0, 2000, 1, 20)
  strokeWeight(map(iterations, 1, 9, maxStrokeWeight, 1))
  rainbowTurtle(instructions, w / (pow(2, iterations) - 1) * (1 - 2 * paddingRatio), 90)
  pop()
}

function drawHilbertRainbowRemix(iterations, x, y, w, h, paddingRatio, colors_ratio) {
  let instructions = getHilbertInstructions(iterations)
  push()
  translate(x + w * paddingRatio, y + h * (1 - paddingRatio))
  let maxStrokeWeight = map(w, 0, 2000, 1, 20)
  strokeWeight(map(iterations, 1, 9, maxStrokeWeight, 1))
  rainbowTurtleRemix(instructions, w / (pow(2, iterations) - 1) * (1 - 2 * paddingRatio), 90, colors_ratio)
  pop()
}

class L_system {
  constructor(axiom, rules, max_iterations) {
    self.axiom = axiom
    self.rules = rules
    self.instructions = axiom
    self.iterations = 0
    self.max_iterations = max_iterations
    self.instructions_stack = [axiom]
  }

  getNextInstructions() {
    if (self.iterations >= self.max_iterations || self.direction == -1) {
      self.iterations -= 1
      self.instructions = self.instructions_stack[self.iterations]
      return
    }
    let next_instructions = ''
    for (let i of instructions) {
      if (i in rules) {
        next_instructions += rules[i]
      } else {
        next_instructions += i
      }
    }
    self.instructions = next_instructions
    self.iterations += 1
  }


}
