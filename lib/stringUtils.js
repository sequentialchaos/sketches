String.prototype.count = function(s) {
  let c = 0
  for (let i = 0; i < this.length - s.length + 1; i++) {
    if (this.substring(i, i + s.length) == s) {
      c++
    }
  }
  return c
}