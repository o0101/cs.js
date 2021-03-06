import {
  swap, DEFAULT_COMPARE, signedCompare, 
  partition, tripartition,
} from './quicksort.js';

const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE,
};

export default function QuickSelect(list, k, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  k -= 1; // k is 1-based

  if ( opts.pivot === 'mom' ) {
    if ( typeof list[0] !== 'number') {
      throw new TypeError(`Median of medians pivot selection algorithm can only be used on lists of numbers. Received: ${list[0]} at list position 0`);
    }
    return recursiveQuickSelect(list, k, 0, list.length - 1, opts);
  } else {
    return iterativeQuickSelect(list, k, 0, list.length - 1, opts);
  }
}

function recursiveQuickSelect(list, k, low, high, opts) {
  let pivotIndex = getPivot(list, low, high, opts);
  if ( low === high ) {
    return list[low];
  } else {
    if ( opts.pivot === 'mom' ) {
      pivotIndex = tripartition(list, k, low, high, opts, pivotIndex);
    } else {
      pivotIndex = partition(list, low, high, opts, pivotIndex);
    }
    if ( k === pivotIndex ) {
      return list[k];
    } else if ( k < pivotIndex ) {
      high = pivotIndex - 1;
    } else {
      low = pivotIndex + 1;
    }
    return recursiveQuickSelect(list, k, low, high, opts);
  }
}

function iterativeQuickSelect(list, k, low, high, opts) {
  while(true) {
    let pivotIndex = low + Math.floor(Math.random()*(high-low));
    if ( low === high ) {
      return list[low];
    } else {
      pivotIndex = partition(list, low, high, opts, pivotIndex);
      if ( k === pivotIndex ) {
        return list[k];
      } else if ( k < pivotIndex ) {
        high = pivotIndex - 1;
      } else {
        low = pivotIndex + 1;
      }
    }
  }
}

function getPivot(list, low, high, opts) {
  if ( opts.pivot !== 'mom' ) {
    return low + Math.floor(Math.random()*(high-low));
  } else {
    // for 5 or less elements just get median
    if ((high - low) < 5) {
      return partition5(list, low, high);
    }

    // otherwise move the medians of five-element subgroups to the first n/5 positions
    for( let i = low; i <= high; i += 5 ) { 
      // get the median position of the i'th five-element subgroup
      let subRight = i + 4;

      if ( subRight > high) {
        subRight = high;
      }

      let median5 = partition5(list, i, subRight);

      swap(list, median5, low + Math.floor((i - low)/5));
    }

    // compute the median of the n/5 medians-of-five
    let mid = (high - low) / 10 + low + 1;

    return recursiveQuickSelect(list, mid, low, low + Math.floor((high - low) / 5), opts)
  }
}

function partition5(list, low, high) {
  let i = low + 1;

  while (i <= high) {
    let j = i;
    while (j > low && list[j-1] > list[j]) {
      swap(list, j-1, j);
      j--;
    }
    i++;
  }

  return Math.floor((low + high) / 2)
}

export const select = QuickSelect;
