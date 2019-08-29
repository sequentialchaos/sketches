
function setup() {
  createCanvas(innerWidth, innerHeight)
  noLoop()

  angle_slider = createSlider(0, 360, 90).position(20, 20).input(angleSliderChanges)
  length_slider = createSlider(0, 400, 100).position(20, 50).input(lengthSliderChanges)
  createButton("Cycle angle").position(20, 80).mousePressed(cycleAngle)
  createButton("Cycle length").position(20, 110).mousePressed(cycleLength)

  cycle_angle = false
  cycle_length = false

  instructions = "F"
  movement_map = {
    angle: radians(angle_slider.value()),
    length: length_slider.value(),
    "F": function() {
      line(0, 0, 0, this.length)
      translate(0, this.length)
    },
    "+": function() {
      rotate(this.angle)
    },
    "-": function() {
      rotate(-this.angle)
    }
  }
}

function draw() {
  translate(width / 2, height / 2)
  background(127)
  drawTurtle(instructions, movement_map)
  if (cycle_angle) {
    angle_slider.elt.value = (angle_slider.value() + 1) % 360
    movement_map.angle = radians(angle_slider.value())
  }
  if (cycle_length) {
    length_slider.elt.value = (length_slider.value() + 1) % 400
    movement_map.length = length_slider.value()
  }
}

function drawTurtle(instructions, movement_map) {
  for (let i = 0; i < instructions.length; i++) {
    movement_map[instructions[i]]()
  }
}

function getNextInstructions(instructions, rules) {

}

function angleSliderChanges() {
  movement_map.angle = radians(angle_slider.value())
  redraw()
}

function lengthSliderChanges() {
  movement_map.length = length_slider.value()
  redraw()
}

function cycleAngle() {
  if (cycle_angle) {
    cycle_angle = false
  } else {
    cycle_angle = true
  }
  loop()
}

function cycleLength() {
  if (cycle_length) {
    cycle_length = false
  } else {
    cycle_length = true
  }
  loop()
}