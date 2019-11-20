let a = [0, 0, 0];
let b = [0, 0, 0];
const max_n = 100;

function setup() {
  let length = min(innerWidth, innerHeight);
  if (length == innerWidth) {
    createCanvas(length, floor(length * 0.8)).center("horizontal");
  } else {
    createCanvas(floor(length * 1.25), length).center("horizontal");
  }
  // createCanvas(innerWidth, innerHeight)
  noLoop();
  pixelDensity(1);
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      a[0] = map(x, 0, width, -2, 0.5);
      b[0] = map(y, 0, height, -1, 1);
      a[1] = a[0];
      b[1] = b[0];
      let n = 0;
      while (n < max_n) {
        a[2] = a[0] * a[0] - b[0] * b[0];
        b[2] = 2 * a[0] * b[0];
        a[0] = a[2] + a[1];
        b[0] = b[2] + b[1];
        if (abs(a[0] + b[0]) > 32) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, max_n, 0, 255);
      if (n === max_n) {
        bright = 0;
      }

      let p = (x + y * width) * 4;
      pixels[p + 0] = bright;
      pixels[p + 1] = bright;
      pixels[p + 2] = bright;
      pixels[p + 3] = 255;
    }
  }
  updatePixels();
}
