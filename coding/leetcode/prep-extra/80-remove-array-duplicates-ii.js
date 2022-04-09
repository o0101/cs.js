/**
 * @param {number[]} nums
 * @return {number}
 */
const DEBUG = true;
var removeDuplicates = function(nums) {
  const DUPS = 2;
  let newLength = nums.length; 
  DEBUG && console.log({originalLength: newLength});
  let runCount = 1;
  let lastVal;
  /* <= nums.length means we go 1 more run, and since arr[nums.length] is undefined and 
    therefore !== lastVal we are guarunteed to run runCount > DUPS if that applies
    this means we don't need to put that check again after the loop
  */
  for( let i = 0; i <= Math.min(newLength, nums.length); i++ ) {
    const val = nums[i];
    if ( i < nums.length && val === lastVal ) {
      runCount++;
      lastVal = val;
    } else if ( runCount > DUPS ) {
      let slideBy = runCount - DUPS;
      newLength -= slideBy;
      const newHead = i - slideBy;
      DEBUG && console.log({beforeSlide: nums, newHead, slideBy});
      while(slideBy--) {
        slideTailLeft(nums, newHead);
      }
      runCount = 1;
      lastVal = nums[newHead];
      DEBUG && console.log({afterSlide:nums, lastVal});
      i = newHead; // because it will ++ in the top for loop block
    } else {
      lastVal = val;
      runCount = 1;
    }
  }

  DEBUG && console.log({nums, newLength});

  return newLength;
};

const T = [
  removeDuplicates([1,1,1,1,1]),
  removeDuplicates([0,0,0,0,0]),
  /*
  removeDuplicates([1,1,1,2,2,3]),
  removeDuplicates([0,0,1,1,1,1,2,3,3]),
  removeDuplicates([0]),
  removeDuplicates([1,1]),
  removeDuplicates([1,1,1]),
  removeDuplicates([1,1,1,1]),
  removeDuplicates([1,1,1,2]),
  removeDuplicates([2,1,1,1]),
  removeDuplicates([2,1,1]),
  removeDuplicates([1,2]),
  */
];
console.log(T);

/*
const U = [
  slideTailLeft([1,2,3,4,5,6,7,8], 0),
  slideTailLeft([1,2,3,4,5,6,7,8], 1),
  slideTailLeft([1,2,3,4,5,6,7,8], 2),
  slideTailLeft([1,2,3,4,5,6,7,8], 3),
  slideTailLeft([1,2,3,4,5,6,7,8], 4),
  slideTailLeft([1,2,3,4,5,6,7,8], 5),
];
console.log(U);
*/

function slideTailLeft(arr, onto) {		
  let from = onto;
  while(swapHeadRight(arr, from)) {
    from++;
  }
  return arr;
}

function swapHeadRight(arr, from) {
  if ( from >= arr.length - 1 ) {
    return false;
  }

  const next = from+1;
  const valNext = arr[next];
  arr[next] = arr[from];
  arr[from] = valNext;
  return true;
}
