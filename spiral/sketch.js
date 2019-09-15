function setup() {
  // createCanvas(600, 600, P2D);
  createCanvas(innerWidth, innerHeight, P2D);
  frameRate(30);
  colorMode(HSB, 1, 1, 1, 1);
  strokeWeight(2);

  num_points = 250;
  num_rotations = 6;
  anim_frames = 60;
  angle = 0;
  angle_delta = TAU / anim_frames;

  record = false;
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: "gif",
      workersPath: "../lib/",
      verbose: true
    });
    capturer.start();
  }
}

function draw() {
  translate(width / 2, height / 2);
  rotate(angle);
  background(0);

  drawSpiral(num_points, num_rotations);
  if (frameCount % 10 == 0) {
    num_rotations += 0.05;
    if (num_points < 600) {
      num_points += 2;
    }
  }
  if (record) {
    capturer.capture(canvas);
    if (frameCount >= anim_frames) {
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }

  angle += angle_delta;
}

function drawSpiral(num_points, num_rotations) {
  prev_x = 0;
  prev_y = 0;
  for (let i = 0; i < num_points; i++) {
    a = map(i, 0, num_points - 1, 0, TAU * num_rotations);
    r = map(i, 0, num_points - 1, 1, min(width, height) * 0.75);
    x = r * cos(a);
    y = r * sin(a);
    stroke(i / num_points, 1, 1);
    // noStroke();
    fill(i / num_points, 1, 1);
    // circle(x, y, 3);
    line(prev_x, prev_y, x, y);
    prev_x = x;
    prev_y = y;
  }
}
