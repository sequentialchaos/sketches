function setup() {
  createCanvas(800, 800);
  num_circles = 9
  circle_diameter = width*0.1
  rotation_speed = 0.005
  rotation_offset = radians(20)
  blink_speed = 0.4
  noStroke()
  
  beige = color(255, 255, 200)
  gray = color(216)
  mystery_color = color(100, 100, 118)
}

function draw() {
  background(220)
  
  drawStripes(9, PI/4)
  
  circle_color = color(map(sin(frameCount*blink_speed), -1, 1, 0, 216))
  fill(circle_color)
  
  translate(width/2, height/2)
  
  for(let i=0; i<num_circles; i++) {
    cx = cos(i/num_circles*TWO_PI+frameCount*rotation_speed + rotation_offset)*width/3
    cy = sin(i/num_circles*TWO_PI+frameCount*rotation_speed + rotation_offset)*width/3
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
    fill(a, a, map(i % 2, 0, 1, 0, 200))
    rect(0, 0, strip_width, height*4)
    translate(strip_width, 0)
    
  }
    pop()
  
}