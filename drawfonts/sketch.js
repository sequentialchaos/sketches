function preload() {
  // font = loadFont("fonts/Nikolas & Pine.otf");
  // font = loadFont("fonts/Ants Valley.otf");
  font = loadFont("fonts/NotoEmoji-Regular.ttf");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  looping = true;
  if (!looping) {
    noLoop();
  }

  cat_x = -(409 - 323) / 2;
  cat_y = 409;
  cat = new Emoji(font, "🐈", 400, cat_x, cat_y);
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

  drawPoints(point_diameter, fill_color) {
    fill(fill_color);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      circle(p.x, p.y, point_diameter);
    }
  }

  drawPointsRainbow(point_diameter, hue_max, hue_offset, frame_count) {
    colorMode(HSB, hue_max, 100, 100);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let h = map(i, 0, this.points.length - 1, 0, hue_max);
      noStroke();
      fill((h + hue_offset * frame_count) % hue_max, 100, 100);
      circle(p.x, p.y, point_diameter);
    }
  }

  drawPointsGradient(point_diameter, color1, color2, frame_count) {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let fill_color = lerpColor(
        color1,
        color2,
        ((i + frame_count) % this.points.length) / this.points.length
      );
      fill(fill_color);
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
    print(percent);
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
