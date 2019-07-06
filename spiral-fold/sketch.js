let spiral = new L_system(
  axiom = 'F', 
  rules = {
    F: 'F+>F'
  },
  len = 11,
  angle = 0,
  max_iterations = 6
)

function setup() {

  frame_rate = 60

  isLooping = true
  // length = 400 //min(innerWidth, innerHeight)
  createCanvas(innerWidth, innerHeight)
  frameRate(frame_rate)

  angle = 0

  for (let i = 0; i < spiral.max_iterations; i++) {
    spiral.getNextInstructions()
  }

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
  translate(width/2, height/2)

  stroke(255)
  spiral.draw({mode: 'absolute', colormode: 'rainbow', len: 1, line_len_scale: 1.2, angle: angle})
  angle += 0.2

  if (record) {
    capturer.capture(canvas);
    if (angle > 360) {
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

