
class W_system {
  constructor(axiom, rules) {
    this.axiom = axiom
    this.rules = rules
  }
  getNthIteration(n) {
    this.instructions = this.axiom.split('')
    let next_instructions = []
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < this.instructions.length; j++) {
        let char = this.instructions[j]
        for (let rule of this.rules) {
          if (char == rule.key) {
            
          }
        }
        
      }
    }
  }

}

class Instructions {
  constructor({self=[], probability=1}) {
    this.self = self
    this.probability = probability
    this.accumulated_probability = 0
  }
}

class Rule {
  constructor({key='', instructions_set=[], is_stochastic=false}) {
    this.key = key
    this.instructions_set = instructions_set
    this.is_stochastic = is_stochastic
  }
  normalize_probabilities() {
    let sum = 0
    for (let i = 0; i < this.instructions_set.length; i++) {
      sum += this.instructions_set[i].probability
    }
    for (let i = 0; i < this.instructions_set.length; i++) {
      this.instructions_set[i].probability = this.instructions_set[i].probability / sum
    }
  }
  accumulate_probabilities() {
    this.normalize_probabilities()
    let accumulated_probability = 0
    for (let i = 0; i < this.instructions_set.length; i++) {
      accumulated_probability += this.instructions_set[i].probability
      this.instructions_set[i].accumulated_probability = accumulated_probability
    }
  }
}

let axiom = 'FFF'

let instructions_set = [
  new Instructions({
    self: ['F', '+', 'G'],
    probability: 0.5
  }),
  new Instructions({
    self: ['F', '-', 'F'],
    probability: 0.3
  }),
  new Instructions({
    self: ['F', '-', 'G'],
    probability: 0.7
  })
]

let rule = new Rule({
  key: 'F',
  is_stochastic: true,
  instructions_set: instructions_set
})

console.log(instructions_set)
console.log(rule)
rule.accumulate_probabilities()
console.log(rule)

let rules = {
  'F' : {
    is_stochastic: false,
    instructions: ['F', '-', 'F', '+', 'F']
  },
  'G' : {
    is_stochastic: true,
    instructions_set: [
      {
        instructions: ['F', '+', 'G'],
        probability: 0.4
      },
      {
        instructions: ['F', '-', 'G'],
        probability: 0.6
      }
    ]
  }
}

