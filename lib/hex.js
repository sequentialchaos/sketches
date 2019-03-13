
const SQRT3 = Math.sqrt(3)
const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}
const randarr = array => array[randint(0, array.length)]
/////////////////////////////////////////////////////
class Orientation {
  constructor(name, f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    this.name = name
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
  "Pointy",
  SQRT3, SQRT3/2, 0, 3/2,
  SQRT3/3, -1/3, 0, 2/3,
  0.5 
)
const FLAT = new Orientation(
  "Flat",
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

  // set size(size) {
  //   this.size = size
  // }

  // set origin(origin) {
  //   this.origin = origin
  // }

  directionalOffset(direction) {
    let size = this.size
    let angle = 2 * Math.PI * (this.orientation.startAngle + direction) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }
}
/////////////////////////////////////////////////////
class Hex {
  constructor(a=0, b=0, type=0) {
    this.a = a
    this.b = b
    this.c = -(a + b)
    this.type = type
    this.colors = ["#A3A3A3","#E1E1E1","#EC8080","#ECB180","#ECE780","#A4EC80","#80ECB8","#80D3EC","#8082EC","#E680EC","#D48888"]
  }

  directions() {
    return [
      new Hex(1, 0),  // EAST
      new Hex(0, 1),  // NORTHEAST
      new Hex(-1, 1), // NORTHWEST
      new Hex(-1, 0), // WEST
      new Hex(0, -1), // SOUTHWEST
      new Hex(1, -1), // SOUTHEAST
    ];
  }

  neighbor(direction) {
    // 0 == E, 1 == NE, 2 == NW, 3 == W, 4 == SW, 5 == SE.
    let options = this.directions()
    return this.add(options[direction]);
  }

  toPixel(grid) {
    const M = grid.orientation
    let x = (M.f0 * this.a + M.f1 * this.b) * grid.size.x
    let y = (M.f2 * this.a + M.f3 * this.b) * grid.size.y
    return new Point(x + grid.origin.x, y + grid.origin.y);
  }

  fromPixel(grid, point) {
    const M = grid.orientation
    let offset = new Point((point.x - grid.origin.x) / grid.size.x,
                       (point.y - grid.origin.y) / grid.size.y)
    let a = M.b0 * offset.x + M.b1 * offset.y
    let b = M.b2 * offset.x + M.b3 * offset.y
    return new Hex(a, b).round();
  }

  round() {
    let a = Math.round(this.a)
    let b = Math.round(this.b)
    let c = Math.round(this.c)

    let a_diff = Math.abs(a - this.a)
    let b_diff = Math.abs(b - this.b)
    let c_diff = Math.abs(c - this.c)

    if (a_diff > b_diff && a_diff > c_diff) {
      a = -b - c
    } else if (b_diff > c_diff) {
      b = -a - c
    } else {
      c = -a - b
    }
    return new Hex(a, b);
  }

  hexCorners(grid) {
    let corners = []
    let center = this.toPixel(grid)
    for (let i = 0; i < 6; i++) {
      let offset = grid.directionalOffset(i)
      corners.push(new Point(center.x + offset.x, center.y + offset.y))
    }
    return corners;
  }

  svgPath(grid) {
    let path = "M "
    let corners = []
    for (let corner of this.hexCorners(grid)) {
      corners.push(corner.x + " " + corner.y);
    }
    return path + corners.join(" L") + " Z";
  }

  drawOnSVG(svg, grid, options) {
    let path = svg.append("path")
        .attr("d", this.svgPath(grid))
    if (options == null) {
      options = {
        fill: this.colors[this.type],
        "fill-opacity": 0.8,
        stroke: "black",
        "stroke-width": 6,
        class: "hexagon",
        id: "a" + this.a + "b" + this.b,
      }
    }
    for (let attr in options) {
      path.attr(attr, options[attr])
    }
    this.drawCoordsOnSVG(svg, grid)
    return path;
  }

  drawCoordsOnSVG(svg, grid, options) {
    let center = this.toPixel(grid)
    let avgSize = (Math.abs(grid.size.x) + Math.abs(grid.size.y)) * 0.5
    let fontsize = Math.round(avgSize * 0.48)
    let text = svg.append("text")
        .attr("x", center.x)
        .attr("y", center.y + fontsize * 0.32)
      
    text.text(this.a + "," + this.b + "," + this.c)
        .style("text-anchor", "middle")

    
    if (options == null) {
      options = {
        "font-family": "Calibri",
        "font-size": fontsize + "px",
        "font-weight": "bold",
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
      }
    }
    for (let attr in options) {
      text.style(attr, options[attr])
    }
  }

  drawOnCanvas(canvas, grid) {

  }

  isAdjacentTo(that) {
    for (let direction of this.directions()) {
      if (this.add(direction).equals(that)) {
        return true;
      }
    }
    return false;
  }

  equals(that) {
    return (this.a == that.a && this.b == that.b && this.c == that.c);
  }

  add(that) {
    return new Hex(this.a + that.a, this.b + that.b);
  }

  subtract(that) {
    return new Hex(this.a - that.a, this.b - that.b);
  }

  multiply(k) {
    return new Hex(this.a * k, this.b * k);
  }

  length() {
    return Math.round((Math.abs(this.a) + Math.abs(this.b) + Math.abs(this.c)) / 2);
  }

  distance(that) {
    return (this.subtract(that)).length();
  }
}

class Layout {
  constructor(grid, from=null) {
    this.grid = grid
    this.numHexes = 0
    this.hexList = []
    this.hexMap = {}
    if (from != null) {
      this.load(from)
    }
  }

  drawOnSVG() {
    svg.selectAll("path").remove()
    svg.selectAll("text").remove()
    for (let hex of this.hexList) {
      hex.drawOnSVG(svg, this.grid)
    }
  }

  drawOnCanvas() {
    for (let hex of this.hexList) {
      hex.drawOnCanvas(canvas, this.grid)
    }
  }

  add(hex) {
    if (!this.contains(hex)) {
      this.hexList.push(hex)
      if (this.hexMap[hex.a] == null) {
        this.hexMap[hex.a] = {}
      }
      if (this.hexMap[hex.a][hex.b] == null) {
        this.hexMap[hex.a][hex.b] = {
          hex: hex,
          index: this.numHexes,
          type: 0,
          neighbors: {}
        }
      } 
      this.numHexes += 1
      this.addAllNeighbors(hex)
    }
  }

  addNew(a, b) {
    this.add(new Hex(a, b))
  }

  remove(hex) {
    if (!this.contains(hex)) {
      return this;
    } else {
      let hexToRemove = this.hexMap[hex.a][hex.b]
      let index = hexToRemove.index

      // remove this hex from each of its neighbors' adjacency lists
      let neighborDirections = Object.keys(hexToRemove.neighbors)
      for (let direction of neighborDirections) {
        let neighbor = hexToRemove.neighbors[direction]
        let neighborDirection = (+direction + 3) % 6
        delete this.hexMap[neighbor.a][neighbor.b].neighbors[neighborDirection]
      }

      // remove this hex from the hexMap and hexList
      delete this.hexMap[hex.a][hex.b]
      this.hexList.splice(index, 1)

      // decrement index of hexes in front of the removed hex.
      for (let i = index; i < this.hexList.length; i++) {
        let hex = this.hexList[i]
        this.hexMap[hex.a][hex.b].index -= 1
      }
      this.numHexes -= 1
    }
    return this;
  }

  addRandomNeighbors(amount) {

  }

  randomHex() {
    let index = Math.floor(Math.random(this.numHexes))
    return this.hexList[index]
  }

  randomNeighbor(hex) {
    let neighbors = this.neighbors(hex)
    let index = Math.floor(Math.random(neighbors.length))
    return neighbors[index]
  }

  removeByCoords(a, b) {
    let hex = new Hex(a, b)
    this.remove(hex)
  }

  neighbors(hex) {
    return Object.values(this.hexMap[hex.a][hex.b].neighbors)
  }

  border() {

  }

  clear() {
    this.hexList = []
    this.hexMap = {}
    this.numHexes = 0
    return this;
  }

  surroundHex(hex) {
    for (let i = 0; i < 6; i++) {
      let neighbor = hex.neighbor(i)
      this.add(neighbor)
    }
    return this;
  }

  surroundHexAt(a, b) {
    let hex = new Hex(a, b)
    this.surroundHex(hex)
  }

  surroundAll(times=1) {
    for (let time = 0; time < times; time++) {
      let hexes = [...this.hexList]
      for (let hex of hexes) {
        this.surroundHex(hex)
      }
    }
    return this;
  }

  surroundingHexes() {

  }

  contains(hex) {
    if (this.hexMap[hex.a] != null) {
      if (this.hexMap[hex.a][hex.b] != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getSegment(hex, direction) {
    let segment = [hex]
    let directions = hex.directions()

    let direction1 = directions[direction]
    let neighbor1 = hex.add(direction1)
    while(this.contains(neighbor1)) {
      segment.push(neighbor1)
      neighbor1 = neighbor1.add(direction1)
    }

    let direction2 = directions[(direction + 3) % 6]
    let neighbor2 = hex.add(direction2)
    while(this.contains(neighbor2)) {
      segment.push(neighbor2)
      neighbor2 = neighbor2.add(direction2)
    }
    return segment;
  }

  makeNeighbors(hex, i) {
    let directions = hex.directions()
    let direction = directions[i]
    let neighbor = hex.add(direction)

    if (this.contains(neighbor)) {
      this.hexMap[hex.a][hex.b].neighbors[i] = neighbor
      this.hexMap[neighbor.a][neighbor.b].neighbors[(i+3) % 6] = hex
    }
    return this;
  }

  addAllNeighbors(hex) {
    for (let i = 0; i < 6; i++) {
      this.makeNeighbors(hex, i)
    }
  }

  regularHex(n) {
    this.clear()
    this.addNew(0, 0)
    this.surroundAll(n-1)
  }



  min(dimension) {
    switch (dimension) {
      case 'a': return Math.min(...this.hexList.map(h => h.a))
      case 'b': return Math.min(...this.hexList.map(h => h.b))
      case 'c': return Math.min(...this.hexList.map(h => h.c))
    }
  }

  max(dimension) {
    switch (dimension) {
      case 'a': return Math.max(...this.hexList.map(h => h.a))
      case 'b': return Math.max(...this.hexList.map(h => h.b))
      case 'c': return Math.max(...this.hexList.map(h => h.c))
    }
  }

  range(dimension) {
    return [this.min(dimension), this.max(dimension)]
  }

  name() {
    let n = this.numHexes,
        a = this.range('a').join(','),
        b = this.range('b').join(','),
        c = this.range('c').join(',');
    return `${n} ${a} ${b} ${c}`
  }

  toString() {
    let coordinates = this.hexList.map(hex => [hex.a, hex.b])
    return coordinates.join("\n")
  }

  load(string) {
    let lines = string.split("\n")
    for (let line of lines) {
      let coordinates = line.split(",")
      let a = Number(coordinates[0])
      let b = Number(coordinates[1])
      this.addNew(a, b)
    }
  }

  save() {
    let blob = new Blob([this.toString()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, this.name() + ".txt");
  }
}

class Shape extends Layout {
  constructor(grid) {
    super(grid)
  }
}

class Puzzle extends Layout {
  constructor(grid, numTypes, from=null) {
    super(grid)
    this.numTypes = numTypes
    this.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (from != null) {
      this.load(from)
    }
  }

  // add(hex) {
  //   if (!this.contains(hex)) {
  //     this.hexList.push(hex)
  //     if (this.hexMap[hex.a] == null) {
  //       this.hexMap[hex.a] = {}
  //     }
  //     if (this.hexMap[hex.a][hex.b] == null) {
  //       this.hexMap[hex.a][hex.b] = {
  //         hex: hex,
  //         index: this.numHexes,
  //         // type: hex.type,
  //         neighbors: {}
  //       }
  //     } 
  //     this.numHexes += 1
  //     this.addAllNeighbors(hex)
  //   }
  // }

  addNew(a, b, type=0) {
    this.add(new Hex(a, b, type))
  }

  toString() {
    let row = this.hexList.map(hex => [hex.a, hex.b, hex.type])
    return row.join("\n")
  }

  load(string) {
    let lines = string.split("\n")
    for (let line of lines) {
      let row = line.split(",")
      let a = +row[0]
      let b = +row[1]
      let type = +row[2]
      this.addNew(a, b, type)
      console.log(a, b, type)
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