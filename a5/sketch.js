function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(600, 600).center("horizontal");
  colorMode(HSB, 1, 1, 1);

  frame_rate = 60;
  anim_seconds = 11;
  anim_frames = frame_rate * anim_seconds;
  starting_frame = anim_frames + 1;

  record = false;
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: "gif",
      workersPath: "../lib/",
      verbose: true
    });
    // capturer.start();
  }

  looping = true;
  if (!looping) {
    noLoop();
  } else {
    frameRate(frame_rate);
  }
  background(0.02);

  points = [];
  for (let i = 0; i < 23; i++) {
    points.push([]);
    for (let j = 0; j < 12; j++) {
      points[i].push({
        x: random(width),
        y: random(height)
      });
    }
  }
}

function draw() {
  p = (frameCount % anim_frames) / anim_frames;
  background(0.02, 0.1);

  points.forEach(points_ => trace(points_, p, 20, 1));

  if (record && frameCount == starting_frame) {
    capturer.start();
  }
  if (record) {
    capturer.capture(canvas);
    if (frameCount >= starting_frame + anim_frames - 1) {
      capturer.stop();
      capturer.save();
      record = false;
      noLoop();
    }
  }
}

function trace(v, p, d, e = 1, c) {
  let i = int(p * v.length);
  let v1 = v[i];
  let v2 = v[(i + 1) % v.length];
  let x = lerp(v1.x, v2.x, ((p % (1 / v.length)) * v.length) ** e);
  let y = lerp(v1.y, v2.y, ((p % (1 / v.length)) * v.length) ** e);
  noStroke();
  circle(x, y, d);
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
