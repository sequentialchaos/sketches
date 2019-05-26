class L_system {
  constructor(axiom, rules, len, angle, max_iterations) {
    self.axiom = axiom
    self.rules = rules
    self.len = len
    self.angle = angle
    self.instructions = axiom
    self.iterations = 0
    self.max_iterations = max_iterations
    self.instructions_stack = [axiom]
    self.direction = 1
  }

  get len() {
    return self.len
  }

  get angle() {
    return self.angle
  }

  get iterations() {
    return self.iterations
  }

  getNextInstructions() {
    // print(self.iterations)
    if (self.direction == 1 && self.iterations >= self.max_iterations) {
      self.direction = -1
    }

    if (self.direction == -1 && self.iterations <= 1) {
      self.iterations = 1
      self.direction = 1
    }

    if (self.direction == -1) {
      self.iterations -= 1
      self.instructions = self.instructions_stack[self.iterations]
      return
    }

    let next_instructions = ''
    for (let i of self.instructions) {
      if (i in self.rules) {
        next_instructions += self.rules[i]
      } else {
        next_instructions += i
      }
    }
    self.instructions = next_instructions
    self.instructions_stack.push(self.instructions)
    self.iterations += 1
  }


  draw({x=0, y=0, len=self.len, angle=self.angle, colormode='normal'} = {}) {
    translate(x, y)
    let maxStrokeWeight = map(len, 0, 200, 1, 8)
    strokeWeight(map(self.iterations, 1, self.max_iterations, maxStrokeWeight, 1))
    self.turtle = new Turtle(x, y, len, angle, self.instructions)
    if (colormode == 'normal') {
      stroke(255)
      self.turtle.go()
    } else if (colormode == 'rainbow') {
      self.turtle.goRainbow()
    }

  }

}

class Turtle {
  constructor(x, y, len, angle, instructions) {
    self.x = x
    self.y = y
    self.len = len
    self.angle = angle
    self.instructions = instructions
  }
  
  go({x=self.x, y=self.y, len=self.len, angle=self.angle} = {}) {
    // Go turtle, go! :D
    print(x, y, len, angle)
    push()
    translate(x, y)
    let a = radians(angle)
    for (let i of self.instructions) {
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
    pop()
  }

  goRainbow({x=self.x, y=self.y, len=self.len, angle=self.angle} = {}) {
    // Go rainbow turtle, go! :D
    push()
    let t = self.instructions.count('F') * 1.05
    colorMode(HSB, t)
    let a = radians(angle)
    let count = 0
    for (let i of self.instructions) {
      if (i == '+') {
        rotate(-a)
      } else if (i == '-') {
        rotate(a)
      } else if (i == 'F') {
        stroke(count, t, t)
        line(0, 0, len, 0)
        translate(len, 0)
        count += 1
      } else if (i == '[') {
        push()
      } else if (i == ']') {
        pop()
      }
    }
    pop()
  }
}

let p = 0.025
let j = 0
let num_iterations = 8
let axiom = 'L'
let rules = {
  L: '+RF-LFL-FR+',
  R: '-LF+RFR+FL-'
}

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

  hilbert.getNextInstructions()
  print(hilbert.iterations, hilbert.len, hilbert.angle)
  // for (let i = 0; i < 19; i++) {
  //   hilbert.getNextInstructions()
  // }
  let leng = width / (pow(2, hilbert.iterations) - 1) * (1 - 2*p)
  hilbert.draw({len:leng, mode:'rainbow'})
  print(hilbert.iterations)
}

function mousePressed() {
  hilbert.getNextInstructions()
}


function draw() {
  background(0)
  
  translate(width * p, height * (1 - p))
  let l = width / (pow(2, hilbert.iterations) - 1) * (1 - 2*p)
  hilbert.draw({len:l, colormode:'rainbow'})
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

function rainbowTurtleRemix(instructions, len, angle) {
  // Go rainbow turtle, go! <3
  let a = radians(angle)
  let count = 0;
  let t = 7//instructions.count('F') * 1.1
  for (let i of instructions) {
    colorMode(HSB, t)
    stroke(count % 7, t, t * 0.9)
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
  translate(x + w * paddingRatio, y + h * (1 - paddingRatio))
  let maxStrokeWeight = map(w, 0, 2000, 1, 20)
  strokeWeight(map(iterations, 1, 9, maxStrokeWeight, 1))
  rainbowTurtle(instructions, w / (pow(2, iterations) - 1) * (1 - 2 * paddingRatio), 90)
}


