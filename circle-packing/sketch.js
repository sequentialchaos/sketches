function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);

  circles = [];
  num_circles = 0;
  max_circles = map(width * height, 700000, 3000000, 2500, 6000);
  min_radius = 2;
  max_radius = 50;
  attempts_per_loop = 4;

  background(0);
  colorMode(HSB, 100, 100, 100, 100);
}

function draw() {
  noStroke();
  fill(random(100), 50, map(frameCount, 0, 100, 85, 100));

  for (let i = 0; i < attempts_per_loop; i++) {
    generateCircle(circles);
    if (circles.length >= max_circles) {
      noLoop();
    }
  }
}

function generateCircle() {
  let new_circle = {
    cx: int(Math.random() * width),
    cy: int(Math.random() * height),
    r: min_radius
  };

  if (!doesCircleFit(new_circle)) {
    return;
  }

  while (doesCircleFit(new_circle) && new_circle.r < max_radius) {
    circle(new_circle.cx, new_circle.cy, new_circle.r);
    new_circle.r += 1;
  }

  circles.push(new_circle);
  circle(new_circle.cx, new_circle.cy, new_circle.r);
}

function doesCircleFit(c) {
  for (let i = 0; i < circles.length; i++) {
    if (doCirclesCollide(c, circles[i])) {
      return false;
    }
  }
  return true;
}

function doCirclesCollide(c1, c2) {
  let distance = Math.sqrt((c1.cx - c2.cx) ** 2 + (c1.cy - c2.cy) ** 2);
  if (distance < c1.r + c2.r) {
    return true;
  } else {
    return false;
  }
}

function mouseClicked() {
  background(0, 0, 0, 70);
  circles = [];
  loop();
}
