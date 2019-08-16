function preload() {
  cat_gif = []
  for (let i = 1; i <= 4; i++) {
    cat_gif.push(loadImage(`cat/catgif-0${i}.png`))
  }
  spider = loadImage('spider/spider.png')
}

function setup() {
  createCanvas(innerWidth, innerHeight)

  frame_rate = 60
  frameRate(frame_rate)

  cat_gif_speed = 5
  CAT_H = height / 4
  CAT_W = CAT_H * 1.6
  CAT_X = -CAT_W / 2
  CAT_Y = -100
  SPIDER_W = CAT_W * 0.65
  looping = true

  // feelings = ['happy', 'fearful', 'angry', 'bad', 'surprised', 'disgusted', 'sad']
  feelings = ['happy', 'fearful', 'angry', 'sad']

  happy = new Happy(height / 2, width / 5, height)
  sad = new Sad(100)
  angry = new Angry(map(width, 300, 3000, 20, 50), width/2, height * 0.07, 100, -width/2, height * 0.12, 200)
  fearful = new Fearful(CAT_X - 30, CAT_Y, SPIDER_W, SPIDER_W)

  animation_frames = {
    happy: 360,
    fearful: 360,
    angry: 360,
    bad: 0,
    surprised: 0,
    disgusted: 0,
    sad: 360
  }

  cumulative_animation_frames = []
  cumulative_frames = 0
  for (let feeling of feelings) {
    cumulative_animation_frames.push(cumulative_frames)
    cumulative_frames += animation_frames[feeling]
  }

  push()
  color_max = 100
  colorMode(HSB, color_max, color_max, color_max, color_max)

  feeling_colors = {
    happy: color(15, 100, 100),
    fearful: color(10, 80, 80),
    angry: color(0, 80, 90),
    bad: color(25, 70, 50),
    surprised: color(80, 80, 90),
    disgusted: color(8, 40, 40),
    sad: color(50, 80, 30)
  }
  pop()

  cat_gif_index = 0
  animation_index = 0
  current_feeling = 'happy'
}

function draw() {
  translate(width/2, height/2)

  if ((frameCount - 1) % cumulative_frames == cumulative_animation_frames[animation_index]){
    current_feeling = feelings[animation_index]
    animation_index = (animation_index + 1) % feelings.length
  }

  background(feeling_colors[current_feeling])

  if (current_feeling == 'sad') {
    sad.draw()
  } else if (current_feeling == 'happy') {
    happy.draw()
  } else if (current_feeling == 'angry') {
    angry.draw()
  } else if (current_feeling == 'fearful') {
    fearful.draw(spider, frameCount / 10000)
  }

  image(cat_gif[cat_gif_index % cat_gif.length], CAT_X, CAT_Y, CAT_W, CAT_H)

  push()
  resetMatrix()
  drawLabel(current_feeling, 100, 100)
  pop()

  if (frameCount % (frame_rate / cat_gif_speed) == 0) {
    cat_gif_index += 1
  }
}



function mousePressed() {
  if (looping) {
    looping = false
    noLoop()
  } else {
    looping = true
    loop()
  }
}

function drawLabel(name, x, y) {
  textSize(70)
  fill('white')
  text(name, x, y)
}