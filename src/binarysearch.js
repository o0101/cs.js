import {DEFAULT_COMPARE, signedCompare} from './quicksort.js';

const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE,
  recursive: false,         /* iterative is the default, true uses recursive */
};

export default function BinarySearch(data, item, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  opts = Object.freeze(opts);

  if ( opts.recursive ) {
    return recursiveBinarySearch(data, item, 0, data.length - 1, opts);
  } else {
    return iterativeBinarySearch(data, item, 0, data.length - 1, opts);
  }
}

export const find = BinarySearch;

export function recursiveBinarySearch(data, item, low, high, opts) {
  const foundIndex = Math.floor((low + high)/2);
  const foundItem = data[foundIndex];
  const comparison = signedCompare(foundItem, item, opts);

  if(low < high) {
    if ( comparison > 0 ) {
      low = foundIndex + 1;
    } else if ( comparison < 0 ) {
      high = foundIndex;
      if ( high > 0 ) {
        high--;
      }
    } else {
      return {has: true, index: foundIndex};
    }
    return recursiveBinarySearch(data, item, low, high, opts);
  } else {
    if ( comparison === 0 ) {
      return {has: true, index: foundIndex};
    } else if ( comparison > 0 ) {
      //console.log({foundItem, item, comparison, low, high, foundIndex, low1: low+1});
      return {has: false, index: foundIndex+1};
    } else if ( comparison < 0 ) {
      //console.log({foundItem, item, comparison, low, high, foundIndex});
      return {has: false, index: foundIndex};
    }
  }
}

export function iterativeBinarySearch(data, item, low, high, opts ) {
  let foundIndex;
  let foundItem;
  let comparison;

  if ( data.length === 0 ) {
    throw new TypeError(`OK`);
  }

  do {
    foundIndex = Math.floor((low + high)/2);
    foundItem = data[foundIndex];
    comparison = signedCompare(foundItem, item, opts);
    if ( comparison > 0 ) {
      low = foundIndex + 1;
    } else if ( comparison < 0 ) {
      high = foundIndex;
      if ( high > 0 ) {
        high--;
      }
    } else {
      break;
    }
  } while( low < high );

  foundIndex = Math.floor((low + high)/2);
  foundItem = data[foundIndex];
  comparison = signedCompare(foundItem, item, opts);

  /**
  if ( foundIndex < 0 ) {
    console.log({low,high});
  }
  **/
  if ( comparison === 0 ) {
    return {has: true, index: foundIndex};
  } else if ( comparison > 0 ) {
    return {has: false, index: foundIndex+1};
  } else if ( comparison < 0 ) {
    return {has: false, index: foundIndex};
  }
}

