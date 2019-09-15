function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(min_length, min_length)
    .center("horizontal")
    .style("top", int((innerHeight - min_length) / 2) + "px");

  looping = true;
  frame_rate = 10;

  frameRate(frame_rate);
  colorMode(HSB, 100);

  num_rows = 30;
  cell_width = width / num_rows;

  strokeWeight(map(cell_width, 0, 30, 1, 7));

  lines = [];
  makeGrid();
}

function draw() {
  drawGrid();
  for (let i = 0; i < num_rows * 0.1; i++) {
    randomSwap();
  }
}

function drawGrid() {
  background(3);
  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    stroke(l.color);
    line(l.x1, l.y1, l.x2, l.y2);
  }
  if (frameCount < frame_rate * 2) {
    showHelperText();
  }
}

function makeGrid() {
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_rows; j++) {
      let x = j * cell_width;
      let y = i * cell_width;
      let stroke_color = hpluvToColor(
        map(i + j, 0, 2 * num_rows, 0, 360),
        300,
        80
      );
      if (Math.random() < 0.5) {
        lines.push({
          x1: x,
          y1: y,
          x2: x + cell_width,
          y2: y + cell_width,
          color: stroke_color
        });
      } else {
        lines.push({
          x1: x + cell_width,
          y1: y,
          x2: x,
          y2: y + cell_width,
          color: stroke_color
        });
      }
    }
  }
}

function randomSwap() {
  let i = int(random(lines.length));
  let tmp_x1 = lines[i].x1;
  lines[i].x1 = lines[i].x2;
  lines[i].x2 = tmp_x1;
}

function showHelperText() {
  push();
  rectMode(CENTER);
  stroke("white");
  fill(0, 0, 0, 50);
  let rect_width = cell_width * 20;
  let rect_height = rect_width * 0.35;
  rect(width / 2, height / 2, rect_width, rect_height);
  textAlign(CENTER, CENTER);
  textSize(map(rect_width, 0, 1000, 30, 50));
  strokeWeight(2);
  fill("white");
  text("Click to pause!", width / 2, height / 2);
  pop();
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
