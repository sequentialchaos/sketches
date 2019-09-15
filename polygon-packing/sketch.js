function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);

  polygons = [];
  num_polygons = 0;
  max_polygons = map(width * height, 700000, 3000000, 2500, 6000);
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
    generateCircle(polygons);
    if (polygons.length >= max_polygons) {
      noLoop();
    }
  }
}

function generatePolygon() {
  let new_polygon = {
    cx: int(Math.random() * width),
    cy: int(Math.random() * height),
    r: min_radius,
    n: int(random(3, 10))
  };

  if (!doesPolygonFit(new_polygon)) {
    return;
  }

  while (doesPolygonFit(new_polygon) && new_polygon.r < max_radius) {
    new_polygon.r += 1;
  }

  polygons.push(new_polygon);
  let num_sides = int(random(3, 10));
  inscribePolygon(num_sides, new_polygon.cx, new_polygon.cy, new_polygon.r);
}

function doesPolygonFit(c) {
  for (let i = 0; i < polygons.length; i++) {
    if (doPolygonsCollide(c, polygons[i])) {
      return false;
    }
  }
  return true;
}

function P(c1, c2) {
  let distance = Math.sqrt((c1.cx - c2.cx) ** 2 + (c1.cy - c2.cy) ** 2);
  if (distance < c1.r + c2.r) {
    return true;
  } else {
    return false;
  }
}

function inscribePolygon(n, cx, cy, r) {
  beginShape();
  let start_angle = Math.random() * PI;
  for (let i = 0; i < n; i++) {
    let angle = map(i, 0, n, start_angle, start_angle + TWO_PI);
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  background(0, 0, 0, 70);
  polygons = [];
  loop();
}
