

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  translate(width/2, height/2)
  drawSquare(0, 0, length * 0.354, 0.5)
}


function drawSquare(cx, cy, r, ratio) {
  let square = new RegularPolygon({cx:cx, cy:cy, n:4, r:r, theta:-PI/4})
  square.draw()
  if (r > 4) {
    let v = square.vertices
    drawSquare(v[0].x, v[0].y, r*ratio, ratio)
    drawSquare(v[1].x, v[1].y, r*ratio, ratio)
    drawSquare(v[2].x, v[2].y, r*ratio, ratio)
    drawSquare(v[3].x, v[3].y, r*ratio, ratio)
  }
}
