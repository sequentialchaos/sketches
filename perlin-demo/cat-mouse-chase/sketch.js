function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  t = 0;
  dt = 0.01;

  min = 1;
  max = 0;
  avg = 0;

  settings = function() {
    this.dt = 0.04;
    this.detail = 38;
    this.falloff = 0.263;
    this.trail_time = 0.61;
  };
  s = new settings();
  gui = new dat.GUI(s);
  gui.add(s, "dt", 0.002, 0.1);
  gui.add(s, "detail", 1, 40, 1);
  gui.add(s, "falloff", 0, 0.9);
  gui.add(s, "trail_time", 0, 2);

  cat = loadImage("cat.png");
  mouse = loadImage("mouse.png");
}

function draw() {
  background(50);
  noiseDetail(s.detail, s.falloff);
  drawImages(t, 10000, s.trail_time);
  t += s.dt;
}

function drawImages(t, offset, trail_time) {
  let x0 = noise(t) * width,
    y0 = noise(t + offset) * height,
    x1 = noise(t + trail_time) * width,
    y1 = noise(t + offset + trail_time) * height;
  image(cat, x0, y0, 300, 300);
  image(mouse, x1, y1, 100, 100);
}
