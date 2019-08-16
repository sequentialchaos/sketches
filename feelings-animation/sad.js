class SnowFlake {
  constructor(x, y, d){
    this.x = x
    this.y = y
    this.d = d
    this.dx = int((Math.random() - 0.5) * 2.1)
    this.dy = Math.random() * 2 + 2
    this.x_start = x
    this.x_range = abs(this.dx * 30)
  }

  draw(){
    push()
    colorMode(HSB, 100, 100, 100)
    fill(0, 0, 70)
    noStroke()
    circle(this.x, this.y, this.d)
    pop()
  }

  move(){
    this.y += this.dy
    if (this.y > height/2){
      this.y = -height/2
    }
    if (Math.random() > 0.6) {
      this.x += this.dx
    }
    if (this.x > this.x_start + this.x_range) { 
      this.dx *= -1
    }
    if (this.x < this.x_start - this.x_range) { 
      this.dx *= -1
    }
  }
}

class Sad{
  constructor(num_snowflakes){
    this.snowflakes = []

    for (let i = 0; i < num_snowflakes; i++){
      let x = random(-width/2, width/2)
      let y = random(-height/2 - height, -height/2)
      let d = random(1, 5)
      this.snowflakes.push(new SnowFlake(x, y, d))
    }
  }

  draw(){
    for (let i = 0; i < this.snowflakes.length; i++){
      this.snowflakes[i].draw()
      this.snowflakes[i].move()
    }
  }
}