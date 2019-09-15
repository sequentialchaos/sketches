function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(600, 600).center("horizontal");
  colorMode(HSB, 1, 1, 1);

  n = 41;
  radius = width * 0.55;

  polygons = [new Polygon({ n: n, r: radius })];

  inner_polygons = [];
  for (let i = 0; i < polygons.length; i++) {
    for (let j = 0; j < n * 5; j++) {
      polygon = polygons[i];
      scale_factor = map(j, 0, n * 5, 0.75, 0.05);
      inner_polygons.push(polygon.duplicate(scale_factor));
    }
  }

  for (let p of inner_polygons) {
    polygons.push(p);
  }

  polygons.forEach((p, i) => {
    p.color = color(map(i, 0, polygons.length - 1, 0, 1), 0.5, 0.7);
  });

  frame_rate = 60;
  anim_seconds = 3;
  anim_frames = frame_rate * anim_seconds;
  starting_frame = anim_frames + 1;

  record = false;
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: "gif",
      workersPath: "../lib/",
      verbose: true
    });
    // capturer.start();
  }

  looping = true;
  if (!looping) {
    noLoop();
  } else {
    frameRate(frame_rate);
  }
  background(0.02);
}

function draw() {
  translate(width / 2, height / 2); // + radius / 8);

  p = (frameCount % anim_frames) / anim_frames;
  background(0.02, 0.4);

  num_traces = 5;
  polygons.forEach((polygon, i) => {
    // polygon.draw(color(1, 0, 1, 0.6));

    trace_d = 25; //int(map(i, 0, polygons.length - 1, 14, 12));
    if (i > 0) {
      for (let j = 0; j < num_traces; j++) {
        // trace_d = map(j, 0, num_traces, 6, 1);
        // if (frameCount > anim_frames) {
        //   polygon.prev_color = polygon.color;
        //   polygon.color = "white";
        //   num_traces = 1;
        // }
        // if (frameCount > anim_frames * 2) {
        //   polygon.color = "black";
        // }
        polygon.trace((p + j / num_traces) % 1, trace_d, 1.6);
      }
    }

    // polygon.trace(p, 3);
  });

  if (record && frameCount == starting_frame) {
    capturer.start();
  }
  if (record) {
    capturer.capture(canvas);
    if (frameCount >= starting_frame + anim_frames - 1) {
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

  trace(p, d, e = 1, c) {
    let i = int(p * this.n);
    let v1 = this.vertices[i];
    let v2 = this.vertices[(i + 1) % this.vertices.length];
    let x = lerp(v1.x, v2.x, ((p % (1 / this.n)) * this.n) ** e);
    let y = lerp(v1.y, v2.y, ((p % (1 / this.n)) * this.n) ** e);
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
  duplicate(scale_factor) {
    return new Polygon({
      n: this.n,
      cx: this.cx,
      cy: this.cy,
      r: this.r * scale_factor,
      a: this.a + PI / 2,
      color: this.color
    });
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
