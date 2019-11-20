function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  // createCanvas(600, 600);
  frameRate(30);

  colorMode(HSB, 1, 1, 1, 1);
  noStroke();
  background(0);

  t = 0;
  num_levels = 2;
  d_min = map(max(width, height), 0, 2000, 1, 40);
  d_max = map(max(width, height), 0, 2000, 1, 70);
  rw = width / 2 - d_max;
  rh = height / 2 - d_max;

  record = false;
  if (record) {
    capturer = new CCapture({
      framerate: 30,
      format: "gif",
      workersPath: "../lib/",
      verbose: true
    });
    capturer.start();
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.06);

  for (let i = 0; i < TAU; i += TAU / 10) {
    for (let m = 0; m <= num_levels; m++) {
      d = map(m, 0, num_levels, d_max, 4);
      rx = map(m, 0, num_levels, rw, d * 10);
      ry = map(m, 0, num_levels, rh, d * 10);
      x = rx * map(noise(t + i + 50 * m), 0.2, 0.8, -1, 1) * 1 + 1;
      y = ry * sin(t + i + 1001 * m);
      hue_ = (t + i + m / num_levels) % 1;
      fill(hue_, 1, 0.9, 0.1);
      circle(x, y, d);
    }
  }

  t += 0.006;

  if (record) {
    capturer.capture(canvas);
    if (frameCount >= 30 * 15) {
      capturer.stop();
      capturer.save();

      noLoop();
    }
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
