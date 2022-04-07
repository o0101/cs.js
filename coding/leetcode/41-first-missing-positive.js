var firstMissingPositive = function(nums) {
  const Empty = -Infinity;
  const N = nums.length;
  for( let i = 0; i < N; i++ ) {
    while(true) {
      let num = nums[i];
      if ( num === Empty || num > N || num < 1 ) {
        nums[i] = Empty;
        break;
      } else if ( i+1 !== num && nums[num-1] !== num ) {
        swap(nums, i, num-1); // put num into that position 
        //console.log(i, num, nums);
      } else {
        // do nothing
        break;
      }
    }
  }
  for( let i = 0; i < N; i++ ) {
    let num = nums[i];
    if ( num !== (i + 1) ) {
      nums[i] = Empty;
    }
    if ( nums[i] === Empty ) {
      //console.log(nums);
      return i+1
    }
  }
  //console.log(nums);
  return N+1;
};

function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

const T = [
  firstMissingPositive([1,2,0]),
  firstMissingPositive([3,4,-1,1]),
  firstMissingPositive([7,8,9,11,12]),
  firstMissingPositive([1,1]),
  firstMissingPositive([2,1]),
  firstMissingPositive([500, 499, 8, 7, 6, 5, 4, 3, 2, 1]),
  firstMissingPositive([-3,9,16,4,5,16,-4,9,26,2,1,19,-1,25,7,22,2,-7,14,2,5,-6,1,17,3,24,-4,17,15])
];
console.log(T);
