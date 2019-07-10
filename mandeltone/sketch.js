let a = [0, 0, 0]
let b = [0, 0, 0]
const max_n = 100
const step_duration = 500

function preload() {
  synth = new Tone.Synth().toMaster()
}

function setup() {
  // let length = min(innerWidth, innerHeight)
  // if (length == innerWidth) {
  //   createCanvas(length, floor(length * 0.80)).center('horizontal')
  // } else {
  //   createCanvas(floor(length * 1.25), length).center('horizontal')
  // }
  canvas = createCanvas(innerWidth, innerHeight)
  canvas.parent("canvas")
  // noLoop()
  // pixelDensity(1)
  // loadPixels()
  // background(40)

  // updatePixels()
  start_time = 0
  last_step = -1
}

function mousePressed() {
  redraw()

  start_time = millis()
  last_step = -1
}

function draw() {
  clear()
  stroke(255)

  x = mouseX
  y = mouseY
  a[0] = map(x, 0, width, -2, 0.5)
  b[0] = map(y, 0, height, -1, 1)
  a[1] = a[0]
  b[1] = b[0]
  let n = 0

  passed_time = millis() - start_time
  step = Math.floor(passed_time/step_duration)
  print(step)

  while (n < step) {
    olda0 = map(a[0], -2, 0.5, 0, width)
    oldb0 = map(b[0], -1, 1, 0, height)

    a[2] = a[0]*a[0] - b[0]*b[0]
    b[2] = 2*a[0]*b[0]
    a[0] = a[2] + a[1]
    b[0] = b[2] + b[1]
    
    map_x = map(a[0], -2, 0.5, 0, width)
    map_y = map(b[0], -1, 1, 0, height)
    line(map_x, map_y, olda0, oldb0)

    if (abs(a[0] + b[0]) > 16) {
      break
    }
    n++

    if (step > last_step) {
      last_step = step
      distance = Math.sqrt(a[0]*a[0] + b[0]*b[0])
      frequency = distance*1000
      // Beware of the attacking triggers:
      synth.triggerAttackRelease(frequency, "128n") // goodbye discord oh nooo uhhh
    }

      // let bright = map(n, 0, max_n, 0, 255)
      // if (n === max_n) {
      //   bright = 0
      // }

      // let p = (x + y * width) * 4
      // pixels[p + 0] = bright
      // pixels[p + 1] = bright
      // pixels[p + 2] = bright
      // pixels[p + 3] = 255
  }
}
