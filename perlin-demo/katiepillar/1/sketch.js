
let t = 0
let dt = 0.014
let offset = 100000
let num_segments = 10
let trail_time = 0.053

function setup() {
  length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  frameRate(30)
  noCursor()

  stroke(50)
  
  wait_seconds = 3

  player = new Player(width * 0.5, height * 0.8, 20)
  ghosterpillar = new Caterpillar({num_segments: 12, d: width * 0.28, w: width * 1.2, h: height * 1.2, trail_time: 0.28, fillColor: 'white'})
  katiepillar = new Caterpillar({num_segments: 7, t: 120398, dt: 0.019, d: width * 0.09, w: width * 1.4, h: height * 1.4, trail_time: 0.1, type: 'goal', name: 'Katie'})
  ghosterpillar.move()
  katiepillar.move()
}

function draw() {
  background(20)

  fill(100)

  player.move(mouseX, mouseY)
  player.draw()

  ghosterpillar.move()
  ghosterpillar.draw()
  katiepillar.move()
  katiepillar.draw()

  if (millis() > wait_seconds * 1000) {
    if (player.isCollidingWithFirstSegment(katiepillar)) {
      // print('nom nom nom')
      if (katiepillar.num_segments == 1) {
        push()
        ghosterpillar.draw(switch_faces=true)
        katiepillar.draw(switch_faces=true)
        fill('white')
        stroke('black')
        strokeWeight(4)
        textSize(map(width, 300, 2000, 20, 100))
        textAlign(CENTER, CENTER)
        text('VICTORY :D', width/2, height/2)
        noLoop()
        pop()
      }
      katiepillar.pop()
    }
  
    if (player.isCollidingWithCaterpillar(ghosterpillar)) {
      push()
      // print('oh noooo')
      fill('white')
      textSize(map(width, 300, 2000, 20, 100))
      stroke('black')
      textAlign(CENTER, CENTER)
      text('GHOSTERPILLAR CAUGHT YOU :O', width/2, height/2)
      pop()
      noLoop()
    }
  } else {
    push()
    fill('white')
    stroke('black')
    strokeWeight(4)
    textSize(map(width, 300, 2000, 20, 60))
    textAlign(CENTER, CENTER)
    // text('YOU ARE A GREEN PELLET. MOVE YOUR MOUSE TO FIND YOURSELF!', width, height/2)
    // text('MOVE YOUR MOUSE TO FIND YOURSELF!', width/2, height * 0.6)
    // text('AVOID THE WHITE GHOSTERPILLAR AT ALL COST!', width/2, height * 0.7)

    text('D: SAVE KATIE FROM GHOSTERPILLAR!', width/2, height/2)
    textSize(map(width, 300, 2000, 30, 80))

    text(wait_seconds - int(millis() / 1000), width/2, height * 0.6)
    pop()
  }

  t += dt
}




class Caterpillar {
  constructor({d=width * 0.05, w=width, h=height, t=0, dt=0.014, trail_time=0.053, offset=100000, num_segments=7, fillColor='rainbow', type='chaser', name=''} = {}) {
    this.d = d
    this.w = w
    this.h = h
    this.t = t
    this.dt = dt
    this.trail_time = trail_time
    this.offset = offset
    this.num_segments = num_segments
    this.fillColor = fillColor
    this.type = type
    this.name = name
  }

  pop() {
    this.num_segments--
  }

  move() {
    this.segments = []
    for (let i = 0; i < this.num_segments; i++) {
      noise()
      let x = noise(this.t + this.trail_time * i) * this.w - 100
      let y = noise(this.t + this.trail_time * i + this.offset) * this.h - 100
      this.segments.push([x,y])
    }
    this.t += this.dt
  }

  draw(switch_faces=false) {
    if (this.num_segments < 1) {
      return
    }
    push()
    colorMode(HSB, 100, 100, 100)
    for (let [i, segment] of this.segments.entries()) {
      if (this.fillColor == 'white' || this.fillColor == 'black') {
        fill(this.fillColor)
      } else if (this.fillColor != 'rainbow') {
        
      } else {
        fill(90 - map(i, 0, this.num_segments, 0, 100), 70, 90)
      }
      circle(segment[0], segment[1], this.d)

      if (i == this.num_segments - 1) {
        if (this.type == 'goal') {
          if (switch_faces) {
            this.drawFaces(segment[0], segment[1], this.d, 0.7, 'smile')
          } else {
            this.drawFaces(segment[0], segment[1], this.d, 0.7, 'frown')       
          }
        } else if (this.type == 'chaser') {
          if (switch_faces) {
            this.drawFaces(segment[0], segment[1], this.d, 0.7, 'frown')
          } else {
            this.drawFaces(segment[0], segment[1], this.d, 0.7, 'smile')       
          }   
        }
      }



    }
    pop()
  }

  drawFaces(x, y, d, mouth_ratio, type) {
    push()
    if (type == 'smile') {
      // eyes
      noStroke()
      fill('white')
      circle(x - d * 0.3, y - d * 0.2, d * 0.2)
      circle(x + d * 0.3, y - d * 0.2, d * 0.2)
      fill('black')
      circle(x - d * 0.3, y - d * 0.2, d * 0.1)
      circle(x + d * 0.3, y - d * 0.2, d * 0.1)
  
      // mouth
      fill('black')
      arc(x, y + d * 0.22, d * mouth_ratio, d * mouth_ratio, 0, PI)
  
    } else if (type == 'frown') {
      // eyes
      noStroke()
      fill('white')
      circle(x - d * 0.3, y - d * 0.22, d * 0.2)
      circle(x + d * 0.3, y - d * 0.22, d * 0.2)
      fill('black')
      circle(x - d * 0.3, y - d * 0.2, d * 0.1)
      circle(x + d * 0.3, y - d * 0.2, d * 0.1)
  
      // mouth
      fill('black')
      arc(x, y + d * 0.44, d * mouth_ratio, d * mouth_ratio, PI, TWO_PI)
    }
    textSize(map(d, 0, 200, 16, 26))
    textAlign(CENTER, CENTER)
    text(this.name, x, y - d * 0.6)
    pop()
  }
}





class Player {
  constructor(x, y, d) {
    this.x = x
    this.y = y
    this.d = d
  }

  move(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    push()
    fill('lightgreen')
    circle(this.x, this.y, this.d)
    pop()
  }

  isCollidingWithCaterpillar(caterpillar) {
    let d0 = this.d,
        d1 = caterpillar.d;
    for (let [i, segment] of caterpillar.segments.entries()) {
      let x0 = this.x,
          y0 = this.y,
          x1 = segment[0],
          y1 = segment[1];
      let d_squared = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0),
          d_collision = d0 * d0  + 2 * d0 * d1 + d1 * d1
      if (d_squared <= d_collision) {
        // print(`segment #${i+1} of the caterpillar is on you!`)
        return true
      }
    }
    return false
  }

  isCollidingWithFirstSegment(caterpillar) {
    let d0 = this.d,
        d1 = caterpillar.d;
    let segment = caterpillar.segments[caterpillar.num_segments-1]
    let x0 = this.x,
        y0 = this.y,
        x1 = segment[0],
        y1 = segment[1];
    let d_squared = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0),
        d_collision = d0 * d0  + 2 * d0 * d1 + d1 * d1
    if (d_squared <= d_collision) {
      // print(`segment #${i+1} of the caterpillar is on you!`)

      return true
    }
    return false
  }


  isCollidingWithGoal(goal) {
    let d0 = this.d,
        d1 = goal.d;
    for (let [i, segment] of goal.segments.entries()) {
      let x0 = this.x,
          y0 = this.y;
          x1 = segment[0],
          y1 = segment[1];
      let d_squared = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0),
          d_collision = d0 * d0  + 2 * d0 * d1 + d1 * d1
      if (d_squared <= d_collision) {
        return true
      }
    }
    return false
  }

}


class Goal {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

}

// symmetric noise
/// butterfly
/// globe

// plotting noise
///