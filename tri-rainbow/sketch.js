function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 1, 1, 1);

  num_polygons = map(min_length, 300, 1200, 10, 50);
  polygons = [];
  n = 3;
  for (let i = 0; i < num_polygons; i++) {
    c = color(i / (num_polygons - 1), 1, 0.9);
    polygons.push(
      new Polygon({
        n: n,
        r: 8 + map(i, 0, num_polygons - 1, 0, width * 1.2),
        color: c,
        a: 0,
        cy: -height * 0.1
      })
    );
  }

  frame_rate = 60;
  anim_seconds = 8;
  anim_frames = frame_rate * anim_seconds;

  record = false;
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: "gif",
      workersPath: "../lib/",
      verbose: true
    });
    capturer.start();
  }

  looping = true;
  if (!looping) {
    noLoop();
  } else {
    frameRate(frame_rate);
  }
}

function draw() {
  translate(width / 2, height / 2);

  background(0.02);
  stroke(2);

  p = (frameCount % anim_frames) / anim_frames;

  polygons.forEach((polygon, i) => {
    // polygon.draw(color(1, 0, 1, 0.6));
    num_traces = 18;
    trace_d = int(map(i, 0, num_polygons, 2, 20));
    for (let j = 0; j < num_traces; j++) {
      // trace_d = map(j, 0, num_traces, 4, 6) * abs(sin(p + 1));
      polygon.trace((p + j / num_traces + i / num_polygons) % 1, trace_d);
    }
  });

  if (record) {
    capturer.capture(canvas);
    if (frameCount >= anim_frames / 4) {
      capturer.stop();
      capturer.save();
      record = false;
      noLoop();
    }
  }
}

class Polygon {
  constructor({ n = 3, cx = 0, cy = 0, r = 2, a = 0, color = "white" } = {}) {
    this.n = n;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.a = -PI / 2 + a;
    this.color = color;
    this.vertices = this.getVertices();
  }

  getVertices() {
    let vertices = [];
    for (let i = 0; i < this.n; i++) {
      let angle = map(i, 0, this.n, 0, TWO_PI);
      let x = this.cx + this.r * cos(this.a + angle);
      let y = this.cy + this.r * sin(this.a + angle);
      vertices.push({
        x: x,
        y: y
      });
    }
    return vertices;
  }

  getLines() {
    let lines = [];
    for (let i = 0; i < this.vertices.length; i++) {
      let v1 = this.vertices[i];
      let v2 = this.vertices[(i + 1) % this.vertices.length];
      lines.push({
        x1: v1.x,
        y1: v1.y,
        x2: v2.x,
        y2: v2.y
      });
    }
    return lines;
  }

  trace(p, d, c) {
    let i = int(p * this.n);
    let v1 = this.vertices[i];
    let v2 = this.vertices[(i + 1) % this.vertices.length];
    let x = lerp(v1.x, v2.x, (p % (1 / this.n)) * this.n);
    let y = lerp(v1.y, v2.y, (p % (1 / this.n)) * this.n);
    c ? fill(c) : fill(this.color);
    noStroke();
    circle(x, y, d);
  }

  draw() {
    push();
    noFill();
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      stroke(this.color);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
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
