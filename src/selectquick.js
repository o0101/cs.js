import {
  swap, DEFAULT_COMPARE, signedCompare, 
  partition,
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

  return iterativeQuickSelect(list, k, 0, list.length - 1, opts);
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

export const select = QuickSelect;
