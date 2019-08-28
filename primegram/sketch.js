function setup() {
  min_length = min(innerWidth, innerHeight);
  createCanvas(min_length, min_length, P2D).center("horizontal");

  looping = true;
  frameRate(6);

  N = 10;
  primes = prime_sieve(N);
  num_rows = int(primes.length ** 0.5);
  cell_size = height / num_rows;
  mod = primes[num_rows];
  grid = primes.map(p => p % mod);

  colorMode(HSB, mod, mod, mod);
  noStroke();
}

function draw() {
  background(0);
  for (let i = 0; i < grid.length; i++) {
    x = int(i / num_rows) * cell_size;
    y = (i % num_rows) * cell_size;
    g = grid[i];
    fill(g, mod * 0.9, mod * 0.9);
    rect(x, y, cell_size, cell_size);
  }
  N += 100;
  if (N > 100000) {
    noLoop();
  }
  recalculate();
}

function recalculate() {
  primes = prime_sieve(N);
  num_rows = int(primes.length ** 0.5);
  cell_size = height / num_rows;
  mod = primes[num_rows];
  grid = primes.map(p => p % mod);

  colorMode(HSB, mod, mod, mod);
}

function prime_sieve(N) {
  // Returns all prime numbers <= N.
  let is_prime = [];
  for (let i = 0; i <= N; i++) {
    is_prime[i] = true;
  }
  for (let n = 2; n < N ** 0.5 - 1; n++) {
    if (is_prime[n]) {
      for (let m = 2 * n; m <= N; m += n) {
        is_prime[m] = false;
      }
    }
  }
  let primes = [];
  for (let n = 2; n <= N; n++) {
    if (is_prime[n]) {
      primes.push(n);
    }
  }
  return primes;
}

function mousePressed() {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
}
