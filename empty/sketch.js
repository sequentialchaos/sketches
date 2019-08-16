function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  noLoop()
  background(0)
  stroke(255)
  fill(255)
  arc(100, 100, 100, 100, -PI / 2, PI / 2)
}

// function draw() {

// }