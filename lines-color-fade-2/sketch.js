function setup() {
  createCanvas(innerWidth, innerHeight)
  background(0)
  frameRate(30)
  x = 0
  x_prev = 0
  dx = 4

  l = 80

  min_width = 10
  max_width = 150
  w = random(min_width, min_width * 4)

  h = random(0, 360)

  looping = true
}

function draw() {
  noStroke()
  fill(hpluvToColor(h, 100, l))
  rect(x, 0, dx+1, height)
  x += dx

  if (x > w + x_prev) {
    x_prev = x
    if (Math.random() < 0.35) {
      h = random(0, 360)
    } else {
      r = random(-50, 50)
      h += r
    }
    if (Math.random() < 0.07) {
      w = random(min_width, max_width)
    } else {
      w = random(min_width, min_width * 4)
    }
  }

  if (x > width) {
    background(0)
    x = 0
    x_prev = 0
    l = random(60, 90)
    h = random(0, 360)
  }
}

function hpluvToColor(h, p, l) {
  // h -> hue between 0 and 360,
  // s -> saturation between 0 and 100,
  // l -> lightness between 0 and 100.
  push()
  colorMode(RGB, 1, 1, 1)
  rgb = hsluv.hpluvToRgb([h, p, l])
  let c = color(rgb[0], rgb[1], rgb[2])
  pop()
  return c
}

function mousePressed() {
  if (looping) {
    noLoop()
    looping = false
  } else {
    loop()
    looping = true
  }
}