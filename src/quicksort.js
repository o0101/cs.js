const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE,
  fastPartition: true,      /* standard textbook partition algorithm,
                            /* false is a simple, easy to understand, but 3 - 6 times slower 
                            /* partition algorithm */
};

export default function QuickSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  recursiveQuickSort(data, 0, data.length - 1, opts);
}

export const sort = QuickSort;

function recursiveQuickSort(list, low, high, opts) {
  if ( low < high ) {
    const p = partition(list, low, high, opts);
    recursiveQuickSort(list, low, p - 1, opts);
    recursiveQuickSort(list, p + 1, high, opts);
  }
}
// simple pivot using O(n) extra space
// sophisticated partition 
export function partition(list, low, high, opts, pivot) {
  if ( pivot !== undefined ) {
    swap(list, pivot, high);
  }
  const pivotItem = list[high];

  let s = low;

  for( let i = low; i < high; i++ ) {
    const comparison = signedCompare(list[i], pivotItem, opts);
    if ( comparison >= 0 ) {
      swap(list, s, i);
      s++;
    }
  }

  swap(list, s, high);

  return s;
}

export function swap(list, i, j) {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

export function signedCompare(a, b, {compare: compare = DEFAULT_COMPARE, invert: invert = false} = {}) {
  const comparison = compare(a, b);
  if ( invert ) {
    return -comparison;
  }
  return comparison;
}

export function DEFAULT_COMPARE(a, b) {
  if ( a > b ) {
    return -1;
  } else if ( a < b ) {
    return 1;
  } else {
    return 0;
  }
}
