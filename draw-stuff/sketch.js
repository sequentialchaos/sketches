function setup() {
  createCanvas(innerWidth, innerHeight)

  noLoop()

  num_rows = 0
  num_cols = 0

  grid_calculations = calculateGrid(width, height)
  grid = makeGrid(...Object.values(grid_calculations))
}

function draw() {
  background(0)

}

function calculateGrid(w, h) {
  let l = max(w, h)
  let num_rows, num_columns
  if (l == w) {
    num_columns = l
    num_rows = h / num_columns
  } else {
    num_rows = l
    num_columns = h / num_rows
  }
  let cell_width = w / num_columns
  let cell_height = h / num_rows
  return {
    cell_width: cell_width,
    cell_height: cell_height,
    num_rows: num_rows,
    num_columns: num_columns
  }
}

function makeGrid(cell_width, cell_height, num_rows, num_columns) {
  let grid = []

}