
const SQRT3 = Math.sqrt(3)

/////////////////////////////////////////////////////
class Orientation {
  constructor(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    this.f0 = f0
    this.f1 = f1
    this.f2 = f2
    this.f3 = f3
    this.b0 = b0
    this.b1 = b1
    this.b2 = b2
    this.b3 = b3
    this.startAngle = startAngle
  }
}
const POINTY = new Orientation(
  SQRT3, SQRT3/2, 0, 3/2,
  SQRT3/3, -1/3, 0, 2/3,
  0.5 
)
const FLAT = new Orientation(
  3/2, 0, SQRT3/2, SQRT3,
  2/3, 0, -1/3, 2/3,
  0.5 
)
/////////////////////////////////////////////////////
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
/////////////////////////////////////////////////////
class Grid {
  constructor(orientation, size, origin) {
    this.orientation = orientation
    this.size = size
    this.origin = origin
  }
  directionalOffset(direction) {
    let size = this.size
    let angle = 2 * Math.PI * (this.orientation.startAngle + direction) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
  }
}
/////////////////////////////////////////////////////
class Hex {
  constructor(a, b) {
    this.a = a
    this.b = b
    this.c = -(a + b)
    if (this.c == -0) this.c = 0
    this.currentNeighbors = {}
  }

  directions() {
    return [
      new Hex(1, 0),  // EAST
      new Hex(1, -1), // NORTHEAST
      new Hex(0, -1), // NORTHWEST
      new Hex(-1, 0), // WEST
      new Hex(-1, 1), // SOUTHWEST
      new Hex(0, 1)   // SOUTHEAST
    ]
  }

  neighbor(direction) {
    // 0 == E, 1 == NE, 2 == NW, 3 == W, 4 == SW, 5 == SE.
    let options = this.directions()
    return this.add(options[direction])
  }

  toPixel(grid) {
    const M = grid.orientation
    let x = (M.f0 * this.a + M.f1 * this.b) * grid.size.x
    let y = (M.f2 * this.a + M.f3 * this.b) * grid.size.y
    return new Point(x + grid.origin.x, y + grid.origin.y)
  }

  hexCorners(grid) {
    let corners = []
    let center = this.toPixel(grid)
    for (let i = 0; i < 6; i++) {
      let offset = grid.directionalOffset(i)
      corners.push(new Point(center.x + offset.x, center.y + offset.y))
    }
    return corners
  }

  svgPath(grid) {
    let path = "M ";
    let corners = []
    for (let corner of this.hexCorners(grid)) {
      corners.push(corner.x + " " + corner.y);
    }
    return path + corners.join(" L") + " Z"
  }

  draw(svg, grid, options) {
    let path = svg.append("path")
        .attr("d", this.svgPath(grid))
    for (let attr in options) {
      svg.attr(attr, options[attr])
    }
    return path
  }

  equals(that) {
    return (this.a == that.a && this.b == that.b && this.c == that.c)
  }

  add(that) {
    return new Hex(this.a + that.a, this.b + that.b)
  }

  subtract(that) {
    return new Hex(this.a - that.a, this.b - that.b)
  }

  multiply(k) {
    return new Hex(this.a * k, this.b * k)
  }

  length() {
    return Math.round((Math.abs(this.a) + Math.abs(this.b) + Math.abs(this.c)) / 2)
  }

  distance(that) {
    return (this.subtract(that)).length()
  }
}

class Layout {
  constructor(grid) {
    this.grid = grid
    this.hexes = []
    this.blocks = []
  }

  addHex(a, b) {
    this.hexes.push(new Hex(a, b))
  }

  addBlock(a, b) {
    this.hexes.push(new Hex(a, b))
  }

  surround(a, b) {
    let hex = new Hex(a, b)
    for (let direction of hex.directions()) {
      let neighbor = hex.neighbor(direction)
      if (!this.contains(neighbor)) {
        this.addHex(neighbor)
      }
      if (this.containsBlock(neighbor)) {

      }
    }
  }

  contains(hex) {
    for (let h of this.hexes) {
      if (h.equals(hex)) {
        return true
      }
    }
  }

  containsBlock(hex) {
    for (let b of this.blocks) {
      if (b.equals(hex)) {
        return true
      }
    }
  }



}


// let hex1 = new Hex(-2, -6)
// let hex2 = new Hex(-2, -6)
// let hex3 = new Hex(0, 0)
// console.log(hex1)
// console.log(hex2)
// console.log(hex3)
// console.log(hex1.length())
// console.log(hex1.equals(hex2))
// console.log(hex1.equals(hex3))
// console.log(hex1.distance(hex3))
// console.log(hex1.subtract(hex2))
// console.log(hex1.subtract(hex3))

// let size = new Point(30, 30)
// let origin = new Point(0, 0)
// let grid = new Grid(POINTY, size, origin)
// console.log(grid)
// console.log(hex3.neighbor(1).toPixel(grid))