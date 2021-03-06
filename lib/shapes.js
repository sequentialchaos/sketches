class Shape {
  constructor({cx=0, cy=0, cz=0, theta=-PI/2, numPoints=60}) {
    this.center = createVector(cx, cy, cz)
    this.theta = theta
    this.numPoints = numPoints
    this.points = []
    this.vertices = []
  }

  addPoint(x, y, z) {
    this.points.push(createVector(x, y, z))
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

    // // DEBUG HELPER - label and color vertices as a rainbow, red to blue
    // for (let [i, v] of this.vertices.entries()) {
    //   colorMode(HSB)
    //   let h = map(i, 0, this.vertices.length, 0, 255)
    //   fill(h, 255, 255)
    //   circle(v.x, v.y, 20)
    //   stroke(0)
    //   textAlign(CENTER, CENTER)
    //   textSize(20)
    //   text(i, v.x, v.y)
    // }
    // pop()
  }

  drawPoints() {
    for (let p of this.points) {
      point(p.x, p.y)
    }
  }

  trace() {
    let i = 0;
    let p = floor(this.numPoints / this.n)
    while (i < this.n-1) {
      this.addTraceLine(i, i+1, p)
      i++
    }
    this.addTraceLine(i, 0, p)
  }

  traceLine(start, end, precision) {
    // Excludes end point
    let coords = []
    for (let i = 0; i < precision; i++) {
      let x = map(i, 0, precision, start.x, end.x)
      let y = map(i, 0, precision, start.y, end.y)
      let z = map(i, 0, precision, start.z, end.z)
      coords.push(createVector(x, y, z))
    }
    return coords
  }

  addTraceLine(i, j, p) {
    let start = this.vertices[i]
    let end = this.vertices[j]
    let line = this.traceLine(start, end, p)
    this.points = this.points.concat(line)
  }

  morphWith(other, numLoops=1) {
    let len1 = this.points.length,
        len2 = other.points.length,
        maxlen = max(len1, len2);
    let morphedShape = new Shape({cx: this.cx, cy: this.cy, cz: this.cz})
    for (let i = 0; i < maxlen * numLoops; i++) {
      let x = this.points[i % len1].x,
          y = other.points[i % len2].y;
      morphedShape.addPoint(x, y)
    }
    return morphedShape
  }
}

class Circle extends Shape {

  constructor({cx=0, cy=0, cz=0, r=0, C=0, A=0, numPoints=100}) {
    super({cx, cy, cz, numPoints})
    this.calculateValues(r, C, A)
  }

  calculateValues(r, C, A) {

  }
}

class RegularPolygon extends Shape {

  constructor({cx=0, cy=0, cz=0, n=3, s=0, r=0, a=0,
               P=0, A=0, theta=-PI/2, numPoints=60}={}) {
    super({cx, cy, cz})
    this.theta = theta
    this.n = n
    this.numPoints = numPoints
    this.calculateValues(s, r, a, P, A)
    this.addVertices()
    this.trace()
  }

  addVertices() {
    const maxAngle = this.theta + TWO_PI;
    for (let i = 0; i < this.n; i++) {
      let angle = map(i, 0, this.n, this.theta, maxAngle)
      let x = this.center.x + this.r * cos(angle),
          y = this.center.y + this.r * sin(angle);
      this.vertices.push(createVector(x, y))
    }
  }



  calculateValues(s, r, a, P, A) {
    // Determine the side length, radius, apothem, perimeter, and area.
    // (Based on whichever is given)
    if (s) {
      this.s = s
      this.r = this.s / (2 * sin(PI / this.n))
      this.a = (this.s / 2) * atan(PI / this.n)
      this.P = this.s * this.n
      this.A = 0.5 * this.n * this.s * this.a
    } else if (r) {
      this.r = r
      this.s = 2 * this.r * sin(PI / this.n)
      this.a = this.r * cos(PI / this.n)
      this.P = this.s * this.n
      this.A = 0.5 * this.n * this.s * this.a
    } else if (a) {
      this.a = a
      this.r = this.a / cos(PI / this.n)
      this.s = 2 * this.a * tan(PI / this.n)
      this.P = this.s * this.n
      this.A = 0.5 * this.n * this.s * this.a
    } else if (P) {
      this.P = P
      this.s = this.P / this.n
      this.r = this.s / (2 * sin(PI / this.n))
      this.a = (s / 2) * atan(PI / this.n)
      this.A = 0.5 * this.n * this.s * this.a
    } else if (A) {
      this.A = A
      this.s = sqrt(this.A * 4 / (this.n * atan(PI / this.n)))
      this.r = sqrt(this.A * 2 / (this.n * sin(TWO_PI / this.n)))
      this.a = sqrt(this.A / (this.n * tan(PI / this.n)))
      this.P = this.s * this.n
    } else {
      this.s = s
      this.r = r
      this.a = a
      this.P = P
      this.A = A
    }
  }
  // getPoints(precision) {
  // }


}