function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(min_length, min_length)
    .center("horizontal")
    .style("top", int((innerHeight - min_length) / 2) + "px");

  noLoop();
  colorMode(HSB, 100);

  num_rows = 30;
  cell_width = width / num_rows;

  strokeWeight(map(cell_width, 0, 30, 1, 7));
}

function draw() {
  drawGrid();
}

function drawGrid() {
  background(3);

  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_rows; j++) {
      x = j * cell_width;
      y = i * cell_width;
      stroke(map(i + j, 0, 2 * num_rows, 0, 100), 80, 85);
      if (Math.random() < 0.5) {
        line(x, y, x + cell_width, y + cell_width);
      } else {
        line(x + cell_width, y, x, y + cell_width);
      }
    }
  }
}

function mouseClicked() {
  redraw();
}
