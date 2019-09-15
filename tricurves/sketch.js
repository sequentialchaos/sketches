function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  looping = true;
  if (!looping) {
    noLoop();
  }

  r = width * 1.0;
  tricurve = new TriCurve();
  tricurve.scale(r);
}

function draw() {
  translate(width / 2, height / 2);

  background(30);
  stroke(200);
  noFill();

  // push();
  // resetMatrix();
  // translate(120, 50);
  // scale(0.5);
  // tricurve.draw();
  // pop();

  angle = noise(frameCount / 130) * TWO_PI;
  for (let i = 0; i < TWO_PI / angle; i++) {
    tricurve.draw();
    rotate(angle);
  }
  n1 = noise(frameCount / 40) * r;
  tricurve.m1.x = n1;
  tricurve.m1.y = n1;
  tricurve.m2.x = tricurve.m2.x + random(-2, 2);
  tricurve.m2.y = tricurve.m2.y + random(-1, 1);
  tricurve.m3.x = tricurve.m3.x + random(-1, 1);
  tricurve.m3.y = tricurve.m3.y + random(-1, 1);
}

class Conway {
  constructor(num_rows, num_columns) {
    this.grid = [];
    for (let i = 0; i < num_rows; i++) {
      for (let j = 0; j < num_columns; j++) {}
    }
  }
  initializeGrid() {}
}

class TriCurve {
  constructor({
    x1 = 0,
    y1 = 0,
    x2 = 0.5,
    y2 = Math.sqrt(3) / 2,
    x3 = -0.5,
    y3 = Math.sqrt(3) / 2
  } = {}) {
    this.p1 = new Point(x1, y1);
    this.p2 = new Point(x2, y2);
    this.p3 = new Point(x3, y3);
    this.m1 = new Point((x1 + x2) / 2, (y1 + y2) / 2);
    this.m2 = new Point((x2 + x3) / 2, (y2 + y3) / 2);
    this.m3 = new Point((x3 + x1) / 2, (y3 + y1) / 2);
  }
  scale(magnitude) {
    this.p1.x *= magnitude;
    this.p1.y *= magnitude;
    this.p2.x *= magnitude;
    this.p2.y *= magnitude;
    this.p3.x *= magnitude;
    this.p3.y *= magnitude;
    this.m1.x *= magnitude;
    this.m1.y *= magnitude;
    this.m2.x *= magnitude;
    this.m2.y *= magnitude;
    this.m3.x *= magnitude;
    this.m3.y *= magnitude;
  }
  draw() {
    bezier(
      this.p1.x,
      this.p1.y,
      this.m1.x,
      this.m1.y,
      this.m1.x,
      this.m1.y,
      this.p2.x,
      this.p2.y
    );
    bezier(
      this.p2.x,
      this.p2.y,
      this.m2.x,
      this.m2.y,
      this.m2.x,
      this.m2.y,
      this.p3.x,
      this.p3.y
    );
    bezier(
      this.p3.x,
      this.p3.y,
      this.m3.x,
      this.m3.y,
      this.m3.x,
      this.m3.y,
      this.p1.x,
      this.p1.y
    );
  }
}

class Point {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
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
