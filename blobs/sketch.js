let r, v, w;
let prev_x, prev_y;
let a = 0.4, b = 0.4;

const precision = 50
// let u = 0;


function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center("horizontal")
  
  colorMode(HSB)

  // frameRate(3)
  noLoop()

  r = width * 0.02

}

function draw() {
  // translate(width/2, height/2)
  background(0)
  
  for (let i = 0; i < 200; i++) {
    let cx = random(r*2, width - r*2),
        cy = random(r*2, height - r*2);
    fill(random(255), 100, 100)
    blob(cx, cy, r, precision)
  }
  // for (let i = 0; i < precision; i += 1) {
  //   let u = map(i, 0, TWO_PI * precision, 0, precision)
  //   let d = r * (1 + a * cos(2*u + v) + b * cos(3*u + w)),
  //       x = d * cos(u),
  //       y = d * sin(u);

    
  //   if (i > 0) {
  //     line(prev_x, prev_y, x, y)
  //   }

  //   prev_x = x
  //   prev_y = y

  //   stroke(255)
  //   strokeWeight(5)
  //   // point(x, y)
  //   // console.log(x, y)
  // }

  // a = noise(-2, 2)//random(-0.05, 0.05)
  // b = noise(-2, 2)//mouseY / height //random(-0.05, 0.05)
  // print(a, b)
  // v = mouseX / width//random(-0.05, 0.05)
  // w = mouseY / height //random(-0.05, 0.05)



}

function blob(cx, cy, r, precision) {
  stroke(255)
  strokeWeight(5)
  beginShape()
  if (random() < 0.5) {
    let a = 0.5//random(0, 1),
        b = 0.5//random(0, 1-a);
  } else {
    let b = 0.5//random(0, 1),
        a = random(0, 1-b);
  }

  let v = random(0, TWO_PI),
      w = random(0, TWO_PI);
  let prev_x, prev_y;
  for (let i = 0; i < precision; i += 1) {
    let u = map(i, 0, TWO_PI * precision, 0, precision)
    let d = r * (1 + a * cos(2*u + v) + b * cos(3*u + w)),
        x = cx + d * cos(u),
        y = cy + d * sin(u);

    
    if (i > 0) {
      line(prev_x, prev_y, x, y)
    }

    prev_x = x
    prev_y = y
    vertex(x, y)
    // console.log(x, y)
  }
  endShape()

}
