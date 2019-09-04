function setup() {
  // createCanvas(innerWidth, innerHeight);
  createCanvas(800, 800);
  noLoop();
  colorMode(HSB, 100);
  strokeWeight(4);

  num_rows = 100;
  cell_width = width / num_rows;
  cell_height = height / num_rows;
}

function draw() {
  background(3);

  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_rows; j++) {
      x = j * cell_width;
      y = i * cell_height;
      stroke(map(i + j, 0, 2 * num_rows, 0, 100), 80, 80);
      if (Math.random() < 0.5) {
        line(x, y, x + cell_width, y + cell_height);
      } else {
        line(x + cell_width, y, x, y + cell_height);
      }
    }
  }
}
