/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let len = nums.length;
  for( let i = 0; i < len; i++ ) {
    if ( nums[i] === nums[i+1] ) {
      len--;
      nums.splice(i,1);
      i--;
    }
  }
  return len;
};
