var fourSum = function(N, target) {
  const result = [];
  N.sort((a,b) => a-b);
  for(let i = 0; i < N.length - 3; i++ ) {
    const val = N[i];
    const comp = target - val;
    const compSums = threeSum(N, comp, i+1);
    const results = compSums.map(s => [...s, val]);
    if ( results.length ) {
      while(N[i] === N[i+1]) i++;  
      result.push(...results);
    }
  }
  return result; 
};

function threeSum(N, target, start = 0) {
  if ( !N || !N.length ) return [];

  const result = [];
  if ( start === 0 ) {
    N.sort((a,b) => a-b);
  }

  for(let i = start; i < N.length - 2;i++) {
    let j = i+1;
    let k = N.length - 1;
    // Q: could I replace N[i] and its loop here with a set lookup?
    // like comp = target - (N[j] + N[j])
    // if ( set.has(comp) ) // OK!
    // maybe but not sure if the j k stepping will still work
    // if so that would make 3 sum essentially linear time or n log n rather than
    // n**2
    while(j<k) {
      // at this point we have a unique i,j,k and
      // we will not repeat N x i,j,k
      const sum = N[i] + N[j] + N[k];
      if ( sum === target ) {
        result.push([N[i], N[j], N[k]]);
        while(N[j] === N[j+1])j++;
        while(N[k] === N[k-1])k--;
        while(N[i] === N[i+1]) i++;  
      }
      if ( sum > target ) {
        k--;
      } else {
        j++;
      }
    }
  }
  return result;
}

