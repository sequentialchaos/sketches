function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  colorMode(HSB, 1, 1, 1, 1);
  noStroke();
  background(0.1);

  t = 0;
  num_levels = 30;
  d_max = map(max(width, height), 0, 2000, 1, 40);
  rw = width / 2 - d_max;
  rh = height / 2 - d_max;
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.01);

  // center circle
  push();
  stroke(0);
  circle(0, 0, d_max * abs(sin(frameCount / 100) * 1.25));
  pop();

  for (let i = 0; i < TAU; i += TAU / 10) {
    for (let m = 0; m <= num_levels; m++) {
      d = ((m + 1) / num_levels) * d_max;
      rx = map(m, 0, num_levels, rw, d * 4);
      ry = map(m, 0, num_levels, rh, d * 4);
      x = rx * cos(t + i);
      y = ry * sin(t + i);
      hue_ = (t + i + m / num_levels) % 1;
      fill(hue_, 1, 0.9, 0.1);
      circle(x, y, d);
    }
  }

  t += 0.01;
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
