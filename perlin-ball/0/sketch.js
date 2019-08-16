
let t = 0
let dt = 0.007
let offset = 100000
let num_segments = 10
let trail_time = 0.05

function setup() {
  createCanvas(innerWidth, innerHeight)
  // noLoop()
  frameRate(30)
  colorMode(HSB, 100, 100, 100)
}

function draw() {
  background(0)

  fill(100)
  // circle(500, 500, 50)
  caterpillar(50, width, height, t, trail_time, offset, num_segments)
  // x = noise(t) * width
  // y = noise(t + offset) * height

  // fill(0, 80, 80)
  // circle(x, y, 50)

  // fill(30, 80, 80)
  // x2 = noise(t + trail_time) * width
  // y2 = noise(t + trail_time + offset) * height
  // circle(x2, y2, 50)

  // noises = moreNoise(t, offset, width, height, 0.17, 4)
  // // print(noises)
  // for (let i = 0; i < noises[0].length; i++) {
  //   x = noises[0][i]
  //   y = noises[1][i]
  //   fill(200)
  //   circle(x, y, 50)
  // }

  t += dt
}

// function moreNoise(time, offset, w, h, ratio, iterations) {
//   let x = []
//   let y = []
//   x.push(noise(time) * w)
//   y.push(noise(time + offset) * h)
//   for (let i = 0; i < iterations; i++) {
//     new_x = noise(x[i] * pow(ratio, i+0.5)) * w
//     new_y = noise(y[i] * pow(ratio, i+0.5) + offset) * h
//     x.push(new_x)
//     y.push(new_y)
//   }
//   return [x, y]
// }


function caterpillar(d, w, h, t, trail_time, offset, num_segments) {
  let coords = []
  for (let i = 0; i < num_segments; i++) {
    let x = noise(t + trail_time * i) * w
    let y = noise(t + trail_time * i + offset) * h
    coords.push([x,y])
  }
  for (let coord of coords) {
    circle(coord[0], coord[1], d)
  }
}