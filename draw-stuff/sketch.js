let n = 8
let x, y, numPoints;
let triangles = [],
    squares = [];

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // frameRate(30)
  // noLoop()
  
  numPoints = 3*4*10
  x = width / (n+1)
  y = height / (n+1)

  let P = length / (n-2),
      pad = P / 3;

  for (let i = 1; i <= n; i++) {
    let triangle = new RegularPolygon({cx:pad + x*i, cy:pad, n:i+2, P:P, numPoints:numPoints})
    let square = new RegularPolygon({cx:pad, cy: pad+y*i, n:i+2, P:P, numPoints:numPoints})
    triangles.push(triangle)
    squares.push(square)
  }

  // translate(width / 2, height / 2)

  background(30)
  stroke(225)
  strokeWeight(3)
  for (let triangle of triangles) {
    for (let square of squares) {
      triangle.draw()
      square.draw()
      let shape = triangle.morphWith(square)
      shape.drawPoints()
    }
  }

}

// function draw() {

// }

