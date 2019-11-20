function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  colorMode(HSB, 1, 1, 1, 1);
  noStroke();
  background(0.1);

  t = 0;
  num_levels = 15;
  d_min = map(max(width, height), 0, 2000, 1, 30);
  d_max = map(max(width, height), 0, 2000, 1, 40);
  rw = width / 2 - d_max;
  rh = height / 2 - d_max;
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.01);

  for (let i = 0; i < TAU; i += TAU / 10) {
    for (let m = 0; m <= num_levels; m++) {
      d = map(m, 0, num_levels, d_max, 4);
      rx = map(m, 0, num_levels, rw, d * 4);
      ry = map(m, 0, num_levels, rh, d * 4);
      x = rx * cos((t + i) / PI);
      y = ry * sin((t + i) * PI);
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
