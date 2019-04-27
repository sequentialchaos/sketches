const bound = 50;
let i, len;
let reducedFractions = [];

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  
  frameRate(3)
  
  for (let n = 2; n < bound; n += 2) {
    for (let d = 1; d < 2; d++) {
      if (gcd(n, d) <= 1) {
        reducedFractions.push({ n:n, d:d })
      }
    }
  }
  
  i = 0
  len = reducedFractions.length
}

function draw() {
  translate(width/2, height/2)
  
  let reducedFraction = reducedFractions[i % len]
  let numerator = reducedFraction.n
  let denominator = reducedFraction.d

  background(10)
  stroke(200, 200, 200)
  strokeWeight(7)
  drawRose(0, 0, width*0.49, numerator, denominator, 0.0001)
  
  i++
}

function gcd(a, b) {
  if (b == 0) {
    return a
  }
  return gcd(b, a % b)
}

function drawRose(cx, cy, radius, numerator, denominator, ratio=0.001) {
  let k = numerator / denominator
  let x = [0, 0], 
      y = [0, 0];
  for (let i = 0; i < TWO_PI * denominator; i += TWO_PI * ratio) {
    let r = radius * cos(k*i)
    x[1] = cx + r * cos(i)
    y[1] = cy + r * sin(i)
    if (i > 0) {
      let dx = x[1] - cx,
          dy = y[1] - cy;
      push()
      colorMode(HSB)
      stroke(map(dx*dx + dy*dy, 0, radius*radius*0.85, 0, 255), 255, 230)
      line(x[0], y[0], x[1], y[1])
      pop()
    }
    x[0] = x[1]
    y[0] = y[1]
  }
}