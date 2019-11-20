class QuickFindUF {
  constructor(N) {
    this.id = [];
    for (let i = 0; i < N; i++) {
      this.id.push(i);
    }
  }

  isConnected(p, q) {
    return this.id[p] === this.id[q];
  }

  union(p, q) {
    let pid = this.id[p];
    let qid = this.id[q];
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pid) {
        this.id[i] = qid;
      }
    }
  }

  print() {
    console.log(this.id.join(" "));
  }
}

class QuickUnionUF {
  constructor(N) {
    this.parent = [];
    for (let i = 0; i < N; i++) {
      this.parent.push(i);
    }
  }

  root(i) {
    while (i !== parent[i]) {
      i = parent[i];
    }
    return i;
  }

  isConnected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    let i = this.root(p);
    let j = this.root(q);
    this.parent[i] = j;
  }
}

class WeightedQuickUnionUF {
  constructor(N) {
    this.parent = [];
    this.size = [];
    for (let i = 0; i < N; i++) {
      this.parent.push(i);
      this.size.push(1);
    }
  }

  root(i) {
    while (i !== parent[i]) {
      i = parent[i];
    }
    return i;
  }

  isConnected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    let i = this.root(p);
    let j = this.root(q);
    if (i == j) {
      return;
    }
    if (this.size[i] < this.size[j]) {
      this.parent[i] = j;
      this.size[j] += this.size[i];
    } else {
      this.parent[j] = i;
      this.size[i] += this.size[j];
    }
  }
}

class WeightedQuickUnionWithPathCompressionUF {
  constructor(N) {
    this.parent = [];
    this.size = [];
    for (let i = 0; i < N; i++) {
      this.parent.push(i);
      this.size.push(1);
    }
  }

  root(i) {
    while (i !== parent[i]) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  }

  isConnected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    let i = this.root(p);
    let j = this.root(q);
    if (i == j) {
      return;
    }
    if (this.size[i] < this.size[j]) {
      this.parent[i] = j;
      this.size[j] += this.size[i];
    } else {
      this.parent[j] = i;
      this.size[i] += this.size[j];
    }
  }
}
