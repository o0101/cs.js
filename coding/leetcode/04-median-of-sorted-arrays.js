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
  const N = a1.length + a2.length;
  const A = [a1,a2];
  const offset = [
    10000000,
    20000000
  ];
  const guess = {
    arrIndex: a1.length > a2.length ? 0 : 1,
    bounds: [{
      low: 0,
      high: a1.length - 1
    }, {
      low: 0,
      high: a2.length - 1
    }],
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
  let guessArray = A[guess.arrIndex];
  let otherArray = A[(guess.arrIndex+1)%2];
  guess.index = Math.min(guessArray.length-1, Math.max(0,index-(otherArray.length)));
  guess.val = guessArray[guess.index];
  guess.otherArrayIndex = binarySearch(otherArray, guess.val, offset[guess.arrIndex]);
  guess.sortedIndex = guess.index + guess.otherArrayIndex;

  while(index !== guess.sortedIndex) {
    // update guess
    if ( guess.sortedIndex > index ) {
      guess.bounds[guess.arrIndex].high = Math.max(guess.index-1,0);
    } else {
      guess.bounds[guess.arrIndex].low = Math.min(guess.index+1,guessArray.length-1);
    }
    guess.arrIndex = (guess.arrIndex + 1) % 2;
    guess.index = Math.floor((guess.bounds[guess.arrIndex].low+guess.bounds[guess.arrIndex].high)/2);

    ([guessArray, otherArray] = [otherArray, guessArray])

    guess.val = guessArray[guess.index]+guess.index+offset[guess.arrIndex]+1;
    guess.otherArrayIndex = binarySearch(otherArray, guess.val, guess.index+offset[guess.arrIndex]+1);
    guess.sortedIndex = guess.index + guess.otherArrayIndex;
    console.log({guess,index,a1,a2})
  }
  //console.log({guess,index})

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

//console.log(med([0,1,2,3,4]));
//console.log(med([0,1,2,3,4,5]));

console.log(medianOfSorted([1,2,3],[4,5,6,7,8,9]));
console.log(medianOfSorted([1,4,8],[2,3,5,6,7,9]));
console.log(medianOfSorted([1,4,8,11],[2,3,5,6,7,9]));
console.log(medianOfSorted([1,2,3],[0]));
console.log(medianOfSorted([],[0]));
console.log(medianOfSorted([0],[0]));
console.log(medianOfSorted([1,2],[1,2]));
console.log(medianOfSorted([2,2,4,4],[2,2,4,4]));

// return the insert position of key even if it's not in array
function binarySearch(a, key, offset = 0) {
  console.log(offset);
  let low = 0;
  let high = a.length;
  // Note on the condition:
    // <= is important as <
    // will only handle down to cases where subarray a[low..high] is length 2
    // but subarray of length 1 can only be handled by <=
  while( low <= high ) {
    const mid = (low+high)>>1;
    const midKey = a[mid]+mid+offset;
    if ( midKey < (key+mid+offset) ) {
      low = mid + 1;
    } else if ( midKey > (key+mid+offset) ) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  // key is not there but would be inserted at low, so
  return low;
};



