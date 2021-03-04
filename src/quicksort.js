const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE
};

export default function QuickSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  recursiveQuickSort(data, 0, data.length - 1, opts.compare, opts.invert);
}

export const sort = QuickSort;

function recursiveQuickSort(list, low, high, compare, invert) {
  if ( low < high ) {
    const p = partition(list, low, high, compare, invert);
    recursiveQuickSort(list, low, p - 1, compare, invert);
    recursiveQuickSort(list, p + 1, high, compare, invert);
  }
}
// simple pivot using O(n) extra space
// so we can easily choose any item as pivot
function partition(list, low, high, compare, invert) {
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
    const comparison = signedCompare(unpivotedItem, pivotItem, compare, invert);
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

export function signedCompare(a, b, compare = DEFAULT_COMPARE, invert = false) {
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
