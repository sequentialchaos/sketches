function setup() {
  createCanvas(innerWidth, innerHeight);
  l = {
    x1: -width * 0.25,
    y1: 0,
    x2: width * 0.25,
    y2: 0
  };

  colorMode(HSB, 1, 1, 1);
  num_polygons = 20;
  polygons = [];
  for (let i = 0; i < num_polygons; i++) {
    polygons.push(
      new Polygon({
        n: 12,
        r: 20 + map(i, 0, num_polygons - 1, 0, width * 0.45),
        color: color(i / num_polygons, 1, 0.9),
        cy: 0
      })
    );
  }
  frame_rate = 60;
  anim_seconds = 60;
  anim_frames = frame_rate * anim_seconds;
  looping = false;
  if (!looping) {
    noLoop();
  } else {
    frameRate(frame_rate);
  }
}

function draw() {
  translate(width / 2, height / 2);

  stroke("white");
  // line(l.x1, l.y1, l.x2, l.y2);

  p = (frameCount % anim_frames) / anim_frames;
  background(0.02);
  // cx = lerp(l.x1, l.x2, p);
  // cy = lerp(l.y1, l.y2, p);
  // fill(p, 0.8, 0.9);
  // circle(cx, cy, 5);
  polygons.forEach(polygon => {
    // polygon.draw();
    polygon.trace(p, 3);
  });
  polygons[19].draw();
  // polygons[1].trace(p);
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

  trace(p, d) {
    let i = int(p * this.n);
    let v1 = this.vertices[i];
    let v2 = this.vertices[(i + 1) % this.vertices.length];
    let x = lerp(v1.x, v2.x, (p % (1 / this.n)) * this.n);
    let y = lerp(v1.y, v2.y, (p % (1 / this.n)) * this.n);
    fill(this.color);
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
