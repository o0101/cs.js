/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  let jumps = 0;
  let previousReach = 0;
  let reach = 0;
	for( let i = 0; i < nums.length; i++ ) {
    reach = Math.max(reach, nums[i] + i); 
    if ( i > previousReach ) {
      previousReach = reach; 
      jumps++;
    }
	}   
  return jumps;
};
