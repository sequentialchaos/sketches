function setup() {
  createCanvas(innerWidth, innerHeight)
  background(0)
  frameRate(2)
  x_g = 0
  l_g = random(10, 90)
  w_g = 0
  // for (let i = 0; i < num_colors; i++) {
  //   h = map(i, 0, num_colors, 0, 360)
  //   x = map(i, 0, num_colors, 0, width)
  //   c = hpluvToColor(h, 100, 70)
  //   // w = width / num_colors
  //   w = random(10, 200)
    
  //   fill(c)
  //   noStroke()
  //   rect(x, 0, x + w, height)
  // }

  // x = 0
  // l = random(10, 90)
  // while(x <= width) {
  //   // Random color and width
  //   h = random(0, 360)
  //   w = random(10, 200)
  //   c = hpluvToColor(h, 100, l)
  //   fill(c)
  //   noStroke()
  //   rect(x, 0, x + w, height)

  //   // increase x
  //   x += w;
  // }
}

function draw_rectangle(start, wide, lightness) {
  // Random color and width
  h = random(0, 360)
  c = hpluvToColor(h, 100, lightness)
  fill(c)
  noStroke()
  rect(start-1, 0, wide+1, height)
}

function animate_rectangle(start) {
  // Random color and width
  h = random(0, 360)
  c = hpluvToColor(h, 100, lightness)

  fill(c)
  noStroke()

  rect(start-1, 0, wide+1, height)
}
function draw() {
  if(x_g > width) {
    l_g = random(10, 90)
    x_g = 0
  }
  w_g = random(10, 150)
  draw_rectangle(x_g, w_g, l_g)

  x_g = x_g + w_g
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

function hsluvToColor(h, s, l) {
  // h -> hue between 0 and 360,
  // s -> saturation between 0 and 100,
  // l -> lightness between 0 and 100.
  push()
  colorMode(RGB, 1, 1, 1)
  rgb = hsluv.hsluvToRgb([h, s, l])
  let c = color(rgb[0], rgb[1], rgb[2])
  pop()
  return c
}