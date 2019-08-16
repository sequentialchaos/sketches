function setup() {
  createCanvas(innerWidth, innerHeight)
  // noLoop()
  frameRate(10)
  length = min(width, height)
  towers = []
  num_towers = map(length, 0, 2000, 10, 500)
  for (let i = 0; i < num_towers; i++) {

    tower_length = random(length * 0.1)
    x = random(width - tower_length)
    y = random(height - tower_length)
    new_tower = new Tower(x, y, tower_length, 0.8)
    towers.push(new_tower)
  }
  direction = []
  for (let i = 0; i < num_towers; i++) {
    direction.push(1)
  }
}

function draw() {
  background(0)
  for (let i = 0; i < towers.length; i++) {
    towers[i].draw()
    if (Math.random() < 0.1) {
      if (direction[i] == 1) {
        towers[i].addFloor()
      } else {
        towers[i].removeFloor()
      }
    }
    num_floors = towers[i].floors.length
    if (num_floors > 10 && direction[i] == 1) {
      direction[i] = -1
    } else if (num_floors <= 1 && direction[i] == -1) {
      direction[i] = 1
    }
  }
}

function mousePressed() {
  redraw()
}

class Tower {
  constructor(x, y, base_length, inner_ratio) {
    this.x = x
    this.y = y
    this.base = new Floor(x, y, base_length)
    this.current_length = base_length
    this.floors = [this.base]
    this.inner_ratio = inner_ratio
    this.current_index = 0
  }
  draw() {
    for (let i = 0; i < this.floors.length; i++) {
      push()
      colorMode(HSB)
      let fill_color = map(i, 0, this.floors.length-1, 80, 175)
      this.floors[i].draw(fill_color)
      pop()
    }
  }
  addFloor() {
    let new_length = this.current_length * this.inner_ratio
    let displacement = (this.current_length - new_length) / 2
    let new_x = this.floors[this.current_index].x + displacement
    let new_y = this.floors[this.current_index].y  + displacement
    let new_floor = new Floor(new_x, new_y, new_length)
    this.floors.push(new_floor)
    this.current_length = new_length
    this.current_index++
  }
  removeFloor() {
    let old_floor = this.floors.pop()
    this.current_length = old_floor.side_length
    this.current_index--
  }
}

class Floor {
  constructor(x, y, side_length) {
    this.x = x
    this.y = y
    this.side_length = side_length
  }

  draw(color) {
    push()
    fill(color)
    noStroke()
    rect(this.x, this.y, this.side_length, this.side_length)
    pop()
  }
}