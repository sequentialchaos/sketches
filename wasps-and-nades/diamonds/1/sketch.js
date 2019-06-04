let capturer = new CCapture({
  framerate: 60,
  format: "png",
  // workersPath: "../../../../lib/",
  verbose: true
});

let record = false;
let canvas;

let s, n;
let framerate, duration, animationFrames;

let gui

// GUI control variables
function controls() {
  this.n = 3
}

let c = new controls()

function setup() {
  const length = min(innerWidth, innerHeight);
  var p5canvas = createCanvas(length, length).center('horizontal');
  canvas = p5canvas.canvas;

  frameRate(framerate);
  noStroke();
  // strokeWeight(5)

  if (record) {
    capturer.start();
  }

  gui = new dat.GUI()
  // gui.remember(c)
  gui.add(c, 'n', 1, 10, 1)
  s = length / c.n;

  framerate = 60;
  duration = 10;
  animationFrames = framerate * duration;
}

function draw() {
  s = width / c.n
  translate(-3 * s, -3 * s);
  let t = (frameCount % animationFrames) / animationFrames;
  let numPhases = 4
  let phase = Math.floor(t * numPhases);
  let shiftUp = phase / numPhases;
  let normalizedAngle = shiftUp + easeInOutQuart(numPhases * (t % (1 / numPhases))) / numPhases;

  push();
  colorMode(HSB, 100, 100, 100);
  let sat = 80,
    brt = 90,
    hue = (normalizedAngle * 100 + 50) % 100,
    colorA = color(hue, sat, brt),
    colorB = color((hue + 50) % 100, sat, brt);

  if (phase == 0 || phase == 2) {
    background(colorA);
    fill(colorB);
    // stroke(colorB);
  } else {
    normalizedAngle += 0.5;
    translate(-s / 2, -s / 2);
    background(colorB);
    fill(colorA);
    // stroke(colorB);
  }

  drawShapes(drawDiamond, s, c.n, normalizedAngle * TWO_PI)
  pop();

  if (record) {
    capturer.capture(canvas);
    if (frameCount >= framerate * duration - 1) {
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}

function easeInOutQuart(t) {
  // From [0;1] to [0;1]
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
}

function easeOutQuad(t) {
  return t * (2 - t)
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
}

function drawDiamond(s) {
  unitShape(
    s,
    [{
        x: 0.5,
        y: 0
      },
      {
        x: 1,
        y: 0.5
      },
      {
        x: 0.5,
        y: 1
      },
      {
        x: 0,
        y: 0.5
      }
    ]
  )
}

function drawDiamonds(s) {
  unitShape(
    s,
    [{
        x: 0.5,
        y: 0
      },
      {
        x: 0.75,
        y: 0.5
      },
      {
        x: 0.5,
        y: 1
      },
      {
        x: 0.25,
        y: 0.5
      }
    ]
  )
  unitShape(
    s,
    [{
        x: 0,
        y: 0
      },
      {
        x: 0.25,
        y: 0.5
      },
      {
        x: 0,
        y: 1
      }
    ]
  )
  unitShape(
    s,
    [{
        x: 1,
        y: 0
      },
      {
        x: 0.75,
        y: 0.5
      },
      {
        x: 1,
        y: 1
      }
    ]
  )
}

function drawSquare(s) {
  unitShape(
    s,
    [{
        x: 0.25,
        y: 0.25
      },
      {
        x: 0.75,
        y: 0.25
      },
      {
        x: 0.75,
        y: 0.75
      },
      {
        x: 0.25,
        y: 0.75
      }
    ]
  )
}

function drawRect(s) {
  unitShape(
    s,
    [{
        x: 0,
        y: 0
      },
      {
        x: 0.75,
        y: 0
      },
      {
        x: 0.75,
        y: 0.5
      },
      {
        x: 0,
        y: 0.5
      }
    ]
  )
}

function drawStar(s) {
  unitShape(
    s,
    [{
        x: 0.5,
        y: 0
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 0,
        y: 0.25
      },
      {
        x: 1,
        y: 0.25
      },
      {
        x: 0,
        y: 1
      }
    ]
  )
}

function drawThing(s) {
  unitShape(
    s,
    [{
        x: -0.005,
        y: -0.005
      },
      {
        x: 1.005,
        y: 1.005
      },
      {
        x: 1.005,
        y: -0.005
      },
      {
        x: -0.005,
        y: 1.005
      }
    ]
  )
}

function drawThing2(s) {
  unitShape(
    s,
    [{
        x: 0.5,
        y: 0
      },
      {
        x: 1,
        y: 0.75
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 0.5,
        y: 1
      },
      {
        x: 0,
        y: 0.25
      },
      {
        x: 0,
        y: 0
      }
    ]
  )
}

function drawArrow(s) {
  unitShape(
    s,
    [{
        x: 0.25,
        y: 0
      },
      {
        x: 0.75,
        y: 0
      },
      {
        x: 0.75,
        y: 0.5
      },
      {
        x: 1,
        y: 0.5
      },
      {
        x: 0.5,
        y: 1
      },
      {
        x: 0,
        y: 0.5
      },
      {
        x: 0.25,
        y: 0.5
      },
      {
        x: 0.25,
        y: 0
      }
    ]
  )
}

function drawCircle(s) {
  circle(0, 0, s / 2)
  // circle(width / 2, height / 2, s / 2)
}

function drawCircleInEachCorner(s) {
  circle(0, 0, s / 4)
  circle(width, 0, s / 4)
  circle(width, height, s / 4)
  circle(0, height, s / 4)
}

function drawArcs(s) {
  arc(0, 0, s, s, -PI / 2, PI / 2)
  arc(s / 2, s / 2, s, s, -PI / 2, PI / 2)
}

function drawLines(s) {
  line(s / 2, 0, s, s / 2)
  line(0, s / 2, s / 2, s)
  line(0, 0, s, s)
}

function drawCircleGrid(s) {
  push()
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      circle(i * width / 2, j * height / 2, s / 5)
    }
  }
  pop()
}

function unitShape(s, vertices) {
  beginShape()
  for (let v of vertices) {
    vertex(s * v.x, s * v.y)
  }
  endShape()
}

function unitShapes(s, shapes) {
  for (let shape of shapes) {
    beginShape()
    for (let v of shape) {
      vertex(s * v.x, s * v.y)
    }
    endShape()
  }
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