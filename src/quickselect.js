import {
  swap, DEFAULT_COMPARE, signedCompare, 
  simplePartition, sophisticatedPartition
} from './quicksort.js';

const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE,
  fastPartition: false,      /* standard textbook partition algorithm,
                            /* false is a simple, easy to understand, but 3 - 6 times slower 
                            /* partition algorithm */
};

export default function QuickSelect(list, k, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  if ( opts.fastPartition ) {
    opts.partition = sophisticatedPartition;
  } else {
    opts.partition = simplePartition;
  }

  return iterativeQuickSelect(list, k, 0, list.length - 1, opts);
}

function iterativeQuickSelect(list, k, low, high, opts) {
  let pivotIndex = low + Math.floor(Math.random()*(high-low));
  while(true) {
    if ( low === high ) {
      return list[low];
    } else {
      pivotIndex = opts.partition(list, low, high, opts, pivotIndex);
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
