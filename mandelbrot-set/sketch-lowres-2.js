let a = [0, 0, 0]
let b = [0, 0, 0]
const max_n = 100
let c = 0.01

function setup() {
  let length = min(innerWidth, innerHeight)
  if (length == innerWidth) {
    createCanvas(length, floor(length * 0.8)).center('horizontal')
  } else {
    createCanvas(floor(length * 1.25), length).center('horizontal')
  }
  // createCanvas(innerWidth, innerHeight)
  // noLoop()
  frameRate(10)
  noStroke()
  colorMode(HSB, 1, 1, 1, 1)
  pixel_density = 10
}

function draw() {
  for (let x = 0; x < width; x += pixel_density) {
    for (let y = 0; y < height; y += pixel_density) {
      a[0] = map(x, 0, width, -2.5, 1)
      b[0] = map(y, 0, height, -1, 1)
      a[1] = a[0]
      b[1] = b[0]
      let n = 0
      while (n < max_n) {
        // a[2] = a[0] * a[0] * a[0] - 3 * a[0] * b[0] * b[0]
        // b[2] = 3 * a[0] * a[0] * b[0] - b[0] * b[0] * b[0]
        a[2] = a[0] * a[0] - a[1] * a[1]
        b[2] = -2 * a[0] * b[0] + b[0]
        a[0] = (a[2] + a[1]) * c
        b[0] = b[2]
        if (abs(a[0] + b[0]) > 2) {
          break
        }
        n++
      }

      let bright = map(n, 0, max_n, 0, 1)
      if (n === max_n) {
        bright = 0
      }
      h = map(Math.sqrt(x * x + y * y), 0, width / 2, 0, 1)
      fill(bright, bright, bright)
      rect(x, y, pixel_density, pixel_density)
    }
  }
  c += 0.001
}
