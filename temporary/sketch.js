function setup() {
  createCanvas(innerWidth, innerHeight)
  noLoop()
}

function draw() {
  background(127)
  fill(255, 100, 100)
  stroke('darkcyan')
  drawHexGrid(200)
}

function drawHexGrid(r) {
  let cy = 0
  for (let i = 0; i < 5; i++) {
    let cx = 0
    for (let j = 0; j < 5; j++) {
      drawHex(cx, cy, r)
      cx += 2.0 * r      
    }
    cy += r * 1.73205
  }
} 

function drawHex(cx, cy, r) {
  beginShape()
  for (let side = 0; side < 6; side++) {
    let angle = PI/6 + map(side, 0, 6, 0, TWO_PI)
    let x = cx + r * cos(angle)
    let y = cy + r * sin(angle)
    vertex(x, y)
  }
  endShape(CLOSE)
}