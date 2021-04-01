// iterative binary search
let binarySearch = function(a, key) {
  let low = 0;
  let high = a.length;
  // Note on the condition:
    // <= is important as < 	
    // will only handle down to cases where subarray a[low..high] is length 2
    // but subarray of length 1 can only be handled by <=
  while( low <= high ) {
    const mid = (low+high)>>1;
    const midKey = a[mid];
    if ( midKey < key ) {
      low = mid + 1;
    } else if ( midKey > key ) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return high;
};

let binarySearchRec = function(a, key, low, high) {
  if ( low > high ) {
    return -1;
  }

  const mid = (low+high)>>1;
  const midKey = a[mid];

  if ( midKey > key ) {
    return binarySearchRec(a, key, low, mid - 1);
  } else if ( midKey < key ) {
    return binarySearchRec(a, key, mid + 1, high);
  } else {
    return mid;
  }
}

