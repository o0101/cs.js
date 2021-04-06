var threeSumClosest = function(nums, target) {
  return _3sum(nums,target); 
};

function _3sum(N, target = 0) {
  if ( !N || !N.length ) return 0; 
  
  let minDist = Infinity;
  let minSum = 0;
  
  N.sort((a,b) => a-b);
  
  for(let i = 0; i < N.length - 2;i++) {
    while(N[i] === N[i-1] ) i++; 
    let j = i+1;
    let k = N.length - 1;
    while(j<k) {
      // at this point we have a unique i,j,k
      const sum = N[i] + N[j] + N[k];
      if ( sum === target ) {
        return target;
      } else {
        const dist = Math.abs(sum-target);
        if ( dist <= minDist ) {
          minDist = dist;
          minSum = sum;
        }
      }
      if ( sum > target ) {
        if(N[k] === N[k-1]) {
          while(N[k] === N[k-1])k--;
        } else {
          k--;
        }
      } else {
        if(N[j] === N[j+1]) {
          while(N[j] === N[j+1])j++;
        } else {
          j++;
        }
      }
    }
  }
  return minSum;
}
