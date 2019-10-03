function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  colorMode(HSB, 1, 1, 1, 1);
  noStroke();
  background(0.1);

  t = 0;
  d = 10;
  rw = width / 2 - d;
  rh = height / 2 - d;
}

function draw() {
  translate(width / 2, height / 2);
  background(0, 0.01);

  
  for (let i = 0; i < TAU; i += TAU / 10) {
    num_levels = 16;
    for (let m = 0; m <= num_levels; m++) {
      x = map(m, 0, num_levels, rw, d * 4) * cos(t + i);
      y = map(m, 0, num_levels, rh, d * 4) * sin(t + i);
      fill((t + i + m / num_levels) % 1, 1, 0.9, 0.1);
      circle(x, y, d);
    }
  }

  t += 0.01;

  print((frameCount * 2) % 1);
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
