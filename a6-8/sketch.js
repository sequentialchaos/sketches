function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  looping = true;
  noStroke();
  num_rows = 20;
  num_tiles = num_rows * num_rows;
  tile_width = width / num_rows;
  tile_height = height / num_rows;
  tiles = [];
  for (let j = 0; j < num_rows; j++) {
    for (let i = 0; i < num_rows; i++) {
      if (Math.random() < 1) {
        tile_x = (i / num_rows) * width;
        tile_y = (j / num_rows) * height;
        tile_number = i + j * num_rows;
        tile_hue = map(tile_number, 0, num_tiles, 0, 360);
        tile = new Tile(
          tile_height,
          tile_width,
          random(width),
          random(height),
          tile_hue
        );
        tile.dest_x = tile_x;
        tile.dest_y = tile_y;
        tiles.push(tile);
      }
    }
  }
}

function draw() {
  // background(0);
  for (let tile of tiles) {
    spread = 15;
    tile.draw();
    // tile.move(random(-tile.width * 0.5, tile.width * 0.5), tile.height * 0.1);
    tile.translate(tile.dest_x, tile.dest_y, frameCount / 100);
    // tile.wrap();
  }
}

class Tile {
  constructor(tile_height, tile_width, x, y, tile_hue) {
    this.x = x;
    this.y = y;
    this.start_x = x;
    this.start_y = y;
    this.width = tile_width;
    this.height = tile_height;
    this.hue = tile_hue;
    this.setColor();
  }
  setColor() {
    push();
    this.color = hpluvToColor(this.hue, 300, 75);
    pop();
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  wrap() {
    if (this.x > width) {
      this.x = -this.width;
    }
    if (this.x < -this.width) {
      this.x = width;
    }
    if (this.y > height + this.height) {
      this.y = -this.height;
    }
    if (this.y < -this.height) {
      this.y = height;
    }
  }
  translate(x, y, percent) {
    if (percent <= 1) {
      this.x = lerp(this.start_x, x, percent);
      this.y = lerp(this.start_y, y, percent);
    }
  }
}

class RandomTile extends Tile {
  constructor(tile_height) {
    super();
    this.x = random(width);
    this.y = random(height);
    this.height = tile_height;
    this.hue = random(1);
    this.setColor();
  }
  setColor() {
    push();
    colorMode(HSB, 1, 1, 1);
    this.color = color(this.hue, 1, 1);
    pop();
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.height, this.height);
  }
}

function hpluvToColor(h, p, l) {
  // h -> hue between 0 and 360,
  // p -> saturation (?!) between 0 and 360,
  // l -> lightness between 0 and 100.
  push();
  colorMode(RGB, 1, 1, 1);
  rgb = hsluv.hpluvToRgb([h, p, l]);
  c = color(rgb[0], rgb[1], rgb[2]);
  pop();
  return c;
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
