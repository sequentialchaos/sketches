
let t = 0
let dt = 0.014
let offset = 100000
let num_segments = 10
let trail_time = 0.053

function setup() {
  createCanvas(innerWidth, innerHeight)
  // noLoop()
  frameRate(30)
}

function draw() {
  background(0)

  fill(100)
  caterpillar(50, width, height, t, trail_time, offset, num_segments, fillColor='rainbow')

  t += dt
}


function caterpillar(d, w, h, t, trail_time, offset, num_segments, fillColor='white') {
  // wiggle
  let coords = []
  for (let i = 0; i < num_segments; i++) {
    let x = noise(t + trail_time * i) * w
    let y = noise(t + trail_time * i + offset) * h
    coords.push([x,y])
  }
  for (let [i, coord] of coords.entries()) {
    colorMode(HSB, 100, 100, 100)
    if (fillColor == 'white' || fillColor == 'black') {
      fill(fillColor)
    } else if (fillColor != 'rainbow') {
      
    } else {
      fill(90 - map(i, 0, num_segments, 0, 100), 70, 90)
    }
    circle(coord[0], coord[1], d)
    if (i == 0) {
      drawFace(coord[0], coord[1], d, 0.7, 'frown')
    }
    if (i == num_segments - 1) {
      drawFace(coord[0], coord[1], d, 0.7, 'smile')
    }
  }
}

function drawFace(x, y, d, mouth_ratio, type) {
  push()
  if (type == 'smile') {
    // eyes
    noStroke()
    fill('white')
    circle(x - d * 0.3, y - d * 0.2, d * 0.2)
    circle(x + d * 0.3, y - d * 0.2, d * 0.2)
    fill('black')
    circle(x - d * 0.3, y - d * 0.2, d * 0.1)
    circle(x + d * 0.3, y - d * 0.2, d * 0.1)

    // mouth
    fill('black')
    arc(x, y + d * 0.22, d * mouth_ratio, d * mouth_ratio, 0, PI)

  } else if (type == 'frown') {
    // eyes
    noStroke()
    fill('white')
    circle(x - d * 0.3, y - d * 0.22, d * 0.2)
    circle(x + d * 0.3, y - d * 0.22, d * 0.2)
    fill('black')
    circle(x - d * 0.3, y - d * 0.2, d * 0.1)
    circle(x + d * 0.3, y - d * 0.2, d * 0.1)

    // mouth
    fill('black')
    arc(x, y + d * 0.44, d * mouth_ratio, d * mouth_ratio, PI, TWO_PI)
  }
  pop()
}

// symmetric noise
/// butterfly
/// globe

// plotting noise
///