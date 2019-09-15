function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  // noLoop();
  colorMode(HSB, 1, 1, 1);
  noStroke();
  aspect_ratio = width / height;
  num_rows = 20;
  num_cols = num_rows * aspect_ratio;
  num_tiles = num_rows * num_rows;
  tile_width = width / num_cols;
  tile_height = height / num_rows;
  tiles = [];
  for (let j = 0; j < num_rows; j++) {
    for (let i = 0; i < num_cols; i++) {
      // tile = new RandomTile(tile_height);
      // tile.draw();
      // tiles.push(tile);
      if (Math.random() < 0.03) {
        tile_x = (i / num_cols) * width;
        tile_y = (j / num_rows) * height;
        tile_number = i + j * num_cols;
        tile_hue = map(tile_number, 0, num_tiles, 0, 1);
        tile = new Tile(tile_height, tile_width, tile_x, tile_y, tile_hue);
        tile.dir = int(random(0, 2));
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
    if (tile.dir == 0) {
      tile.move(int(random(0, 2)) * tile.width, 0);
    } else {
      tile.move(0, int(random(0, 2)) * tile.height);
    }
    if (Math.random() < 0.04) {
      if (tile.dir == 0) {
        tile.dir = 1;
      } else {
        tile.dir = 0;
      }
    }
    tile.wrap();
  }
}

class Tile {
  constructor(tile_height, tile_width, x, y, tile_hue) {
    this.x = x;
    this.y = y;
    this.width = tile_width;
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
    rect(this.x, this.y, this.width, this.height);
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
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
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
