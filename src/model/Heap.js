export default class Heap {
  constructor(type = 'min') {
    this.heap = [];
    this.size = 0;
    this.type = type;
  }

  fixUp(k) {
    while (k > 1 && this.cmp(Math.floor(k / 2), k)) {
      this.swap(k, Math.floor(k / 2));

      k = Math.floor(k / 2);
    }
  }

  fixDown(k) {
    while (2 * k <= this.size - 1) {

      let j = 2 * k;

      if (j < this.size - 1 && this.cmp(j, j + 1)) j += 1;

      if (!this.cmp(k, j)) break;

      this.swap(k, j);

      k = j;
    }
  }

  insert(priority) {
    this.heap[this.size += 1] = priority

    this.fixUp(this.size)
  }

  remove() {
    if (this.size == 0) return;

    this.swap(1, this.size);

    this.fixDown(1);

    let item = this.heap[this.size];

    this.size -= 1;

    return item;
  }

  cmp(idx_a, idx_b) {
    if (this.type == 'min')
      return this.heap[idx_a] > this.heap[idx_b];

    return this.heap[idx_a] < this.heap[idx_b];
  }

  swap(idx_a, idx_b) {
    const temp = this.heap[idx_a];
    this.heap[idx_a] = this.heap[idx_b];
    this.heap[idx_b] = temp;
  }
}
