const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE
};

export default function BinarySearch(data, item, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  return recursiveBinarySearch(data, item, opts);
}

export const find = BinarySearch;

function recursiveBinarySearch(data, item, opts) {
  return {has: false, index: -1}
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
