let settings, gui

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // frameRate(30)
  background(0)

  settings = new controls()
  gui = new dat.GUI()
  gui.add(settings, 'mode', ['quad', 'other'])
  gui.add(settings, 'draw_mode', ['draw', 'erase'])
  draw_mode = 'draw'

}

function draw() {
  drawAxes(settings.mode)

  if (mouseIsPressed) {
    let x = mouseX,
      y = mouseY;

    if (mouseButton == RIGHT) {
      draw_mode = 'erase'
    } else {
      draw_mode = 'draw'
    }
    mark(x, y, draw_mode)
    duplicate(x, y, 'quad', mark, draw_mode)

  }
}

// function mouseClicked() {
//   let x = mouseX,
//     y = mouseY;
//   if (x < width / 2 && y < height / 2) {
//     mark(x, y)
//   }
// }

function mark(x, y, draw_mode) {
  noStroke()
  if (draw_mode == 'draw') {
    fill(255)
    circle(x, y, 6)
  } else {
    fill(0)
    circle(x, y, 30)
  }

}

function duplicate(x, y, mode, drawFunction, draw_mode) {
  push()
  if (mode == 'quad') {
    if (x < width / 2) {
      if (y < width / 2) {
        translate(width / 2, 0)
        drawFunction(x, y, draw_mode)
        translate(0, height / 2)
        drawFunction(x, y, draw_mode)
        translate(-width / 2, 0)
        drawFunction(x, y, draw_mode)
      } else {
        translate(0, -height / 2)
        drawFunction(x, y, draw_mode)
        translate(width / 2, 0)
        drawFunction(x, y, draw_mode)
        translate(0, height / 2)
        drawFunction(x, y, draw_mode)
      }
    } else {
      if (y < height / 2) {
        translate(0, height / 2)
        drawFunction(x, y, draw_mode)
        translate(-width / 2, 0)
        drawFunction(x, y, draw_mode)
        translate(0, -height / 2)
        drawFunction(x, y, draw_mode)
      } else {
        translate(-width / 2, 0)
        drawFunction(x, y, draw_mode)
        translate(0, -height / 2)
        drawFunction(x, y, draw_mode)
        translate(width / 2, 0)
        drawFunction(x, y, draw_mode)
      }
    }
  }
  pop()
}



function controls() {
  this.mode = 'quad'
  this.draw_mode = 'draw'
}

function unitShape(s, vertices) {
  beginShape()
  for (let v of vertices) {
    vertex(s * v.x, s * v.y)
  }
  endShape()
}

function drawShapes(f, s, n, angle) {
  for (let i = 0; i < n + 5; i++) {
    for (let j = 0; j < n + 5; j++) {
      let x = map(i, 0, n, 0, width),
        y = map(j, 0, n, 0, height);
      push()
      translate(x + s / 2, y + s / 2)
      rotate(angle)
      translate(s / 2, s / 2)
      f(s)
      pop()
    }
  }
}

function drawAxes(mode) {
  push()
  if (mode == 'quad') {
    stroke(255)
    strokeWeight(3)
    line(width / 2, 0, width / 2, height)
    line(0, height / 2, width, height / 2)
  }
  pop()
}