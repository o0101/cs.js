function(s, numRows) {
  if ( s.length < 2 || numRows < 2 ) return s;
	
  const X = {val:0};
  const Y = {val:0};
  const coords = [X,Y]; 
  const cycle = numRows - 1;
  const map = {};
  let newS = '';
  let maxX = 0;
  
  let i = 0;
  while( i < s.length ) {
    const rem = i % cycle;
    const quot = (i - rem)/cycle;
    map[`${X.val},${Y.val}`] = s[i];
    if ( quot % 2 === 0 ) {
      X.val += 0;
      Y.val += 1;
    } else {
      X.val += 1;  
      if ( X.val > maxX ) {
        maxX = X.val;
      }
      Y.val -= 1;
    }
    i++;
  }
  
	//console.log(map);
  
  for(let i = 0; i < numRows; i++ ) {
    for( let j = 0; j <= maxX; j++ ) {
      const key = `${j},${i}`
      if ( map[key] ) {
        newS += map[key];
      }
    }
  }
  
  return newS;
};
