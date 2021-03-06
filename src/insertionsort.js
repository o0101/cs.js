import {swap, signedCompare as SC} from './quicksort.js';
import BinarySearch from './binarysearch.js'; 

const DEFAULT_OPTS = {
  inplace: true,      /* sort is in place, 
                      /* false is create a new array without changing original */
}

export default function InsertionSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTS;
  }

  opts = Object.assign({}, DEFAULT_OPTS, opts);

  if ( opts.inplace ) {
    for( let i = 1; i < data.length; i++ ) {
      let j = i;
      while( j > 0 && signedCompare(data[j], data[j-1], opts) > 0) {
        swap(data, j-1, j);
        j--;
      }
    }
    return data;
  } else {
    const sortedList = [data[0]];
    const tail = data.slice(1);
    let sortedMaxVal = data[0];

    for( const val of tail ) {
      const comparison = signedCompare(sortedMaxVal, val, opts);  
      if ( comparison >= 0 ) {
        // do nothing, already in order
        sortedList.push(val);
      } else {
        const insertIndex = BinarySearch(sortedList, val, opts).index;
        sortedList.splice(insertIndex, 0, val);
      }
      sortedMaxVal = sortedList[sortedList.length-1];
    }

    return sortedList;
  }
}

export const sort = InsertionSort;
export const signedCompare = SC;



