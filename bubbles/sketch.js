function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frameRate(60);

  colorMode(HSB, 1, 1, 1, 1);
  // background(0)
  strokeWeight(0.1);
  // noLoop()

  numBubbles = 15;
  bubbles = [];
  for (let i = 0; i < numBubbles; i++) {
    bubble = new Bubble(
      Math.random() * width,
      Math.random() * height,
      Math.random() * width * 0.24 + width * 0.05
    );
    bubbles.push(bubble);
  }
  background(0.56, 0.8, 0.37);
}

function draw() {
  background(0.56, 0.8, 0.37, 0.35);

  stroke(1, 0.01);
  fill(1, 0.05);

  for (let bubble of bubbles) {
    bubble.draw();
    bubble.offset += 0.0015;
    bubble.move();
  }
}

class Bubble {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.offset = Math.random() * 2000;
    this.spread = 0.7; // Math.random() * 0.5 + 0.8
    this.N = 60;
    this.dx = (Math.random() / 10 + 0.01) * (Math.random() > 0.5 ? -1 : 1);
    this.dy = (Math.random() / 10 + 0.01) * (Math.random() > 0.5 ? -1 : 1);
    this.color = color(random(1), 1, 1, 0.15);
  }

  draw() {
    let angle = 0;
    // noFill()
    beginShape();
    while (angle <= TWO_PI) {
      let xoff = map(cos(angle), -1, 1, this.offset, this.offset + this.spread);
      let yoff = map(sin(angle), -1, 1, this.offset, this.offset + this.spread);
      let r = noise(xoff, yoff) * this.r;
      let x = this.cx + r * cos(angle);
      let y = this.cy + r * sin(angle);
      vertex(x, y);

      angle += TWO_PI / this.N;
    }
    endShape();
  }

  move() {
    this.cx += this.dx;
    this.cy += this.dy;
    if (this.cx <= -this.r / 2 && this.dx < 0) {
      this.cx = width + this.r / 2;
    }
    if (this.cx >= width + this.r / 2 && this.dx > 0) {
      this.cx = -this.r / 2;
    }
    if (this.cy <= -this.r / 2 && this.dy < 0) {
      this.cy = height + this.r / 2;
    }
    if (this.cy >= height + this.r / 2 && this.dy > 0) {
      this.cy = -this.r / 2;
    }
  }

  copy({ cx = this.cx, cy = this.cy, r = this.r, color = this.color } = {}) {
    let bubbleCopy = new Bubble(cx, cy, r);
    bubbleCopy.offset = this.offset;
    bubbleCopy.spread = this.spread;
    bubbleCopy.N = this.N;
    bubbleCopy.dx = this.dx;
    bubbleCopy.dy = this.dy;
    bubbleCopy.color = color;
    return bubbleCopy;
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
