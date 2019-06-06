// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ikwNrFvnL3g


function setup() {
  createCanvas(400, 400).center('horizontal');
  frameRate(10)
  pixelDensity(1);
  settings = function() {
    this.inc = 0.01
  }
  s = new settings()
  gui = new dat.GUI(s)
  gui.add(s, 'inc', 0.0001, 0.1, 0.001)
}

function draw() {
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      xoff += s.inc;
    }
    yoff += s.inc;
  }
  updatePixels();
}