function setup() {
  createCanvas(innerWidth, innerHeight).parent("canvas");
  frameRate(4);

  max_hue = 200;
  colorMode(HSB, max_hue, 100, 100, 100);
  noLoop();
  clear();

  walkers = [];
  num_walkers = 10;
  for (let i = 0; i < num_walkers; i++) {
    max_spread = PI / 4;
    _spread = random(PI / 18, max_spread);
    walkers.push(
      new RandomWalker({
        x: width / 2,
        y: height / 2,
        direction: Math.random() * TWO_PI,
        spread: _spread,
        diameter: 3,
        min_distance: 1,
        max_distance: 4,
        fill_color: color(
          Math.random() * max_hue,
          50,
          Math.random() * 30,
          map(_spread, 0, max_spread, 90, 35)
        )
      })
    );
  }
}

function draw() {
  noStroke();
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].draw();
    walkers[i].move();
    walkers[i].wrap();
  }
}

class RandomWalker {
  constructor({
    x = width / 2,
    y = height / 2,
    direction = 0,
    spread = PI / 8,
    diameter = 3,
    min_distance = 1,
    max_distance = 4,
    fill_color = "white"
  } = {}) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.spread = spread;
    this.diameter = diameter;
    this.min_distance = min_distance;
    this.max_distance = max_distance;
    this.fill_color = fill_color;
  }
  draw({ override_fill = false } = {}) {
    if (!override_fill) fill(this.fill_color);
    circle(this.x, this.y, this.diameter);
  }
  move() {
    this.direction += random(-this.spread, this.spread);
    let distance = random(this.min_distance, this.max_distance);
    this.x += distance * cos(this.direction);
    this.y += distance * sin(this.direction);
  }
  wrap() {
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
}
