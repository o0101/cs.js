import {Empty} from './lib/tree.js';
import {swap, signedCompare as SC} from './quicksort.js';
import BinarySearch from './binarysearch.js'; 
import {iterativeBinarySearch} from './binarysearch.js'; 

const DEFAULT_OPTS = {
  compare: undefined, /* uses DEFAULT_COMPARE, but can be a custom comparison */
  inplace: true,     /* sort is in place, 
                      /* false is create a new array without changing original */
  nosplice: true,    /* don't use array splice operations on inplace array instead use swaps */
}

export default function SelectionSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTS;
  }

  opts = Object.assign({}, DEFAULT_OPTS, opts);

  opts = Object.freeze(opts);

  if ( opts.inplace ) {
    if ( opts.nosplice ) {
      let start = 0;
      for( let start = 0; start < data.length; start++ ) {
        const minIndex = findMin(data, start, opts);
        let j = minIndex;
        while(j > start) {
          swap(data, j, j-1);
          j--;
        }
      }
    } else {
      let start = 0;
      for( let start = 0; start < data.length; start++ ) {
        const minIndex = findMin(data, start, opts);
        const minVal = data[minIndex];
        data.splice(minIndex, 1);
        data.splice(start, 0, minVal);
      }
    }
    return data;
  } else {
    const sortedList = [];

    while(data.length) {
      const minIndex = findMin(data, 0, opts);
      const minVal = data.splice(minIndex,1)[0];
      sortedList.push(minVal);
    }

    return sortedList;
  }

}

export const sort = SelectionSort;
export const signedCompare = SC;

  function findMin(arr, start, opts) {
    let minValue = arr[start];
    let minIndex = start;
    for( let i = start; i < arr.length; i++ ) {
      const val = arr[i];
      const comparison = signedCompare(minValue, val, opts);
      if ( comparison >= 0 ) {
        // do nothing
      } else {
        minValue = val;
        minIndex = i;
      }
    }

    return minIndex;
  }


