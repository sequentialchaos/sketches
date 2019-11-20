function setup() {
  createCanvas(innerWidth, innerHeight);
  background(200);
  colorMode(HSB, 1, 1, 1, 1);
  // let p = new Petal({
  //   width: 200,
  //   height: 40,
  //   angle: PI / 5
  // });
  // p.draw();
  angleOffset = 0;
  numPetals = 20;
}

function draw() {
  translate(width / 2, height / 2);
  background(200);

  stroke(0.5, 1, 0.9, 0.7);
  fill(0.5, 1, 1, 1);
  for (let i = 0; i < numPetals; i++) {
    let angle = map(i, 0, numPetals, 0, TWO_PI) + angleOffset;
    push();
    translate(50 * cos(angle), 50 * sin(angle));
    rotate(angle);
    ellipse(0, 0, 200, 30);
    pop();
  }
  fill("lightgreen");
  circle(0, 0, 50);
  // angleOffset += 0.01;
}

class Flower {
  constructor({ cx = 0, cy = 0, radius = 1 } = {}) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
  }
  generate() {}
}

class Petal {
  constructor({ x = 0, y = 0, width = 50, height = 15, angle = 0 } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }
  draw() {
    push();
    translate(
      this.x + this.width * cos(this.angle),
      this.y + this.height * sin(this.angle)
    );
    rotate(this.angle);
    // translate(this.x + this.width / 2, this.height / 2);
    ellipse(0, 0, this.width, this.height);
    pop();
  }
}
