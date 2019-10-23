function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 1, 1, 1, 1);
  stroke(1, 0, 1, 1);
  strokeWeight(7);
  n = 2;
  d = 29;
  numLines = 30;
  i = 0;
  j = 0;
  p = PI;
  r = max(width, height) * 0.75;
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.04);
  for (let w = 0; w < numLines; w++) {
    t = i + w;
    let p1 = maurer(t, n, d, r);
    let p2 = maurer(t + p, n, d, r);
    stroke(w / numLines, 0.5, 1, 0.2);
    line(p1.x, p1.y, p2.x, p2.y);
  }
  i += TWO_PI / 1000000;
  j += PI / 40000;
  // p = (p + PI / 100000) % PI + PI
  p = map(easeInOutQuad(1 - (j % PI) / PI), 1, 0, PI, PI * 3);
  d += 0.0001;
  n += 0.00001;
}

function maurer(t, n, d, rMax) {
  let k = t * d;
  let r = rMax * sin(n * k);
  let x = r * cos(k);
  let y = r * sin(k);
  return { x, y };
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}
