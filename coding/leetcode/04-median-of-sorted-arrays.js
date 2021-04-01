let medianOfSorted = function medianOfSorted(a1,a2) {
  const N = a1.length + a2.length;
  // get the target index in the sorted array
    const sortedMedIndex = [];
    if ( N % 2 === 1 ) {
      sortedMedIndex[0] = (N-1)/2;
    } else {
      sortedMedIndex[0] = (N-2)/2;
      sortedMedIndex[1] = N/2;
    }

  if ( sortedMedIndex.length == 2 ) {
    return (
      findValueAtIndexInMerged(a1, a2, sortedMedIndex[0]) +
      findValueAtIndexInMerged(a1, a2, sortedMedIndex[1])
    )/2;
  } else {
    return findValueAtIndexInMerged(a1, a2, sortedMedIndex[0])
  }
}

function findValueAtIndexInMerged(a1,a2,index) {
  if ( a1.length === 0 ) {
    return med(a2).medVal;
  } else if ( a2.length === 0 ) {
    return med(a1).medVal;
  } else if ( a2.length > a1.length ) {
    ([a1,a2] = [a2,a1]);
  }

  let A = {arr:a1,lo:0,hi:a1.length};
  let B = {arr:a2,lo:0,hi:a2.length};
  const guess = {
    index: -1,
    val: null,
    sortedIndex: -1
  };

  // get the first guess for this target Index
  // heuristic
  // first guess is its index in longer array shifted 
  // left by the length of the first array
  // this gives correct answer for case
  // [1,2,3, ... k] [k+1, K+2, ... n] for example

  guess.index = (A.lo+A.hi)>>1;
  guess.val = A.arr[guess.index];
  guess.BIndex = binarySearch(B.arr, guess.val);
  guess.sortedIndex = guess.index + guess.BIndex;

  while(index !== guess.sortedIndex) {
    // update guess
    if ( guess.sortedIndex > index ) {
      A.hi = guess.index-1;
    } else {
      A.lo = guess.index+1;
    }
    //console.log({A,B});
    ([A, B] = [B, A])

    guess.index = Math.floor((A.lo+A.hi)/2);
    guess.val = A.arr[guess.index];
    guess.BIndex = binarySearch(
      B.arr, 
      guess.val,
      B.lo,
      B.hi
    );
    guess.sortedIndex = guess.index + guess.BIndex;
    //console.log({A,B,guess});
  }

  return guess.val;
}

function med(arr) {
  if ( arr.length % 2 == 1 ) {
    const medIndex = [(arr.length-1)/2];
    return {medVal: arr[medIndex[0]], medIndex};
  } else {
    const medIndex = [(arr.length-2)/2, arr.length/2];
    return {medVal: (arr[medIndex[0]]+arr[medIndex[1]])/2, medIndex};
  }
}

//console.log(binarySearch([0,1,2,3,4,6,7,8,9,10], 5));
//console.log(binarySearch([0,1,2,3,4,6,7,8,9,10], 4));
//console.log(binarySearch([0,1,2,3,4,6,7,8,9,10], 6));
//console.log(binarySearch([0,1,2,3,4,6,7,8,9,10], 12));
//console.log(binarySearch([ 2, 3, 5, 6, 7, 9], 8));

//console.log(med([0,1,2,3,4]));
//console.log(med([0,1,2,3,4,5]));

console.log(medianOfSorted([1,2,3],[4,5,6,7,8,9]));
console.log(medianOfSorted([1,4,8],[2,3,5,6,7,9]));
console.log(medianOfSorted([1,4,8,11],[2,3,5,6,7,9]));
console.log(medianOfSorted([1,2,3],[0]));
console.log(medianOfSorted([],[0]));
console.log(medianOfSorted([0],[0]));
console.log(medianOfSorted([2,3],[0]));
console.log(medianOfSorted([2],[3]));
console.log(medianOfSorted([1,2],[1,2]));
console.log(medianOfSorted([2,2,4,4],[2,2,4,4]));
console.log(medianOfSorted([2,3],[]));
console.log(medianOfSorted([],[2,3]));

// return the insert position of key even if it's not in array
function binarySearch(a, key, low = 0, high = a.length) {
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
  // key is not there but would be inserted at low, so
  return low;
};



