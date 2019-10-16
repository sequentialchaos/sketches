function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frame_rate = 60;
  frameRate(frame_rate);
  colorMode(HSB, 1, 1, 1, 1);
  background(0.1);

  p = {
    x: 0,
    y: 0
  };

  r = 1;
  r_delta = min(width, height) / frame_rate / 1.5;
  r_max = max(width, height);

  angle = 0;
  angle_delta = TWO_PI / 4;
}

function draw() {
  translate(width / 2, height / 2);
  if (r >= r_max) {
    r = 0;
    p.x = 0;
    p.y = 0;
    angle = 0;
  }
  q = {
    x: p.x + r * cos(angle),
    y: p.y + r * sin(angle)
  };
  stroke(1);
  strokeWeight(map(r, 0, r_max, 1, 10));
  background(0.1, 0.03);
  line(p.x, p.y, q.x, q.y);
  p = q;
  angle += angle_delta;
  r += r_delta;
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

// function easeInOutQuad(t) {
//   return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
// }
