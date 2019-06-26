let hilbert = new L_system(
  axiom = 'L', 
  rules = {
    L: '+RF-LFL-FR+',
    R: '-LF+RFR+FL-'
  },
  len = 30,
  angle = 0,
  max_iterations = 7
)

let l_systems = [
    // sierpinski gasket
    new L_system(
      axiom = 'F', 
      rules = {
        F: 'G-F-G',
        G: 'F+G+F'
      },
      len = 10,
      angle = 60,
      max_iterations = 5
    ),
    // hexagonal gosper
    new L_system(
      axiom = 'XF',
      rules = {
        X: 'X+YF++YF-FX--FXFX-YF+',
        Y: '-FX+YFYF++YF+FX--FX-Y'
      },
      len = 10,
      angle = 60,
      max_iterations = 3
    ),
  // hilbert
  new L_system(
    axiom = 'L', 
    rules = {
      L: '+RF-LFL-FR+',
      R: '-LF+RFR+FL-'
    },
    len = 30,
    angle = 90,
    max_iterations = 4
  ),
  // dragon curve
  new L_system(
    axiom = 'F', 
    rules = {
      F: 'F+G',
      G: 'F-G'
    },
    len = 30,
    angle = 90,
    max_iterations = 6
  ),


]

function setup() {

  frame_rate = 60
  duration = 20
  animationFrames = frame_rate*duration
  i = 0
  // noLoop()
  isLooping = true
  length = min(innerWidth, innerHeight)
  p5canvas = createCanvas(length, length).center('horizontal')
  canvas = p5canvas.canvas
  frameRate(frame_rate)
  colorMode(HSB, 360, 100, 100)
  strokeCap(ROUND)
  strokeWeight(7)

  for (let j = 0; j < l_systems.length; j++) {
    for (let i = 0; i < l_systems[j].max_iterations; i++) {
      l_systems[j].getNextInstructions()
    }
  }

  record = false
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: 'gif',
      workersPath: "../../../../lib/",
      verbose: true
    })
    capturer.start()
  }
}

function draw() {
  t = (frameCount % animationFrames) / animationFrames
  
  background(0)
  translate(width/2, height/2)

  i = int(t * l_systems.length)

  
  
  // t2 is a value between 0 and 1, relative to the current section/l-system
  let t2 = (t % (1 / l_systems.length)) / (1 / l_systems.length)
  
  let num_phases = 2
  let phase = Math.floor(t2 * num_phases)
  let shiftUp = phase / num_phases
  let angle_progress = shiftUp + easeInOutQuart(num_phases * (t2 % (1 / num_phases))) / num_phases
  
  if (phase == 0) {
    l_systems[i].angle = l_systems[i].initial_angle * 2 * angle_progress 
    
  } else {
    l_systems[i].angle = l_systems[i].initial_angle * 2 - l_systems[i].initial_angle * 2 * angle_progress 
  }
  
  // rotate(-angle_progress*TWO_PI)

  
  for (let r=0; r<360; r+=90) {
    rotate(radians(r)) 
    stroke(r, 80, 80)
    l_systems[i].draw({colormode: 'normal', stroke_weight: 5})
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


// function mousePressed() {
//   if (isLooping) {
//     noLoop()
//     isLooping = false
//   } else {
//     loop()
//     isLooping = true
//   }
// }

function elasticOut(t) {
  a = 1 
  p = 0.3
  s = Math.asin(1 / (a = Math.max(1, a))) * (p /= TWO_PI);
  return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
}

