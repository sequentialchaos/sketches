

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  translate(width/2, height/2)
  drawTriangle(0, height*0.1, length * 0.25, 0.5)
}


function drawTriangle(cx, cy, r, ratio) {
  let triangle = new RegularPolygon({cx:cx, cy:cy, n:3, r:r})
  triangle.draw()
  if (r > 4) {
    let v = triangle.vertices
    drawTriangle(v[0].x, v[0].y, r*ratio, ratio)
    drawTriangle(v[1].x, v[1].y, r*ratio, ratio)
    drawTriangle(v[2].x, v[2].y, r*ratio, ratio)
  }
}
