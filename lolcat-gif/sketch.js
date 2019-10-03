function preload() {
  // font = loadFont("fonts/NotoEmoji-Regular.ttf");
  font = loadFont("fonts/OpenMoji-Black.ttf");
  // font = loadFont("fonts/emojione-svg.otf");
  font2 = loadFont("fonts/ALBA.ttf");
}

function setup() {
  size = 600;
  createCanvas(size, size);
  frameRate(60);
  animation_frames = 90;

  looping = true;
  if (!looping) {
    noLoop();
  }

  later = ["🚮", "🚴", "🤖"];
  kalilah = ["🦡", "🍯", "🐈", "🌟"];

  cat_x = 15;
  cat_y = size * 0.725;
  cat = new Emoji(font, "🦥", size * 0.88, cat_x, cat_y);
  // caption = new Emoji(
  //   font2,
  //   "don't litter",
  //   size * 0.5,
  //   cat_x,
  //   cat_y + size * 0.2
  // );
  // cat.reorderPoints((based_on = "center"));

  textFont(font2);
  textSize(70);
  textAlign(CENTER);

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
}

function draw() {
  // clear();
  background(0);
  push();
  colorMode(HSB, 1, 1, 1, 1);
  stroke(0.35, 0.6, 0.85, 0.9);
  strokeWeight(40);
  noFill();
  rect(0, 0, width, height);
  pop();
  // cat.fillEmoji("darkgray");
  cat.drawPointsRainbow(3, 10 * animation_frames, 10, frameCount);
  fill(255);

  text("kalila's badger", width / 2, height * 0.84);
  // caption.drawPointsRainbow(3, 10 * animation_frames, 10, frameCount);
  // cat.drawPointsGradient(17, color("white"), color("lightgray"), frameCount);
  if (record) {
    capturer.capture(canvas);
    if (frameCount >= animation_frames) {
      capturer.stop();
      capturer.save();
      noLoop();
    }
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
        (((i + frame_count) % this.points.length) * 2) / this.points.length
      );
      noStroke();
      fill(fill_color);
      circle(p.x, p.y, point_diameter);
    }
  }

  // drawPointsRainbow(point_diameter, hue_max, hue_offset, frame_count) {
  //   colorMode(HSB, hue_max - 1, 100, hue_max - 1);
  //   for (let i = 0; i < this.points.length; i++) {
  //     let p = this.points[i];
  //     let h = map(i, 0, this.points.length - 1, 0, hue_max - 1);
  //     noStroke();
  //     let new_hue = (h + hue_offset * (frame_count - 1)) % hue_max;
  //     fill(new_hue, 10, new_hue);
  //     circle(p.x, p.y, point_diameter);
  //   }
  // }

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

// function mousePressed() {
//   if (looping) {
//     noLoop();
//     looping = false;
//   } else {
//     loop();
//     looping = true;
//   }
// }
