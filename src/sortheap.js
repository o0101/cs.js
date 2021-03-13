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

  heapOptions.max = opts.max ? true : false;

  const heap = new Heap(heapOptions, data);

  if ( opts.inplace ) {
    throw new TypeError(`Implement in place heap sort.`);
  } else {
    const result = [];
    while( heap.size ) {
      result.push(heap.pop());
    }
    console.log(result);
    Heap.print(heap);
    return result;
  }
}

export const sort = HeapSort;

export function signedCompare(a, b, {compare: compare = DEFAULT_COMPARE, invert: invert = false, max: max = false} = {}) {
  let comparison = compare(a, b);
  if ( invert ) {
    comparison *= -1;
  }
  if ( max ) {
    comparison *= -1;
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
