/*
   Algorithm H
    from "The Art of Computer Programming 
          VOLUME 4A: Combinatorial Algorithms, Part 1" 
    by Donald Knuth,
    pages 416 & 417.

   - Generates all set partitions of {1, 2,..., n}
     lexicographic order.
*/

/*
  - Converts a restricted growth string *r* into its
    *set* partition equivalent. 
  *- Preconditions:
    (1) r.length == set.length
    (2) r.max < set.length
  *- Postcondition:
    --- Return the set partition.
*/

/*
  Converts a partition into a string representation using 
  vertical bars to separate the elements into their blocks. 
  Look at the following partitions of {1, 2, 3, 4} as examples:

       Partition             String Representation
    a) {{1}, {2, 3}, {4}}    1|23|4
    b) {{1, 2}, {3, 4}}      12|34
    c) {{1, 3, 4}, {2}}      134|2
    d) {{1}, {2}, {3}, {4}}  1|2|3|4

*/

class setPartition {
  constructor(set) {
    if (!isNaN(set)) {
      this.isNumber = true;
      this.set = [];
      for (let i = 1; i <= set; i++) {
        this.set.push(i);
      }
    } else {
      this.isNumber = false;
      this.set = set;
    }
    this.self = [];
    this.string = [];
  }
}

class setPartitions {
  constructor(set) {
    if (!isNaN(set)) {
      this.isNumber = true;
      this.set = [];
      for (let i = 1; i <= set; i++) {
        this.set.push(i);
      }
    } else {
      this.isNumber = false;
      this.set = set;
    }
    this.n = this.set.length;
    this.partitions = [];
  }
}

setPartitions.prototype.stringGenerator = function*() {
  // H1
  let n = this.n;
  let p; // set partition, p.
  if (this.isNumber) {
    p = new setPartition(this.n);
  } else {
    p = new setPartition(this.set);
  }
  let a = p.string; // Restricted growth string, a.
  let b = []; // Auxiliary array, b.
  let set = []; // The set {1, 2,..., n}.
  for (let i = 0; i < n; i++) {
    a.push(0);
    set.push(i + 1);
    if (i < n - 1) b.push(1);
  }

  let m = 1; // Value of b[n], m.
  while (true) {
    // H2
    yield p; //restrictedGrowthStringToPartition(a, set);
    if (a[n - 1] == m) {
      // H4
      let j = n - 2;
      while (a[j] == b[j]) j -= 1;

      // H5
      if (j == 0) return;
      else a[j] += 1;

      // H6
      m = b[j] + (a[j] == b[j]);
      j += 1;
      while (j < n - 1) {
        a[j] = 0;
        b[j] = m;
        j += 1;
      }
      a[n - 1] = 0;
      continue;
    }

    // H3
    a[n - 1] += 1;
  }
};

setPartitions.prototype.generator = function*() {
  for (let string of this.stringGenerator()) {
    yield string.toPartition();
  }
};

setPartition.prototype.toPartition = function() {
  if (this.set.length == 1) return this.set;

  // Initialize the partition.
  let partition = [];

  // Create and fill the partition's blocks.
  let current = 0;
  this.string.forEach((block, i) => {
    if (current == block) {
      // Create block
      partition.push([]);
      current += 1;
    }
    // Fill block
    partition[block].push(this.set[i]);
  });
  this.self = partition;
  return partition;
};

setPartitions.prototype.all = function() {
  this.partitions = [];
  for (let partition of this.generator()) {
    this.partitions.push(partition);
  }
  return this.partitions;
};

setPartition.prototype.toString = function(partition) {
  let string = [];
  partition.forEach((block, i) => {
    block.forEach(element => {
      if (this.isNumber) {
        if (element >= 10) {
          string.push("ABCDEFGHIJKLMN"[element % 10]);
        } else {
          string.push(element);
        }
      } else {
        string.push(element);
      }
    });
    if (i < partition.length - 1) string.push("|");
  });
  return string.join("");
};
// let p = new setPartitions(3).all()
// // let p = new setPartitions(['Winston', 'Will', 'Webb']).all()
// let string = new setPartitions(1).toString(p[0])
// console.log(string)
// for (let partition of p) {
//   console.log(partition.toString())
// }
// console.log(p)

/////  INTEGER PARTITIONS  /////

class integerPartitions {
  constructor(n) {
    this.n = n;
    this.partitions = [];
  }
}

/*
   Algorithm P
    from "The Art of Computer Programming 
          VOLUME 4A: Combinatorial Algorithms, Part 1" 
    by Donald Knuth,
    page 392.

   - Returns an array of all integer partitions of n
     in reverse lexicographic order.
*/
integerPartitions.prototype.all = function() {
  // P1 - Initialize.
  this.partitions = [];
  let n = this.n;
  let a = [0];
  for (let i = 1; i <= n; i++) {
    a.push(1);
  }
  let m = 1;

  while (true) {
    // P2 - Store the final part.
    a[m] = n;
    let q = m - (n == 1);

    // P3 - Visit.
    while (true) {
      let partition = a.slice(1, m + 1);
      // console.log(partition)
      this.partitions.push(partition);

      if (a[q] != 2) {
        // P5 - Decrease a[q]
        if (q == 0) {
          return this.partitions;
        }
        let x = a[q] - 1;
        a[q] = x;
        n = m - q + 1;
        m = q + 1;

        // P6 - Copy x if necessary.
        while (n > x) {
          a[m] = x;
          m = m + 1;
          n = n - x;
        }
        break;
      }
      // P4 - Change 2 to 1+1.
      a[q] = 1;
      q = q - 1;
      m = m + 1;
    }
  }
};

/*
   Algorithm H
    from "The Art of Computer Programming 
          VOLUME 4A: Combinatorial Algorithms, Part 1" 
    by Donald Knuth,
    page 392.

   - Returns an array of all integer partitions of n
     into m parts
*/
integerPartitions.prototype.mParts = function(m) {
  let n = this.n;
  if (m == 1) {
    return [[n]];
  }
  // H1 - Initialize.
  this.partitions = [];
  let a = [0, n - m + 1];
  for (let j = 2; j <= m; j++) {
    a.push(1);
  }
  a.push(-1);

  while (true) {
    // H2 - Visit.
    let partition = a.slice(1, m + 1);
    this.partitions.push(partition);

    if (a[2] >= a[1] - 1) {
      // H4 - Find j.
      let j = 3;
      let s = a[1] + a[2] - 1;
      while (a[j] >= a[1] - 1) {
        s = s + a[j];
        j = j + 1;
      }

      // H5 - Increase a[j]
      if (j > m) {
        return this.partitions;
      }
      x = a[j] + 1;
      a[j] = x;
      j = j - 1;

      // H6 - Tweak a[1]...a[j].
      while (j > 1) {
        a[j] = x;
        s = s - x;
        j = j - 1;
      }
      a[1] = s;
      continue;
    }

    // H3 - Tweak a[1] and a[2]
    a[1] = a[1] - 1;
    a[2] = a[2] + 1;
  }
};

// let p = new integerPartitions(10).all()
// console.log(p)

function nextPermutation(a) {
  let n = a.length,
    i = n - 2,
    j = n - 1;

  while (a[i] >= a[i + 1]) {
    i--;
  }

  while (a[j] >= a[i]) {
    j--;
  }

  swap(a, i, j);

  // reverse a[i+1:n]
  let k = i + 1,
    m = n - 1;
  while (k < m) {
    swap(a, k, m);
    k++;
    m--;
  }

  return a;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

/* 
  Returns all prime numbers <= N.
*/
function prime_sieve(N) {
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

// tests
// let a = [0,1,2,3]
// for (let i = 0; i < 24; i++) {
//   console.log(a)
//   a = nextPermutation(a)
// }
