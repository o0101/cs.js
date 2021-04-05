var maxArea = function(height) {
  if ( height.length === 2 ) {
    return Math.min(...height);
  } 
  let l = 0;
  let r = height.length - 1;
  let maxArea = 0;
  let currentArea = keyFunction(pos(l),pos(r));
  while(l<r) {
    const currentArea = keyFunction(pos(l),pos(r));
    
    if ( currentArea > maxArea ) {
      maxArea = currentArea;
    }
    if ( height[l] > height[r] ) {
      r--;
    } else {
      l++;
    }
    
  }
  
  return maxArea;
  
  function pos(i) {
    return [i, height[i]];
  }
};

function keyFunction([i1,a1],[i2,a2]) {
  return Math.min(a1,a2) * Math.abs(i2-i1); 
}

