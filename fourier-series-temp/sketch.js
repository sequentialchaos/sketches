// References:
// Coding Train - https://www.youtube.com/watch?v=Mm2eYfj0SgA

let cx, cy, r, d;
let maxSlider;
let time = 0;
let wave = [];

function setup() {
  const length = min(innerWidth, innerHeight);
  if (length == innerWidth) {
    createCanvas(length, floor(length * 0.75)).center("horizontal");
  } else {
    createCanvas(floor(length * 1.33), length).center("horizontal");
  }

  frameRate(30);

  cx = 0;
  cy = 0;
  r = width * 0.12;
  d = r * 2;

  maxSlider = createSlider(1, 100, 4, 1);
  maxSlider.position(
    innerWidth * 0.5 - maxSlider.size().width / 2,
    height * 0.84
  );
}

function draw() {
  translate(d * 1.2, height / 2);

  background(127, 10);

  let x = 0;
  let y = 0;
  for (let i = 0; i < maxSlider.value(); i++) {
    let prevX = x;
    let prevY = y;

    let n = 2 * i + 1;
    let radius = r * r1(n);

    sliderLabel(maxSlider);

    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 200);
    strokeWeight(3);
    noFill();

    point(x, y);
    // line(prevX, prevY, x, y);
  }
  wave.unshift(y);

  translate(d * 1.2, 0);

  if (wave.length > width - d * 2.5) {
    wave.pop();
  }

  time += 0.035;
}

function r1(n) {
  return 4 / (n * PI);
}

function r2(n) {
  let sign = n % 2 == 0 ? -1 : 1;
  return 2 / (n * sign * PI);
}

function sliderLabel(slider) {
  push();
  translate(-d * 1.2, -height / 2);
  stroke(0);
  fill(0);
  textSize(map(width, 300, 1200, 20, 50));
  textAlign(CENTER, CENTER);
  text(slider.value() + " circles", width / 2, height * 0.15);
  pop();
}
