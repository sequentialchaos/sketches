let rollup = new L_system(
  axiom = 'A', 
  rules = {
    A: 'f[<<<<<F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F+F][A]'
  },
  len = 30,
  angle = 0,
  max_iterations = 5
)

function setup() {
  frame_rate = 60
  isLooping = true
  // length = min(innerWidth, innerHeight)
  createCanvas(innerWidth, innerHeight)
  frameRate(frame_rate)

  angle = 0
  angle_delta = 0.2

  for (let i = 0; i < rollup.max_iterations; i++) {
    rollup.getNextInstructions()
  }

  print(rollup)

  record = false
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: 'gif',
      workersPath: "../lib/",
      verbose: true
    })
    capturer.start()
  }
}

function draw() {
  background(0)
  translate(-width*0.1, height/2)
  scale(map(sin(frameCount/100), -1, 1, 0.5, 1))
  stroke(255, 0, 255)
  rollup.draw({len: width * 0.2, angle: angle})
  stroke(0, 255, 255)
  rollup.draw({len: width * 0.2, angle: angle+180})
  angle += angle_delta

  if (angle % 90 < angle_delta) {
    // angle_delta *= -1
  }

  if (record) {
    capturer.capture(canvas);
    if (frameCount >= frame_rate * duration - 1) {
      capturer.stop()
      capturer.save()
      noLoop()
    }
  }
}

function easeInOutQuart(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }

function mousePressed() {
  if (isLooping) {
    noLoop()
    isLooping = false
  } else {
    loop()
    isLooping = true
  }
}

function elasticOut(t) {
  a = 1 
  p = 0.3
  s = Math.asin(1 / (a = Math.max(1, a))) * (p /= TWO_PI);
  return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
}

