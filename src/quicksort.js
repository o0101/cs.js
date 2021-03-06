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

  if ( opts.fastPartition ) {
    opts.partition = sophisticatedPartition;
  } else {
    opts.partition = simplePartition;
  }

  recursiveQuickSort(data, 0, data.length - 1, opts);
}

export const sort = QuickSort;

function recursiveQuickSort(list, low, high, opts) {
  if ( low < high ) {
    const p = opts.partition(list, low, high, opts);
    recursiveQuickSort(list, low, p - 1, opts);
    recursiveQuickSort(list, p + 1, high, opts);
  }
}
// simple pivot using O(n) extra space
// so we can easily choose any item as pivot
function simplePartition(list, low, high, opts) {
  const listLength = high - low + 1;
  const pivotedList = new Array(listLength);
  const pivotIndex = Math.floor(Math.random()*listLength) + low;
  const pivotItem = list[pivotIndex];
  let pivot;
  let i = low;
  let j = high;
  let u = low;

  while( i < j ) {
    const unpivotedItem = list[u];
    const comparison = signedCompare(unpivotedItem, pivotItem, opts);
    if ( comparison >= 0 ) {           // 'normal compare order'
      pivotedList[i] = unpivotedItem;
      i++;
    } else if ( comparison === -1 ) {   // 'normal compare out of order'
      pivotedList[j] = unpivotedItem;
      j--;
    }
    u++;
  }

  pivot = i;
  pivotedList[pivot] = pivotItem;

  for( i = low; i <= high; i++ ) {
    list[i] = pivotedList[i];
  }
  
  return pivot;
}

// sophisticated partition 
function sophisticatedPartition(list, low, high, opts) {
  const pivotIndex = high;
  //Math.floor(Math.random()*list.length) + low;
  const pivotItem = list[pivotIndex];

  let i = low;

  for( let j = low; j < high; j++ ) {
    const comparison = signedCompare(list[j], pivotItem, opts);
    if ( comparison >= 0 ) {
      swap(list, i, j);
      i++;
    }
  }

  swap(list, i, pivotIndex);

  return i;
}

function swap(list, i, j) {
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

function DEFAULT_COMPARE(a, b) {
  if ( a > b ) {
    return -1;
  } else if ( a < b ) {
    return 1;
  } else {
    return 0;
  }
}
