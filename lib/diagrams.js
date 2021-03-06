function youngDiagram(integer_partition, x, y, w, h) {
  // For use with p5.js
  for (let part of integer_partition) {
    for (let i = 0; i < part; i++) {
      text(part, x-10, y)
      rect(x + w*i, y, w, h)
    }
    y += h
  }
}

function youngDiagramColored(integer_partition, x, y, w, h) {
  // For use with p5.js
  for (let part of integer_partition) {
    for (let i = 0; i < part; i++) {
      text(part, x-10, y)
      rect(x + w*i, y, w, h)
    }
    y += h
  }
}