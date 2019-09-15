function preload() {
  font = loadFont("fonts/NotoEmoji-Regular.ttf");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  looping = true;
  if (!looping) {
    noLoop();
  }

  cat_x = -(409 - 323) * 0.85;
  cat_y = 409;
  cat = new Emoji(font, "🐈", 400, cat_x, cat_y);
  // cat.reorderPoints("y");
  cat.scatter(width, height);
}

function draw() {
  background(0);
  anim_frames = 60;
  if (frameCount <= anim_frames) {
    cat.unscatter(2, 0, anim_frames, frameCount);
  } else {
    cat.drawPointsRainbow(2, 700, 10, frameCount);
  }
}

class Emoji {
  constructor(font, text, fontsize, x, y) {
    this.font = font;
    this.text = text;
    this.fontsize = fontsize;
    this.x = x;
    this.y = y;
    this.points = font.textToPoints(text, x, y, fontsize);
  }

  move(dx, dy) {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      p.x += dx;
      p.y += dy;
    }
  }

  reorderPoints(based_on = "x", ascending = true) {
    if (based_on == "x") {
      if (ascending) {
        this.points.sort((p, q) => p.x - q.x);
      } else {
        this.points.sort((p, q) => q.x - p.x);
      }
    } else if (based_on == "y") {
      if (ascending) {
        this.points.sort((p, q) => p.y - q.y);
      } else {
        this.points.sort((p, q) => q.y - p.y);
      }
    } else if (based_on == "center") {
      let c = this.calculateCenterPoint();
      this.points.sort((p, q) => dist(c, p) - dist(c, q));
    }
  }

  calculateCenterPoint() {
    let sum_x = 0;
    let sum_y = 0;
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      sum_x += p.x;
      sum_y += p.y;
    }
    let avg_x = sum_x / this.points.length;
    let avg_y = sum_y / this.points.length;
    return { x: avg_x, y: avg_y };
  }

  drawPoints(point_diameter, fill_color) {
    fill(fill_color);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      circle(p.x, p.y, point_diameter);
    }
  }

  drawPointsRainbow(point_diameter, hue_max, hue_offset, frame_count) {
    colorMode(HSB, hue_max - 1, 100, 100);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let h = map(i, 0, this.points.length - 1, 0, hue_max - 1);
      noStroke();
      fill((h + hue_offset * (frame_count - 1)) % hue_max, 100, 100);
      circle(p.x, p.y, point_diameter);
    }
  }

  drawPointsGradient(point_diameter, color1, color2, frame_count) {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let fill_color = lerpColor(
        color1,
        color2,
        (((i + frame_count) % this.points.length) * 2) / this.points.length
      );
      noStroke();
      fill(fill_color);
      circle(p.x, p.y, point_diameter);
    }
  }

  drawPointsRainbow(point_diameter, hue_max, hue_offset, frame_count) {
    colorMode(HSB, hue_max - 1, 100, 100);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let h = map(i, 0, this.points.length - 1, 0, hue_max - 1);
      noStroke();
      fill((h + hue_offset * (frame_count - 1)) % hue_max, 100, 100);
      circle(p.x, p.y, point_diameter);
    }
  }

  drawSomePoints(percentage, fill_color, point_diameter) {
    fill(fill_color);
    for (let i = 0; i < this.points.length * percentage; i++) {
      let p = this.points[i];
      circle(p.x, p.y, point_diameter);
    }
  }

  fillEmoji(fill_color) {
    fill(fill_color);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }

  scatter(w, h) {
    this.scattered_points = [];
    for (let i = 0; i < this.points.length; i++) {
      let x = random(w);
      let y = random(h);
      this.scattered_points.push({ x: x, y: y });
    }
  }

  unscatter(point_diameter, start_frame, anim_frames, frame_count) {
    let percent = frame_count / (start_frame + anim_frames);
    for (let i = 0; i < this.scattered_points.length; i++) {
      let p1 = this.scattered_points[i];
      let p2 = this.points[i];
      let new_x = lerp(p1.x, p2.x, percent);
      let new_y = lerp(p1.y, p2.y, percent);
      circle(new_x, new_y, point_diameter);
    }
  }
}

function getBoundingBox(points) {
  let xs = points.map(p => p.x);
  let xmin = min(xs);
  let xmax = max(xs);

  let ys = points.map(p => p.y);
  let ymin = min(ys);
  let ymax = max(ys);

  return [xmin, ymin, xmax, ymax];
}

function drawBoundingBox(box) {
  fill("darkgray");
  rect(box[0], box[1], box[2] - box[0], box[3] - box[1]);
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
