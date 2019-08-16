let i = 0, p, n;
const padding = 60

function setup() {
  const length = min(innerWidth, innerHeight)
  createCanvas(length, length).center('horizontal')
  frameRate(1)

  n = 30
  p = new integerPartitions(n).mParts(5)
  
}

function draw() {
  background(30)
  fill(30)
  stroke(220)
  strokeWeight(6)
  let w = (width - padding * 2) / n,
      h = (height - padding * 2) / n;
  youngDiagram(p[i], padding, padding, w, h)


  // Title and Labels
  fill(220)
  strokeWeight(2)
  textSize(map(width, 250, 2000, 35, 70))
  textAlign(CENTER, CENTER)
  text('Integer Partitions of ' + n, width * 0.70, height * 0.28)
  strokeWeight(1)
  
  textSize(map(width, 250, 2000, 20, 60))
  text(i+1 + '/' + p.length, width - 100, height - 50)
  

  i++

  if (i >= p.length) {
    i = 0
  }
}
