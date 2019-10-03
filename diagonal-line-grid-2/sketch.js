function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(min_length, min_length)
    .center("horizontal")
    .style("top", int((innerHeight - min_length) / 2) + "px");

  looping = true;
  frame_rate = 60;

  frameRate(frame_rate);
  colorMode(HSB, 100);

  num_rows = 20;
  cell_width = width / num_rows;

  strokeWeight(map(cell_width, 0, 30, 1, 4));
  noFill();

  circles = [];
  makeGrid();
}

function draw() {
  drawGrid(frameCount / 100);
}

function drawGrid(t) {
  background(3);
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    stroke(c.color);
    circle(c.cx, c.cy, c.r);
    dr =
      sin(t + i / 100) / (1 / noise(t)) +
      cos(t + i / 100) / (1 / noise(t + 100));
    c.r = constrain(c.r + (noise(t + i) - 0.5) * 3, 1, cell_width / 2);

    // l.vector.rotate(PI / 16);
  }
  // if (frameCount < frame_rate * 2) {
  //   showHelperText();
  // }
}

function makeGrid() {
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_rows; j++) {
      let x = j * cell_width + cell_width / 2;
      let y = i * cell_width + cell_width / 2;
      let stroke_color = hpluvToColor(
        map(i + j, 0, 2 * num_rows, 0, 360),
        300,
        80
      );
      circles.push({
        cx: x,
        cy: y,
        r: (Math.random() * cell_width) / 2,
        color: stroke_color
      });
    }
  }
}

function hpluvToColor(h, p, l) {
  // h -> hue between 0 and 360,
  // p -> saturation (?!) between 0 and 100,
  // l -> lightness between 0 and 100.
  push();
  colorMode(RGB, 1, 1, 1);
  rgb = hsluv.hpluvToRgb([h, p, l]);
  c = color(rgb[0], rgb[1], rgb[2]);
  pop();
  return c;
}

function mouseClicked() {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
}
