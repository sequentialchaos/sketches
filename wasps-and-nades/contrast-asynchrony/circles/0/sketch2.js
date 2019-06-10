function setup() {
  frame_rate = 60
  duration = 10
  animationFrames = frame_rate*duration
  
  createCanvas(400, 400)
  frameRate(frame_rate)
  num_circles = 2
  circle_diameter = width*0.3
  rotation_speed = 0.003
  rotation_offset = radians(20)
  blink_speed = 0.2
  outer_radius = width*0.3
  reveal_speed = 0.014
  noStroke()
  
  gray = color(216)
  mystery_color = color(100, 100, 118)
}

function draw() {
  t = (frameCount % animationFrames) / animationFrames
  
  background(220)
  
  drawStripes(2, radians(45))
  drawSheet(t)
  
  circle_color = color(map(sin(TWO_PI*t*20), -1, 1, 0, 255))
  fill(circle_color)
  
  translate(width/2, height/2)
  
  for(let i=0; i<num_circles; i++) {
    cx = cos(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    cy = sin(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    circle(cx, cy, circle_diameter)
  }
}

function drawStripes(num_stripes, angle) {
  push()
  rotate(angle)
  translate(0, -height)
  for (let i = 0; i < num_stripes; i++) {
    strip_width = width / num_stripes / sin(angle)

    a = map(i % 2, 0, 1, 0, 255)
    b = map(i % 2, 0, 1, 0, 200)
    
    //fill(a, b, map(i % 2, 0, 1, 0, 200))
    if (i % 2 == 0) {
      fill(0)
    } else {
      fill(255)
    }
    rect(0, 0, strip_width, height*4)
    translate(strip_width, 0)
    
  }
    pop()
  
}

function drawSheet(t) {
  pink = color("#d83c85")
  pink.setAlpha(map(sin(TWO_PI*t), -0.5, 0.5, 255, 0))
  fill(pink)
  rect(0, 0, width, height)
}