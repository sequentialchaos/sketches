/*
   Algorithm H
    from "The Art of Computer Programming 
          VOLUME 4A: Combinatorial Algorithms, Part 1" 
    by Donald Knuth,
    pages 416 & 417.

   - Generates all set partitions of {1, 2,..., N}
     lexicographic order.
*/
function* setPartitions(N) {
  // H1
  let a = [];   // Restricted growth string, a.
  let b = [];   // Auxiliary array, b.
  let set = []; // The set {1, 2,..., N}.
  for (let n = 0; n < N; n++) {
    a.push(0);
    set.push(n + 1);
    if (n < N - 1)
      b.push(1);
  }
  
  let m = 1; // Value of b[n], m.
  while (true) {
    // H2
    yield restrictedGrowthStringToPartition(a, set);
    if (a[N-1] == m) {
      // H4
      let j = N - 2;
      while (a[j] == b[j])
        j -= 1;

      // H5
      if (j == 0)
        return;
      else
        a[j] += 1;

      // H6
      m = b[j] + (a[j] == b[j]);
      j += 1
      while (j < N - 1) {
        a[j] = 0;
        b[j] = m;
        j += 1;
      }
      a[N-1] = 0;
      continue;
    }

    // H3
    a[N-1] += 1;
  }
}

/*
  - Converts a restricted growth string *r* into its
    *set* partition equivalent. 
  *- Preconditions:
    (1) r.length == set.length
    (2) r.max < set.length
  *- Postcondition:
    --- Return the set partition.
*/
function restrictedGrowthStringToPartition(r, set) {
  if (set.length == 1)
    return set;

  // Initialize the partition.
  let partition = [];

  // Create and fill the partition's blocks.
  let current = 0;
  r.forEach((block, i) => {
    if (current == block) {
      // Create block
      partition.push([]);
      current += 1;
    } 
    // Fill block
    partition[block].push(set[i]);
  });

  return partition;
}

/*
  Converts a partition into a string representation using 
  vertical bars to separate the elements into their blocks. 
  Look at the following partitions of {1, 2, 3, 4} as examples:

       Partition             String Representation
    a) {{1}, {2, 3}, {4}}    1|23|4
    b) {{1, 2}, {3, 4}}      12|34
    c) {{1, 3, 4}, {2}}      134|2
    d) {{1}, {2}, {3}, {4}}  1|2|3|4

   ** Currently only works for partitions with <= 10 elements. 
      Could utilize the english alphabet with its 52 characters. **
*/
function setPartitionToString(partition) {
  let string = [];
  partition.forEach((set, i) => {
    set.forEach(element => {
      string.push(element);
    })
    if (i < partition.length - 1)
      string.push("|");
  })
  return string.join("");
}