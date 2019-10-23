function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 1, 1, 1, 1);
  stroke(1, 0, 1, 1);
  strokeWeight(0.1);
  noStroke();
  n = 2;
  d = 40;
  numTriangles = 20;
  i = 0;
  j = 0;
  p = PI;
  r = max(width, height) * 0.85;
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.05);
  for (let w = 0; w < numTriangles; w++) {
    t = i + w;
    let p1 = maurer(t, n, d, r);
    let p2 = maurer(t + p, n, d, r);
    let p3 = maurer(t + p + 0.1, n, d, r);
    // stroke(1, 0, 0, 0.2);
    fill(w / numTriangles, 1, 1, 0.01);
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }
  i += TWO_PI / 1000000;
  j += PI / 30000;
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
