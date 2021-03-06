const DEFAULT_OPTIONS = {
  invert: false,            /* invert order */
  compare: DEFAULT_COMPARE
};

export default function MergeSort(data, opts) {
  if ( ! opts ) {
    opts = DEFAULT_OPTIONS;
  }

  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  return recursiveMergeSort(data, opts);
}

export const sort = MergeSort;

function recursiveMergeSort(list, opts) {
  if ( list.length <= 1 ) {
    return list;
  } else {
    const half = list.length>>1;
    const sortedLeft = recursiveMergeSort(list.slice(0,half), opts);
    const sortedRight = recursiveMergeSort(list.slice(half), opts);
    return merge(sortedLeft, sortedRight, opts);
  }
}

function merge(a, b, opts) {
  const sorted = [];
  let ai = 0;
  let bi = 0;

  while(ai < a.length && bi < b.length) {
    const comparison = signedCompare(a[ai], b[bi], opts);
    const head = comparison >= 0 ? a[ai++] : b[bi++];
    sorted.push(head); 
  }

  while(ai < a.length) {
    sorted.push(a[ai++]);
  }

  while(bi < b.length) {
    sorted.push(b[bi++]);
  }

  return sorted;
}


export function signedCompare(a, b, {compare: compare = DEFAULT_COMPARE, invert: invert = false} = {}) {
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
