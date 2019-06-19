function setup() {
  length = min(innerWidth, innerHeight)

  createCanvas(length, length).center('horizontal')
  frameRate(5)

  angle = createSlider(0, 360, 36, 1)
  angle.input(angleChanges)
  angle_display = createP()

  length = createSlider(0, 150, 30, 1)
  length.input(lengthChanges)
  length_display = createP()

  iterations = createSlider(0, 10, 2, 1)
  iterations.input(iterationsChange)
  iterations_display = createP()

  axiom = createInput('[B]++[B]++[B]++[B]++[B]')
  rule_string = `
  A: CF++DF----BF[-CF----AF]++
  B: +CF--DF[---AF--BF]+
  C: -AF++BF[+++CF++DF]-
  D: --CF++++AF[+DF++++BF]--BF
  F: 
  `
  rules = createElement('textarea').size(400, 100)
  rules.elt.innerHTML = rule_string

  l_system = new L_system(
    axiom.value(),
    parseRules(rules.value()),
    10,
    angle.value(),
    10
  )

  angleChanges()
  iterationsChange()
  lengthChanges()

  axiom.input(axiomChanges)
  createP()

  rules.input(rulesChange)


  parseRules(rule_string)


}

function parseRules(rule_string) {
  let unparsed_rules = rule_string.split("\n")
  let rules = {}
  for (let unparsed_rule of unparsed_rules) {
    if (unparsed_rule.trim() !== '' ) {
      if (!isRuleValid(unparsed_rule)) {
        createP('NO')
        break
      }
      createP('YES')
      parts = unparsed_rule.split(":")
      name = parts[0].trim()
      rule = parts[1].trim()
      rules[name] = rule
    }
  }
  return rules
}

function draw() {
  background(0)

  push()
  translate(width/2, height/2)
  l_system.draw({len:length.value(), colormode:'rainbow remix', colors_ratio:1/10})
  pop()
}

function angleChanges() {
  angle_display.elt.innerHTML = angle.value()
  l_system.angle = angle.value()
  print(l_system)
}

function lengthChanges() {
  length_display.elt.innerHTML = length.value()
}

function iterationsChange() {
  iterations_display.elt.innerHTML = iterations.value()
  l_system.iterations = 0
  l_system.instructions = axiom.value()
  for(let i=0; i<iterations.value(); i++) {
    l_system.getNextInstructions()
  }
}



function axiomChanges() {
  let new_axiom = axiom.value()
  if (isAxiomValid(new_axiom)) {
    l_system.axiom = new_axiom
  }
}

function rulesChange() {
  let new_rules = parseRules(rules.value())
  l_system.rules = new_rules
}

function isRuleValid(rule_string) {
  return /^\s*[A-Z]\s*:\s*[A-Zf\+\-\[\]]*\s*$/.test(rule_string)
}

function isAxiomValid(rule_string) {
  return /\s*[A-Zf\+\-\[\]]*\s*$/.test(rule_string)
}
