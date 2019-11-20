let inconsolata;
function preload() {
  inconsolata = loadFont("Inconsolata.otf");
}

function setup() {
  const length = min(innerWidth, innerHeight);
  createCanvas(length, length, WEBGL).center("horizontal");
  background(0);
  looping = true;
  if (!looping) {
    noLoop();
  } else {
    frameRate(60);
  }

  angleMode(DEGREES);

  r = width * 0.3;
  w = 3;
  a = 1;
  b = 1;
  c = 1;
}

function draw() {
  background(0);
  drawKnot(a, b, c, -3 * w, 0, 0, r, 0, 1);
  a += 10 / 360;
  b += 20 / 360;
  c += 30 / 360;
  text("test", 0, 0);
  if (c >= 10) {
    noLoop();
  }
}

function drawKnot(a, b, c, cx, cy, cz, r, hueShift, alpha) {
  let previous = {};
  let first = {};
  strokeWeight(3);
  colorMode(HSB, 360, 100, 100, 3);
  for (let t = 0; t <= 360; t += 1) {
    let x = cx + r * cos(a * t + 15);
    let y = cy + r * cos(b * t + 75);
    let z = cz + r * cos(c * t);
    if (t > 0) {
      stroke((t + hueShift * 360) % 360, 100, 100, alpha);
      line(previous.x, previous.y, previous.z, x, y, z);
    } else {
      first.x = x;
      first.y = y;
      first.z = z;
    }
    previous.x = x;
    previous.y = y;
    previous.z = z;
  }
}

function mousePressed() {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
}
