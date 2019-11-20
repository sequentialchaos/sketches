function setup() {
  N = 10;
  uf = new QuickFindUF(N);
  uf.print();
  for (let i = 0; i < 5; i++) {
    p = Math.floor(random(0, 10));
    q = Math.floor(random(0, 10));
    console.log(`unite ${p} and ${q}`);
    uf.union(p, q);
    uf.print();
  }
}
