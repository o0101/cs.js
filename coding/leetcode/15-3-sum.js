var threeSum = function(nums) {
  if ( nums.length < 3 ) {
    return [];
  }
  //nums.sort((a,b) => a-b);
  const results = new Set();
  const result = [];
  const map = new Map();
  let i = 0;
  for( const num of nums ) {
    let indexes = map.get(num);
    if ( ! indexes ) {
      indexes = new Set();
      map.set(num,indexes);
    }
    indexes.add(i);
    i++
  }
  
  i = 0;
  for( const num of nums ) {
    for( let j = i+1; j < nums.length; j++ ) {
      const num2 = nums[j]; 
      const comp = 0 - num - num2; 
      if ( map.has(comp) ) {
        const indexes = map.get(comp);
        const hasI = indexes.has(i);
        const hasJ = indexes.has(j);
        if ( hasI && hasJ && indexes.size <= 2 ) {
          
        } else if ( (hasI || hasJ) && indexes.size <= 1 ) {
                                                        
        } else {
          const triple = [num,num2,comp];
          triple.sort((a,b) => a-b);
          const key = triple.join(',');
          if ( !results.has(key) ) {
            result.push(triple);
            results.add(key);
          }
        }
      }
    }
    i++;
  }
  return result;
};

var threeSum = function(nums) {
    var res = [];
    if(!nums || !nums.length) return res;

    nums = nums.sort((a, b) => a - b);

    for(let i=0; i<nums.length - 2; i++){
        while(nums[i-1] === nums[i]) i++;
        
        let j=i+1, k=nums.length-1;
        while(j<k){
            let sum = nums[i] + nums[j] + nums[k];
            if(sum === 0){
                res.push([nums[i],nums[j],nums[k]]);
                while (nums[j] === nums[j + 1]) j++;
                while (nums[k] === nums[k-1]) k--;
            }
            //searching for -nums[i]
            if(sum > 0){
                k--;
            }else{
                j++;
            }            
        }
    }
    return res;
}

threeSum = function(N) {
  if ( !N || !N.length ) return [];
  
  const result = [];
  N.sort((a,b) => a-b);
  
  for(let i = 0; i < N.length - 2;i++) {
    while(N[i] === N[i-1] ) i++; 
    let j = i+1;
    let k = N.length - 1;
    while(j<k) {
      // at this point we have a unique i,j,k and 
      // we will not repeat N x i,j,k
      const sum = N[i] + N[j] + N[k];
      if ( sum === 0 ) {
        result.push([N[i], N[j], N[k]]); 
        while(N[j] === N[j+1])j++;
        while(N[k] === N[k-1])k--;
      }
      if ( sum > 0 ) {
        k--;
      } else {
        j++;
      }
    }
  }
  return result;
}
