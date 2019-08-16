function setup() {
  length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  // noLoop()
  frameRate(15)

  background(0)
  noStroke()

  num_points = 40
  points = createRowsOfPoints(num_points, 9)
  colors = createColors(num_points * num_points)
}

function draw() {
  // for (let p of points) {
  //   stroke(255)
  //   strokeWeight(4)
  //   point(p[0], p[1])
  // }
  // for (let i = 0; i < halfedges.length; i += 3) {
  //   fill(random(255))
  //   beginShape()
  //   vertex(halfedges[i], halfedges[i+1])
  //   vertex(halfedges[i+1], halfedges[i+2])
  //   vertex(halfedges[i+2], halfedges[i])
  //   endShape()
  // }  
  // for (let i = 0; i < triangles.length; i += 6) {
  //   fill(random(255))
  //   beginShape()
  //   for (let j = i; j < i+3; j++) {
  //     print(triangles[j], triangles[j+3])
  //     vertex(triangles[j], triangles[j+3])
  //   }
  //   endShape()
  // }
  background(0)

  delauney = Delaunator.from(points)
  halfedges = delauney.halfedges
  triangles = delauney.triangles

  triangle_coords = []
  for (let i = 0; i < triangles.length; i += 3) {
    triangle_coords.push([
        points[triangles[i]],
        points[triangles[i + 1]],
        points[triangles[i + 2]]
    ]);
  }

  for (let i = 0; i < triangle_coords.length; i++) {
    coords = triangle_coords[i]
    fillTriangle(coords, colors[i])
  }

  movePoints(points, frameCount / 1000)
}

function fillTriangle(coords, color) {
  fill(color)
  beginShape()
  for (let j = 0; j < coords.length; j++) {
    vertex(coords[j][0], coords[j][1])
  }
  endShape()
}

function createPoints(N) {
  points = []
  for (let i = 0; i < N; i++) {
    points.push([0, 0])
    points.push([0, height])
    points.push([width, 0])
    points.push([width, height])
    points.push([random(width), random(height)])
  }
  return points
}

function createRowsOfPoints(N, num_rows) {
  points = []
  num_cols = N / num_rows
  print(num_cols)

  for (let i = 0; i < num_rows; i++) {
    y = map(i, 0, num_rows, 0, width)
    for (let j = 0; j < num_cols; j++) {
      x = Math.random() * width
      points.push([x, y])
    }
  }
  return points
}

function movePoints(points, t) {
  for (let i = 0; i < points.length; i++) {
    points[i][0] += (noise(t) - 0.5) * 3
    points[i][1] += (noise(t + 500) - 0.5) * 3
  }
}

function createColors(N) {
  colors = []
  for (let i = 0; i < N; i++) {
    colors.push(random(255))
  }
  return colors
}