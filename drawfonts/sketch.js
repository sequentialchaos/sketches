function preload() {
  font = loadFont("fonts/NotoEmoji-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  frameRate(10);

  points = font.textToPoints("🐈", 200, 500, 400);

  hue_max = 500;
  hue_offset = 0;
  colorMode(HSB, hue_max, 100, 100);
}

function draw() {
  background(0);

  for (let i = 0; i < points.length; i++) {
    p = points[i];
    new_hue = map(i, 0, points.length - 1, 0, hue_max);

    fill((new_hue + hue_offset) % hue_max, 100, 100);
    // fill(255);
    circle(p.x, p.y, 2);
  }
  hue_offset += 15;
}

function drawTextAsPoints(text, font, fontsize, x, y) {
  let points = font.textToPoints(text, x, y, fontsize);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    fill(colors[i]);
    circle(p.x, p.y, 2);
  }
}
