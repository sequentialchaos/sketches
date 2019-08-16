let capturer = new CCapture({
  framerate: 60,
  format: "png",
  // workersPath: "../../../../lib/",
  verbose: true
});
let s, n;
let angle = 0;
let t = 0;
let framerate = 60;
let duration = 10;
let animationFrames = framerate * duration;
let record = false;
let canvas;
// From [0;1] to [0;1]
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

function setup() {
  const length = min(innerWidth, innerHeight);
  var p5canvas = createCanvas(length, length).center('horizontal');
  canvas = p5canvas.canvas;
  // print(canvas)
  // noLoop()
  frameRate(framerate);

  noStroke();

  n = 2;
  s = length / n;
  if (record) {
    capturer.start();
  }
}

function draw() {
  translate(-3 * s, -3 * s);
  // background(0)
  t = (frameCount % animationFrames) / animationFrames;
  let phase = Math.floor(t * 4);
  let shiftUp = phase / 4;
  let normalizedAngle = shiftUp + easeInOutQuart(4 * (t % 0.25)) / 4;

  push();
  colorMode(HSB, 100, 100, 100);
  let sat = 80,
    lgt = 90,
    colorA = color(normalizedAngle * 100, sat, lgt),
    colorB = color((normalizedAngle * 100 + 50) % 100, sat, lgt);

  if (phase == 0 || phase == 2) {
    background(colorA);
    fill(colorB);
  } else {
    normalizedAngle += 0.5;
    translate(-s / 2, -s / 2);
    background(colorB);
    fill(colorA);
  }

  // translate(width / 2, height / 2)
  // rotate()

  // drawArrows(normalizedAngle * TWO_PI)
  drawShapes(drawArcs, s, n, normalizedAngle * TWO_PI)
  pop();
  if (record) {
    capturer.capture(canvas);
    if (frameCount >= framerate * duration - 1) {
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
  // print(frameCount)
}

function upArrow(w, h) {
  push();
  // translate(-x - w / 2, -y - h / 2)
  // rotate(angle)
  beginShape();

  vertex(w / 4, 0);
  vertex((w * 3) / 4, 0);
  vertex((w * 3) / 4, h / 2);
  vertex(w, h / 2);
  vertex(w / 2, h);
  vertex(0, h / 2);
  vertex(w / 4, h / 2);

  endShape();
  pop();
}

function drawArrows(angle) {
  for (let i = 0; i < n + 5; i++) {
    for (let j = 0; j < n + 5; j++) {
      let x = map(i, 0, n, 0, width),
        y = map(j, 0, n, 0, height);
      // resetMatrix()
      push();
      translate(x + s / 2, y + s / 2);
      rotate(angle);
      translate(s / 2, s / 2);
      // fill(100, 100, 100)
      // fill((frameCount / 3) % 100, 80, 90)
      // stroke(map((x * y) % 255), 100, 100)
      upArrow(s, s);
      pop();
    }
  }
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
      }
    ]
  )
}

function drawCircle(s) {
  circle(0, 0, s / 2)
}

function drawArcs(s) {
  arc(0, 0, s, s, -PI / 2, PI / 2)
  arc(s / 2, s / 2, s, s, -PI / 2, PI / 2)
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