function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  looping = true;
  colorMode(HSB, 1, 1, 1);
  noStroke();
  num_rows = 20;
  num_tiles = num_rows * num_rows;
  tile_width = width / num_rows;
  tile_height = height / num_rows;
  tiles = [];
  for (let j = 0; j < num_rows; j++) {
    for (let i = 0; i < num_rows; i++) {
      if (Math.random() < 0.025) {
        tile_x = (i / num_rows) * width;
        tile_y = (j / num_rows) * height;
        tile_number = i + j * num_rows;
        tile_hue = map(tile_number, 0, num_tiles, 0, 1);
        tile = new Tile(tile_height, tile_width, tile_x, tile_y, tile_hue);
        tile.dir = int(random(0, 4));
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
    if (tile.dir == 0) {
      tile.move(int(random(0, 2)) * tile.width, 0);
    } else if (tile.dir == 1) {
      tile.move(0, int(random(0, 2)) * tile.height);
    } else if (tile.dir == 2) {
      tile.move(int(random(0, 2)) * -tile.width, 0);
    } else if (tile.dir == 3) {
      tile.move(0, int(random(0, 2)) * -tile.height);
    }
    if (Math.random() < 0.04) {
      tile.dir = (tile.dir + 1) % 4;
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
    this.color = color(this.hue, 0, random(0, 1));
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

function mousePressed() {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
}
