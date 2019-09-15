function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);
  // noLoop();
  colorMode(HSB, 1, 1, 1);
  noStroke();
  num_rows = 20;
  num_tiles = num_rows * num_rows;
  tile_height = height / num_rows;
  tiles = [];
  for (let j = 0; j < num_rows; j++) {
    for (let i = 0; i < num_rows; i++) {
      // tile = new RandomTile(tile_height);
      // tile.draw();
      // tiles.push(tile);
      if (Math.random() < 0.2) {
        tile_x = (i / num_rows) * width;
        tile_y = (j / num_rows) * height;
        tile_number = i + j * num_rows;
        tile_hue = map(tile_number, 0, num_tiles, 0, 1);
        tile = new Tile(tile_height, tile_x, tile_y, tile_hue);
        tiles.push(tile);
      }

      // tiles.push({
      //   x: tile_x,
      //   y: tile_y,
      //   hue: tile_hue
      // })
      // fill(tile_hue, 1.0, 1.0)
      // rect(tile_x, tile_y, tile_height, tile_height)
    }
  }
}

function draw() {
  // background(0);
  for (let tile of tiles) {
    spread = 15;
    tile.draw();
    tile.move(random(-spread, spread), random(-spread, spread));
    tile.wrap();
  }
}

class Tile {
  constructor(tile_height, x, y, tile_hue) {
    this.x = x;
    this.y = y;
    this.width = tile_height;
    this.height = tile_height;
    this.hue = tile_hue;
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
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  wrap() {
    // if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
    //   this.x = width / 2;
    //   this.y = height / 2;
    // }
    if (this.x > width) {
      this.x = this.width;
    }
    if (this.x < 0) {
      this.x = width - this.width;
    }
    if (this.y > height) {
      this.y = this.height;
    }
    if (this.y < 0) {
      this.y = height - this.height;
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
