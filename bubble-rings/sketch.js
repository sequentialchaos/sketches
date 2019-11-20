function setup() {
  looping = true;

  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  colorMode(HSB, 1, 1, 1, 1);
  // background(0)
  strokeWeight(0.1);
  // noLoop()

  numBubbles = 5;
  bubbles = [];
  bubble = new Bubble(width / 2, height / 2, width * 0.82);
  bubble.color = "black";
  bubbles.push(bubble);
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(
      bubble.copy({
        r: (bubble.r * (numBubbles - i)) / numBubbles,
        color: color(map(i, 0, numBubbles, 0, 1), 1)
      })
    );
  }

  animFrames = 600;
  speed = 1 / animFrames;
  cycle = new cyclicNoise(0, 50, speed, 0.1);
}

function draw() {
  background(0, 0.0, 0, 0.05);

  // stroke(1, 0.01);
  noStroke();
  for (let bubble of bubbles) {
    fill(bubble.color);
    bubble.draw();
    bubble.offset = bubble.offsetMin + cycle.value;
  }
  cycle.rotate();

  if (frameCount % animFrames == 0) {
    console.log(cycle.angle, cycle.speed, cycle.angleDelta);
  }
}

class cyclicNoise {
  constructor(minimum, maximum, speed, spread) {
    this.min = minimum;
    this.max = maximum;
    this.speed = speed;
    this.offset = Math.random() * 10000;
    this.spread = spread;
    this.value = minimum;
    this.time = 0;
    this.angle = 0;
    this.angleDelta = TWO_PI * this.speed;
  }

  rotate() {
    let xoff = map(
      cos(this.angle),
      -1,
      1,
      this.offset,
      this.offset + this.spread
    );
    let yoff = map(
      sin(this.angle),
      -1,
      1,
      this.offset,
      this.offset + this.spread
    );
    this.value = map(noise(xoff, yoff), 0, 1, this.min, this.max);
    this.time += this.speed;
    this.angle += this.angleDelta;
  }
}

class Bubble {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.offsetMin = Math.random() * 2000;
    this.offset = this.offsetMin;
    this.spread = 0.7; // Math.random() * 0.5 + 0.8
    this.N = 100;
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
    bubbleCopy.offsetMin = this.offsetMin;
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
