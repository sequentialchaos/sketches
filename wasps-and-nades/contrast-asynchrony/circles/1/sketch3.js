function setup() {
  frame_rate = 60
  duration = 14
  animationFrames = frame_rate*duration
  
  length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  frameRate(frame_rate)
  num_circles = 2
  circle_diameter = width*0.15
  rotation_speed = 0.003
  rotation_offset = radians(-120)
  blink_speed = 0.2
  outer_radius = width*0.3
  reveal_speed = 0.014
  noStroke()
  
  
  gray_offset = 15
  gray = color(127)
  mystery_color = color(100, 100, 118)
  pink = color("#d83c85")

  record = false
  if (record) {
    capturer = new CCapture({
      framerate: 60,
      format: "gif",
      workersPath: "../../../../lib/",
      verbose: true
    })
    capturer.start()
  }
}

function draw() {
  t = (frameCount % animationFrames) / animationFrames
  
  background(220)
  
  drawStripes(2, radians(45))
  //drawSheet(t)
  

  translate(width/2, height/2)
  
  for(let i=0; i<num_circles; i++) {
    cx = cos(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    cy = sin(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    
    illusion_time = 0.3
    if (t<illusion_time) {
      border_diameter = 0
    } else {
      //border_diameter = map(sin(TWO_PI*t), -1, -0.5, 0, 1.5*width)
      border_diameter = -sin(TWO_PI*t)*1.5*width
      border_diameter = sin(map(t, illusion_time, 1, 0, PI))*1.7*width
    }
    push()
    colorMode(HSB, 1, 1, 1)
    rainbow = color((map(t, illusion_time, 1, 0, 1)+1/7)%1, 0.666, 0.8)
    fill(rainbow)
    circle(cx, cy, border_diameter)   
    pop()
  }
  for(let i=0; i<num_circles; i++) {
    cx = cos(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    cy = sin(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    
    circle_color = color(map(sin(TWO_PI*t*duration*2), -1, 1, gray_offset, 255 - gray_offset))
    fill(circle_color)
    circle(cx, cy, circle_diameter)
  }
  if (record) {
    capturer.capture(canvas)
    if (frameCount >= animationFrames-1) {
      capturer.stop()
      capturer.save()
      noLoop()
    }
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
      fill(gray_offset)
    } else {
      fill(255 - gray_offset)
    }
    rect(0, 0, strip_width, height*4)
    translate(strip_width, 0)
    
  }
    pop()
  
}

function drawSheet(t) {
  pink.setAlpha(map(sin(TWO_PI*t), -0.5, 0.5, 255, 0))
  fill(pink)
  rect(0, 0, width, height)
}