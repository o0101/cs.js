import {swap, signedCompare as SC} from './quicksort.js';
import BinarySearch from './binarysearch.js'; 
import {iterativeBinarySearch} from './binarysearch.js'; 

const DEFAULT_OPTS = {
  compare: undefined, /* uses DEFAULT_COMPARE, but can be a custom comparison */
  inplace: false,     /* sort is in place, 
                      /* false is create a new array without changing original */
  nobs: false,        /* don't use binary search (just linear search) to find */
                      /* insert index in sorted part of list */
  nosplice: false,    /* don't use array splice operations on inplace array instead use swaps */
}

export default function InsertionSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTS;
  }

  opts = Object.assign({}, DEFAULT_OPTS, opts);

  opts = Object.freeze(opts);

  if ( opts.inplace ) {
    if ( opts.nobs ) {
      for( let i = 1; i < data.length; i++ ) {
        let j = i;
        while( j > 0 && signedCompare(data[j], data[j-1], opts) > 0) {
          swap(data, j-1, j);
          j--;
        }
      }
    } else if ( opts.nosplice ) {
        for( let i = 1; i < data.length; i++ ) {
          const val = data[i];
          const comparison = signedCompare(data[i-1], val, opts);
          if ( comparison >= 0 ) {
            // already in order, leave it
          } else {
            const insertIndex = iterativeBinarySearch(data, val, 0, i, opts).index;
            /*
            if ( insertIndex === -1 ) {
              console.log({insertIndex, val, ds0i: data.slice(0,i), i});
            }
            */
            let j = i;
            while(j > insertIndex) {
              swap(data, j, j-1);
              j--;
            }
          }
        }
    } else {
      for( let i = 1; i < data.length; i++ ) {
        const val = data[i];
        const comparison = signedCompare(data[i-1], val, opts);
        if ( comparison >= 0 ) {
          // already in order, leave it
        } else {
          const insertIndex = iterativeBinarySearch(data, val, 0, i, opts).index;
          /*
          if ( insertIndex === -1 ) {
            console.log({insertIndex, val, ds0i: data.slice(0,i), i});
          }
          */
          data.splice(i, 1); 
          data.splice(insertIndex, 0, val);
        }
      }
    }
    return data;
  } else {
    const sortedList = [data[0]];
    const tail = data.slice(1);
    let sortedMaxVal = data[0];

    //console.log({data,sortedList,tail,sortedMaxVal});

    while(tail.length) {
      //console.log();
      const val = tail.pop();
      const comparison = signedCompare(sortedMaxVal, val, opts);  
      if ( comparison >= 0 ) {
        // do nothing, already in order
        sortedList.push(val);
      } else if ( opts.nobs ) {
        const insertIndex = sortedList.findIndex(item => signedCompare(val, item) >= 0);
        //console.log({insertIndex});
        sortedList.splice(insertIndex, 0, val);
      } else {
        const insertIndex = BinarySearch(sortedList, val, opts).index;
        //console.log({insertIndex});
        sortedList.splice(insertIndex, 0, val);
      }
      sortedMaxVal = sortedList[sortedList.length-1];
      //console.log({sortedMaxVal, val, comparison});
      //console.log({sortedList, tail});
    }

    return sortedList;
  }
}

export const sort = InsertionSort;
export const signedCompare = SC;

