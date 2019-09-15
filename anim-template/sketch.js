function setup() {
  frame_rate = 60;

  isLooping = true;
  length = min(innerWidth, innerHeight);
  createCanvas(length, length);
  frameRate(frame_rate);

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

  angle = 0;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  if (record) {
    capturer.capture(canvas);
    if (angle > 360) {
      capturer.stop();
      capturer.save();

      noLoop();
    }
  }
}

function mousePressed() {
  if (isLooping) {
    noLoop();
    isLooping = false;
  } else {
    loop();
    isLooping = true;
  }
}

function elasticOut(t) {
  a = 1;
  p = 0.3;
  s = Math.asin(1 / (a = Math.max(1, a))) * (p /= TWO_PI);
  return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
}

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
