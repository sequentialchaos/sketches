function setup() {
  createCanvas(innerWidth, innerHeight);
  looping = true;
  // noLoop();
  arrows = [];
  for (let i = 0; i < 100; i++) {
    arrows.push({
      x: random(width),
      y: random(height),
      w: random(20, 30),
      h: random(20, 30)
    });
  }
}

function draw() {
  background(0);
  fill(255);

  arrows.forEach((a, i) => {
    // resetMatrix();
    translate(a.x + a.w / 2, a.y + a.h / 2);
    rotate(frameCount / (100 + i));
    translate(-a.w / 2, -a.h / 2);
    arrow(a.x, a.y, a.w, a.h);
  });
}

function arrow(x, y, w, h) {
  push();
  beginShape();

  vertex(x + w / 4, y);
  vertex(x + (w * 3) / 4, y);
  vertex(x + (w * 3) / 4, y + h / 2);
  vertex(x + w, y + h / 2);
  vertex(x + w / 2, y + h);
  vertex(x, y + h / 2);
  vertex(x + w / 4, y + h / 2);

  endShape();
  pop();
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
