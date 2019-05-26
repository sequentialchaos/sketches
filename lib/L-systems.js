
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
  for (let c of instructions) {
    if (c in rules) {
      new_instructions += rules[c]
    } else {
      new_instructions += c
    }
  }
  return new_instructions
}

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


  draw({x=0, y=0, len=self.len, angle=self.angle, colormode='normal', colors_ratio=1/1.2} = {}) {
    translate(x, y)
    let maxStrokeWeight = map(len, 0, 200, 1, 8)
    strokeWeight(map(self.iterations, 1, self.max_iterations, maxStrokeWeight, 1))
    self.turtle = new Turtle(x, y, len, angle, self.instructions)
    if (colormode == 'normal') {
      stroke(255)
      self.turtle.go()
    } else if (colormode == 'rainbow') {
      self.turtle.goRainbow()
    } else if (colormode == 'rainbow remix') {
      self.turtle.goRainbowRemix({colors_ratio:colors_ratio})
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

  goRainbowRemix({x=self.x, y=self.y, len=self.len, angle=self.angle, colors_ratio=1/7} = {}) {
    // Go rainbow turtle, go! :D
    push()
    let t = int(self.instructions.count('F') * 1.05 * colors_ratio)
    colorMode(HSB, t)
    let a = radians(angle)
    let count = 0
    for (let i of self.instructions) {
      if (i == '+') {
        rotate(-a)
      } else if (i == '-') {
        rotate(a)
      } else if (i == 'F') {
        stroke(count % t, t, t)
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