let a = [0, 0, 0];
let b = [0, 0, 0];
const max_n = 100;

function setup() {
  let length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  
  noLoop()
  pixelDensity(1)
  loadPixels()
  background(40)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      a[0] = map(x, 0, width, -1.2, 1.2)
      b[0] = map(y, 0, height, -1.2, 1.2)
      a[1] = a[0]
      b[1] = b[0]
      let n = 0
      while (n < max_n) {
        a[2] = a[0]*a[0] - b[0]*b[0]
        b[2] = 2*a[0]*b[0]
        a[0] = a[2] + 0.34
        b[0] = b[2] - 0.05
        if (abs(a[0] + b[0]) > 32) {
          break
        }
        n++
      }


      let red = map(n, 0, max_n, 0, 200)
      let blue = map(n, 0, max_n, 100, 200)
      let green = map(n, 0, max_n, 100, 200)
      if (n >= max_n) {
        red = 0
        blue = 0
        green = 0
      }

      let p = (x + y * width) * 4
      pixels[p + 0] = red
      pixels[p + 1] = green
      pixels[p + 2] = blue 
      pixels[p + 3] = 255
    }
  }
  updatePixels()
}
