

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  translate(width/2, height/2)
  background(30)
  drawStuff(0, 0, length * 0.25, 0.5)
}


function drawStuff(cx, cy, r, ratio, i=0) {
  fill(70, map(i, 0, 7, 0, 255), 175)
  if (i % 2 == 0) {
    let square = new RegularPolygon({cx:cx, cy:cy, n:4, r:r})
    square.draw(false)
    if (r > 4) {
      let v = square.vertices
      drawStuff(v[0].x, v[0].y, r*ratio, ratio, i+1)
      drawStuff(v[1].x, v[1].y, r*ratio, ratio, i+1)
      drawStuff(v[2].x, v[2].y, r*ratio, ratio, i+1)
      drawStuff(v[3].x, v[3].y, r*ratio, ratio, i+1)
    }
  } else {
    let triangle = new RegularPolygon({cx:cx, cy:cy, n:3, r:r})
    triangle.draw(false)
    if (r > 4) {
      let v = triangle.vertices
      drawStuff(v[0].x, v[0].y, r*ratio, ratio, i+1)
      drawStuff(v[1].x, v[1].y, r*ratio, ratio, i+1)
      drawStuff(v[2].x, v[2].y, r*ratio, ratio, i+1)
    }
  }


}
