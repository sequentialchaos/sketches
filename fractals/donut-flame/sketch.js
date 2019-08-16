// n = 4
let donut_flame = new L_system(
  axiom = 'F+F+F+F+F+F',
  rules = {
    F: '+F+F-F'
  },
  len = 20,
  angle = 60,
  max_iterations = 10
)

let donut_flame2 = new L_system(
  axiom = 'F+F+F+F+F',
  rules = {
    F: '+F+F-F'
  },
  len = 2,
  angle = 72,
  max_iterations = 10
)

let d;

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  noLoop()
  frameRate(3)
  d = donut_flame.copy()
  for (let i = 0; i < 4; i++) {
    donut_flame.getNextInstructions()
  }

  // d.draw({
  //   len: length * 0.035,
  //   mode: 'absolute',
  //   colormode: 'normal',
  //   show: false
  // })
  // translate(-200, 0)
  donut_flame.draw({
    len: length * 0.035,
    mode: 'absolute',
    colormode: 'normal',
    show: false
  })
  console.log(donut_flame.turtle.angle_delta)

  x_offset = width * 0.2
  y_offset = height * 0.6

}


function draw() {
  background(0)
  // translate(width * 0.2, height * 0.56)
  // rotate(radians(25))
  // rotate(frameCount / PI)

  colorMode(HSB, 100)
  for (let l of donut_flame.turtle.lines) {
    stroke(random(100), 100, 100)
    strokeWeight(3)
    line(l.x1 + x_offset, l.y1 + y_offset, l.x2 + x_offset, l.y2 + y_offset)
  }
  print(donut_flame.turtle.lines)
  plotter_points = formatForPlotter(donut_flame.turtle.lines, width, 0.2, 0.6)
  print(plotter_points)
  for (let p of plotter_points) {
    createP(p)
  }
  print(donut_flame.instructions)
}


function formatForPlotter(lines, w, x_offset_ratio, y_offset_ratio) {
  let plotter_points = []
  let scale_factor = 7650 / w
  let x_offset = 7650 * x_offset_ratio,
      y_offset = 7650 * y_offset_ratio
  plotter_points.push('SP1;')
  for (let [i, l] of lines.entries()) {
    let x1 = round(l.x1 * scale_factor) + x_offset,
        y1 = round(l.y1 * scale_factor) + y_offset;   
    plotter_points.push(`PA${x1},${y1};`)
    if (i == 0) {
      plotter_points.push('PD;')
    }
  }
  plotter_points.push('PU;')
  plotter_points.push('SP0;')
  return plotter_points
}