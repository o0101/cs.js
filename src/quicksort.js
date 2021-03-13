const DEFAULT_OPTIONS = {
  iterative: false,         /* use an iterative version */
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE,
  pivot: undefined          /* standard random pivot. 'mom' uses median of medians algorithm */
                            /* but throws if list[0] is not a number */
};

export default function QuickSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  if ( opts.pivot === 'mom' ) {
    if ( typeof data[0] !== 'number') {
      throw new TypeError(`Median of medians pivot selection algorithm can only be used on lists of numbers. Received: ${data[0]} at list position 0`);
    }
  }

  if ( opts.iterative ) {
    iterativeQuickSort(data, opts);
  } else {
    recursiveQuickSort(data, 0, data.length - 1, opts);
  }
}

export const sort = QuickSort;

function iterativeQuickSort(list, opts) {
  const stack = [{low:0, high: list.length-1}];
  while ( stack.length ) {
    const {low,high} = stack.pop();
    if ( low < high ) {
      const pivot = getPivot(list,low,high);
      const p = partition(list, low, high, opts, pivot);
      stack.push({low, high: p-1});
      stack.push({low: p+1, high});
    }
  }
}

function recursiveQuickSort(list, low, high, opts) {
  if ( low <= high ) {
    const pivot = getPivot(list,low,high);
    const p = partition(list, low, high, opts, pivot);
    recursiveQuickSort(list, low, p - 1, opts);
    recursiveQuickSort(list, p + 1, high, opts);
  }
}

function getPivot(list, low, high) {
  return Math.floor(Math.random()*(high-low))+low;
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

export function tripartition(list, n, low, high, opts, pivot) {
  //return partition(list, low, high, opts, pivot);
    let pivotValue = list[pivot]
    swap(list, pivot, high)  // Move pivot to end
    let storeIndex = low;

  // Move all elements smaller than the pivot to the low of the pivot
    for( let i = low; i < high; i++ ) { 
      if ( list[i] < pivotValue ) {
        swap(list, storeIndex, i);
        storeIndex++;
      }
    }

  // Move all elements equal to the pivot high after
  // the smaller elements
    let storeIndexEq = storeIndex;
    for( let i = storeIndex; i < high; i++ ) { 
      if( list[i] === pivotValue ) {
        swap(list, storeIndexEq, i);
        storeIndexEq++;
      }
    }

  swap(list, high, storeIndexEq); // Move pivot to its final place

  // Return location of pivot considering the desired location n
  if( n < storeIndex ) {
    return storeIndex;  // n is in the group of smaller elements
  } else if ( n <= storeIndexEq ) {
    return n;  // n is in the group equal to pivot
  }
  return storeIndexEq // n is in the group of larger elements
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
