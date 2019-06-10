function setup() {
  frame_rate = 60
  duration = 20
  animationFrames = frame_rate*duration
  
  length = min(innerWidth, innerHeight)
  p5canvas = createCanvas(length, length).center('horizontal')
  canvas = p5canvas.canvas
  frameRate(frame_rate)
  num_circles = 2
  circle_diameter = width*0.2
  rotation_offset = radians(45)
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
      format: 'gif',
      workersPath: "../../../../lib/",
      verbose: true
    });
  }
}

function draw() {
  t = (frameCount % animationFrames) / animationFrames
  
  background(220)
  
  drawStripes(2, radians(45), t)
  //drawSheet(t)
  

  translate(width/2, height/2)
  
//   for(let i=0; i<num_circles; i++) {
//     cx = cos(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
//     cy = sin(i/num_circles*TWO_PI+TWO_PI*t + rotation_offset)*outer_radius
    
//     illusion_time = 0.3
//     if (t<illusion_time) {
//       border_diameter = 0
//     } else {
//       //border_diameter = map(sin(TWO_PI*t), -1, -0.5, 0, 1.5*width)
//       border_diameter = -sin(TWO_PI*t)*1.5*width
//       border_diameter = sin(map(t, illusion_time, 1, 0, PI))*1.7*width
//     }
//     push()
//     colorMode(HSB, 1, 1, 1)
//     rainbow = color((map(t, illusion_time, 1, 0, 1)+1/7)%1, 0.666, 0.8)
//     fill(rainbow)
//     circle(cx, cy, border_diameter)   
//     pop()
//   }
  for(let i=0; i<num_circles; i++) {
    cx = cos(i/num_circles*TWO_PI+TWO_PI + rotation_offset)*outer_radius
    cy = sin(i/num_circles*TWO_PI+TWO_PI + rotation_offset)*outer_radius
    
    circle_color = color(map(sin(TWO_PI*t*duration*2), -1, 1, gray_offset, 255 - gray_offset))
    fill(circle_color)
    circle(cx, cy, circle_diameter)
  }
}

function easeInOutQuart(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }


function elasticOut(t) {
  a = 1
  p = 0.3
  s = Math.asin(1 / (a = Math.max(1, a))) * (p /= TWO_PI);
  return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
}

function drawStripes(num_stripes, angle, t) {
  push()
  rotate(angle)
  strip_width = width / num_stripes / sin(angle) * 2
  q = easeInOutQuart(t*4 % 1)
  if (t < 0.25) {
    x_translation = map(q, 0, 1, 0, strip_width / 2) 
  } else if (t < 0.5) {
    x_translation = map(q, 0, 1, strip_width / 2, strip_width) 
  } else if (t < 0.75) {
    x_translation = map(q, 0, 1, strip_width, strip_width / 2) 
  } else  {
    x_translation = map(q, 0, 1, strip_width / 2, 0) 
  }

  translate(x_translation,  -height)
  for (let i = 0; i < num_stripes; i++) {

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