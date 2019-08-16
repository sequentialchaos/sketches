

function setup() {
  min_length = min(innerWidth, innerHeight)
  createCanvas(min_length, min_length, P2D).center('horizontal')

  noLoop()

  colorMode(HSB, 100, 100, 100)
}

function draw() {
  background(50, 100, 100)
  drawSpiral(2, 10)

}

function drawSpiral(expansion_rate, max_radius) {
  let r = 0
  let x = 0
  let y = 0
  let a = 0
  while (r < max_radius) {
    r = r + expansion_rate
    print(r)
    let new_x = x + r * cos(a)
    let new_y = y + r * sin(a)
    fill(0)
    stroke(0)
    line(x, y, new_x, new_y)

    x = new_x
    y = new_y
  }
}