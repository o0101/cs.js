import Heap from './heap.js';

const DEFAULT_OPTIONS = {
  inplace: false,           /* returns a new array, true sorts in place */
  invert: false,            /* invert order */
  compare: undefined,
};

export default function HeapSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  const heapOptions = Object.assign({}, opts);

  if ( Object.prototype.hasOwnProperty.call(heapOptions, 'inplace') ) {
    delete heapOptions.inplace;
  }

  if ( opts.invert ) {
    heapOptions.max = true;
  } else {
    heapOptions.max = false;
  }

  if ( opts.compare === undefined ) {
    heapOptions.invert = false;
  } 

  const heap = new Heap(heapOptions, data);

  if ( opts.compare ) {
    Heap.print(heap);
  }

  if ( opts.inplace ) {
    throw new TypeError(`Implement in place heap sort.`);
  } else {
    const result = [];
    while( heap.size ) {
      result.push(heap.pop());
    }
    return result;
  }
}

export const sort = HeapSort;

function recursiveHeapSort(list, opts) {
  if ( list.length <= 1 ) {
    return list;
  } else {
    const half = list.length>>1;
    const sortedLeft = recursiveHeapSort(list.slice(0,half), opts);
    const sortedRight = recursiveHeapSort(list.slice(half), opts);
    return merge(sortedLeft, sortedRight, opts);
  }
}

function merge(a, b, opts) {
  const sorted = [];
  let ai = 0;
  let bi = 0;

  while(ai < a.length && bi < b.length) {
    const comparison = signedCompare(a[ai], b[bi], opts);
    const head = comparison >= 0 ? a[ai++] : b[bi++];
    sorted.push(head); 
  }

  while(ai < a.length) {
    sorted.push(a[ai++]);
  }

  while(bi < b.length) {
    sorted.push(b[bi++]);
  }

  return sorted;
}


export function signedCompare(a, b, {compare: compare = DEFAULT_COMPARE, invert: invert = false} = {}) {
  const comparison = compare(a, b);
  if ( invert ) {
    return -comparison;
  }
  return comparison;
}

function DEFAULT_COMPARE(a, b) {
  if ( a > b ) {
    return -1;
  } else if ( a < b ) {
    return 1;
  } else {
    return 0;
  }
}
