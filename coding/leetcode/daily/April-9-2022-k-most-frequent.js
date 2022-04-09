/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class BH {
  constructor() {
    this.values = [];
  }
  add(element) {
    this.values.push(element);
    let index = this.values.length - 1;
    const current = this.values[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];

      if (parent.value >= current.value) {
        this.values[parentIndex] = current;
        this.values[index] = parent;
        index = parentIndex;
      } else break;
    }
  }
  pop() {
    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;

    let index = 0;
    const length = this.values.length;
    const current = this.values[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.value < current.value) swap = leftChildIndex;
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild.value < current.value) ||
          (swap !== null && rightChild.value < leftChild.value)
        )
          swap = rightChildIndex;
      }

      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = current;
      index = swap;
    }

    return max;
  }
}

var topKFrequent = function(nums, k) {
  if ( nums.length === 1 ) return [...nums]; 
  const map = new Map();
  const heap = new BH();
 
  for( const num of nums ) {
    let count = map.get(num);
    if ( ! count ) {
      count = {
        value: 0
      };
      map.set(num, count);
    }

    count.value += 1;
  }

  for( const [num, {value}] of map.entries() ) {
    heap.add({value,num});
    while(heap.values.length > k) {
      heap.pop();
    }
  }

  return heap.values.map(({num}) => num);
};

const T = [
	topKFrequent([1,1,1,2,2,3], 2),
	topKFrequent([1], 1),
	topKFrequent([1,2,3,4,5,6,7,8,9,10], 10),
	topKFrequent([1,2,2,2,3,3,4,5,6,7,4,4,8,9,4,10,4,11], 2),
];

console.log(T);
