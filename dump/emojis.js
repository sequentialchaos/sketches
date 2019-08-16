
function setup() {
  createCanvas(innerWidth, innerHeight)
  noLoop()
  cats = []
  emoji_size = 100
}

function draw() {
  // translate(width / 2, height / 2)

  background(0)
  for (let i = 0; i < howManyEmojis(emoji_size, width * height); i++) {
    x = random(emoji_size, width - emoji_size)
    y = random(emoji_size, height - emoji_size)
    cat = new Emoji("cat", x, y)
    cats.push(cat)
    cat.draw(emoji_size)
  }
}

function mousePressed() {
  redraw()
}

function howManyEmojis(emoji_size, available_area) {
  return available_area / (emoji_size * 1000)
}


const emojis = {
  "cat" : "🐈",
  "turtle" : "🐢"
}

class Emoji {
  constructor(name, x, y) {
    this.name = name
    this.char = emojis[name]
    this.x = x
    this.y = y
  }
  draw(size) {
    push()
    translate(this.x, this.y)
    // rotate(PI/2)
    fill(255)
    textSize(size)
    text(this.char, 0, 0)
    pop()
  }
}