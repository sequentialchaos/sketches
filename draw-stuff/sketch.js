let r = 50;

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  noLoop()
  background(30)
  // translate(width/2, height/2)
  let s = new RegularPolygon({cx:width/2, cy:height/2, n:20, s:40})
  stroke(220)
  strokeWeight(4)
  s.draw()
}

function draw() {
  // translate(width/2, height/2)

  // stroke(220)

  // push()
  // translate(r, 0)
  // point(frameCount, r*cos(frameCount))
  // pop()
  
  // push()
  // translate(0, r)
  // point(r*sin(frameCount), frameCount)
  // pop()

  // push()
  // translate((width + r) / 2, (height + r) / 2)
  // point(400*cos(frameCount), 400*sin(frameCount))
  // pop()


}

class Shape {
  constructor({cx, cy, cz=0, theta=0}) {
    this.center = createVector(cx, cy, cz)
    this.theta = theta
    this.points = []
    this.vertices = []
  }

  draw(nofill=true) {
    push()
    if (nofill) {
      noFill()
    }
    beginShape()
    for (let v of this.vertices) {
      vertex(v.x, v.y)      
    }
    endShape(CLOSE)

    // DEBUG HELPER - color vertices as a rainbow, red to blue
    for (let [i, v] of this.vertices.entries()) {
      colorMode(HSB)
      let h = map(i, 0, this.vertices.length, 0, 255)
      print(h)
      fill(h, 255, 255)
      circle(v.x, v.y, 10)
    }

    pop()
  }
}

class RegularPolygon extends Shape {

  constructor({cx=0, cy=0, cz=0, n=3, s=0, r=0, a=0, theta=-PI/2}={}) {
    super({cx, cy, cz})
    this.theta = theta
    this.n = n
    this.calculateLengths(s, r, a)
    this.getVertices()
    console.log(this.center, this.n, this.s, this.r, this.a, this.theta)
  }

  getVertices() {
    const maxAngle = this.theta + TWO_PI,
          phi = TWO_PI / this.n;
    for (let angle = this.theta; angle < maxAngle; angle += phi) {
      let x = this.center.x + this.r * cos(angle),
          y = this.center.y + this.r * sin(angle);
      this.vertices.push(createVector(x, y))
    }
  }

  calculateLengths(s, r, a) {
    // Determine the side length, radius, and apothem based on what is given.
    if (s) {
      this.s = s
      this.r = s / (2 * sin(PI / this.n))
      this.a = (s / 2) * atan(PI / this.n)
    } else if (r) {
      this.r = r
      this.s = 2 * r * sin(PI / this.n)
      this.a = r * cos(PI / this.n)
    } else if (a) {
      this.a = a
      this.r = a / cos(PI / this.n)
      this.s = 2 * a * tan(PI / this.n)
    } else {
      this.s = s
      this.r = r
      this.a = a
    }
  }
  // getPoints(precision) {
  // }


}