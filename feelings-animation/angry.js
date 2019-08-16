class Fire{
  constructor(x, y, h){
    this.x = x
    this.y = y
    this.h = h 
    this.offset = h * 0.5

    push()
    colorMode(HSB, 200, 200, 200)
    this.color = color(random(12, 18), random(200, 200), random(180, 200))
    pop()
  }

  draw(){
    fill(this.color)
    noStroke()
    triangle(
      this.x - this.offset, 
      this.y, 
      this.x + this.offset, 
      this.y, 
      this.x, 
      this.y - this.h
    )
  }

  flicker() {
    this.h += random(-4, 4)
  }

}

class Angry {
  constructor(num_fires, max_x, max_y, max_h, min_x, min_y, min_h){
    this.max_x = max_x
    this.max_y = max_y
    this.max_h = max_h
    this.min_x = min_x
    this.min_y = min_y
    this.min_h = min_h
    this.num_fires = num_fires
    this.fires = []
    for (let i = 0; i < num_fires; i++){
      let x = map(i, 0, num_fires - 1, this.min_x * 0.98, this.max_x * 0.98)
      let y = random(this.min_y, this.max_y)
      let h = random(this.min_h, this.max_h)
      let fire = new Fire(x, y, h)
      this.fires.push(fire)
    }
    this.w = this.max_x - this.min_x
  }

  draw(){
    for(let i = 0; i < this.num_fires; i++){
      this.fires[i].draw()
      if (Math.random() > 0.5) {
        this.fires[i].flicker()
      }
    }
    push()
    colorMode(HSB, 100, 100, 100)
    fill(0, 80, 90)
    rect(this.min_x, this.max_y, this.w, this.min_y - this.max_y)
    pop()
  }
}