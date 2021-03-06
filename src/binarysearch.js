import {Empty} from './lib/tree.js';
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

  if ( opts.recursive ) {
    return recursiveBinarySearch(data, item, 0, data.length - 1, opts);
  } else {
    return iterativeBinarySearch(data, item, opts);
  }
}

export const find = BinarySearch;

function recursiveBinarySearch(data, item, low, high, opts) {
  const foundIndex = Math.floor((low + high)/2);
  const foundItem = data[foundIndex];
  const comparison = signedCompare(foundItem, item, opts);

  if(low < high) {
    if ( comparison > 0 ) {
      low = foundIndex + 1;
    } else if ( comparison < 0 ) {
      high = foundIndex - 1;
    } else {
      return {has: true, index: foundIndex};
    }
    return recursiveBinarySearch(data, item, low, high, opts);
  } else {
    if ( comparison === 0 ) {
      return {has: true, index: foundIndex};
    } else {
      return {has: false, index: low};
    }
  }
}

function iterativeBinarySearch(data, item, opts ) {
  let low = 0;
  let high = data.length - 1;
  let foundIndex;
  let foundItem;
  let comparison;

  do {
    foundIndex = Math.floor((low + high)/2);
    foundItem = data[foundIndex];
    comparison = signedCompare(foundItem, item, opts);
    if ( comparison > 0 ) {
      low = foundIndex + 1;
    } else if ( comparison < 0 ) {
      high = foundIndex - 1;
    } else {
      break;
    }
  } while( low < high );

  foundIndex = Math.floor((low + high)/2);
  foundItem = data[foundIndex];
  comparison = signedCompare(foundItem, item, opts);

  if ( comparison === 0 ) {
    return {has: true, index: foundIndex};
  } else {
    return {has: false, index: low};
  }
}

