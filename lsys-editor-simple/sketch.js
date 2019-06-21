
let color_mode = 'rainbow'


function setup() {
  width_ratio = 0.7
  createCanvas(innerWidth * width_ratio, innerHeight)
  // frameRate(10)
  noLoop()
  offset = createVector(0, 0)
  poffset = createVector(0, 0)


  left_width = innerWidth - width
  slider_width_ratio = 0.9

  createP('L-Systems Editor').style('font-weight', 'bold')

  angle_display = createP('angle:')
  angle = createSlider(0, 360, 36, 0.01)
  angle.input(angleChanges)

  length_display = createP('step length:')
  length = createSlider(0, height * 0.6, 30, 1)
  length.input(lengthChanges)

  iterations_display = createP('# of iterations:')
  iterations = createSlider(0, 5, 2, 1)
  iterations.input(iterationsChange)

  createP('Axiom').style('font-weight', 'bold')
  axiom = createElement('textarea').size(left_width * 0.4, 35)
  axiom.elt.innerHTML = '[B]++[B]++[B]++[B]++[B]'
  rule_string = `A: CF++DF----BF[-CF----AF]++
  B: +CF--DF[---AF--BF]+
  C: -AF++BF[+++CF++DF]-
  D: --CF++++AF[+DF++++BF]--BF
  F: 
`.replace(/ /g,'')

  createP('Rules').style('font-weight', 'bold')
  rules = createElement('textarea')
  rules.elt.innerHTML = rule_string

  setSizes()
  
  createP()
  color_select = createSelect()
  color_select.option('rainbow')
  color_select.option('rainbow remix')
  color_select.option('white')
  color_select.changed(colorChanged)

  createP()
  button = createButton("Export HPGL")
  button.mousePressed(buttonMousePressed)

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


  
  smooth()
}

function draw() {
  background(0)

  push()
  translate(width/2, height/2)
  translate(offset.x, offset.y)
  if (color_mode == 'white') {
    stroke('white')
    l_system.draw({len:length.value(), mode: 'absolute', colormode:'normal'})
  } else {
    l_system.draw({len:length.value(), mode: 'absolute', colormode:color_mode, colors_ratio:1/10})
  }

  pop()
}

function mousePressed() {
  mouse = createVector(mouseX, mouseY)
  poffset.set(offset)
}

function mouseDragged() {
  offset.x = mouseX - mouse.x + poffset.x
  offset.y = mouseY - mouse.y + poffset.y
  redraw()
}

function windowResized() {
  resizeCanvas(innerWidth * width_ratio, innerHeight)
  setSizes()

}

function setSizes() {
  left_width = innerWidth - width
  angle.size(left_width * slider_width_ratio, 20)
  length.size(left_width * slider_width_ratio, 20)
  iterations.size(left_width * slider_width_ratio, 20)
  axiom.size(left_width * slider_width_ratio, 35)
  rules.size(left_width * slider_width_ratio, 100)
}

function parseRules(rule_string) {
  let unparsed_rules = rule_string.split("\n")
  let rules = {}
  for (let unparsed_rule of unparsed_rules) {
    if (unparsed_rule.trim() !== '' ) {
      if (!isRuleValid(unparsed_rule)) {
        break
      }
      parts = unparsed_rule.split(":")
      name = parts[0].trim()
      rule = parts[1].trim()
      rules[name] = rule
    }
  }
  return rules
}

function angleChanges() {
  angle_display.elt.innerHTML = `angle Δ: ${angle.value()}°`
  l_system.angle = angle.value()
  redraw()
}

function lengthChanges() {
  length_display.elt.innerHTML = `step length: ${length.value()} px`
  redraw()
}

function iterationsChange() {
  iterations_display.elt.innerHTML = `# of iterations: ${iterations.value()}`
  l_system.iterations = 0
  l_system.instructions = axiom.value()
  for(let i=0; i<iterations.value(); i++) {
    l_system.getNextInstructions()
  }
  redraw()
}


function axiomChanges() {
  let new_axiom = axiom.value()
  if (isAxiomValid(new_axiom)) {
    l_system.axiom = new_axiom
    l_system.iterations = 0
    l_system.instructions = new_axiom
    for(let i=0; i<iterations.value(); i++) {
      l_system.getNextInstructions()
    }
  }
  redraw()
}

function rulesChange() {
  let new_rules = parseRules(rules.value())
  l_system.rules = new_rules
  l_system.iterations = 0
  l_system.instructions = axiom.value()
  for(let i=0; i<iterations.value(); i++) {
    l_system.getNextInstructions()
  }
  redraw()
}

function colorChanged() {
  color_mode = color_select.value()
  redraw()
}

function buttonMousePressed() {
  let plot_txt = formatForPlotterAutoCenter(l_system.turtle.lines, width)
  let words = ['cow', 'butter', 'peanut', 'cat', 'pillow', 'oven', 'meerkat', 'eskimo', 'hope', 'joy', 'oolong', 'sunset', 'stop', 'tree', 'plant', 'alpaca', 'cupcake', 'veggie', 'booksmart', 'dijsktra', 'sammet', 'hopper', 'waffle', 'puma', 'backpack', 'park', 'bridge', ]
  download(`hpgl_${random(words)}_${int(random(0, 20000))}.txt`, plot_txt)


  // console.log("hi")
}

function isRuleValid(rule_string) {
  return /^\s*[A-Z]\s*:\s*[A-Zf\+\-\[\]]*\s*$/.test(rule_string)
}

function isAxiomValid(rule_string) {
  return /\s*[A-Zf\+\-\[\]]*\s*$/.test(rule_string)
}


// from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

// Start file download.

