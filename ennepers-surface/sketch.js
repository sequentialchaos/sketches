let x, y, z, r;
let angle = 0;
let m = 2.1;
const precision = 150;

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length, WEBGL).center('horizontal')
  frameRate(2)
  background(0)
  noLoop()

  r = width * 0.032
}

function draw() {
  rotateX(angle)
  rotateY(angle)
  normalMaterial()
  for (let i = 0; i < precision; i++) {
    let u = map(i, 0, precision, -m, m)
    for (let j = 0; j < precision; j++) {
      let v = map(j, 0, precision, -m, m)
      x = r * (u - u*u*u / 3 + u*v*v)
      y = r * (v - v*v*v / 3 + u*u*v)
      z = r * (u*u - v*v)
      push()
      translate(x, y, z)
      // stroke(255)
      // strokeWeight(3)
      // point(x, y, z)
      sphere(4)
      pop()
    }
    angle += TWO_PI / 100
  }
  // let u = random(-2, 2),
  //     v = random(-2, 2);

  // x = r * (u - u*u*u / 3 + u*v*v)
  // y = r * (v - v*v*v / 3 + u*u*v)
  // z = r * (u*u - v*v)

  // console.log(x, y, z)
  // // console.log()


  // normalMaterial()


 
  // push()
  // translate(x, y, z)
  // // stroke(255)
  // strokeWeight(3)
  // // point(x, y, z)
  // sphere(5)
  // pop()



}