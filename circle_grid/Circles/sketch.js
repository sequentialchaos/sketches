let width, height;
let rows, columns;
let r,g,b;

function setup() {
  width = 700;
  height = 700;

  rows = 20;
  columns = 25;

  createCanvas(width, height);
  setColor(r,g,b);
  background(180);
  drawBackground();
}

function setColor() {
  r = random(256);
  g = random(256);
  b = random(256);
}

function mouseClicked() {
  setColor();
  return false;
}

function draw() {
  
}

function drawBackground() {
  let padding = 9;
  let diameter = width / columns;
  let radius = diameter / 2;
  for (let x = radius; x < width; x += diameter) {
    for (let y = radius; y < height; y += diameter) {
      fill(r,g,b);
      ellipse(x, y, diameter - padding, diameter - padding);
    }
  }
}