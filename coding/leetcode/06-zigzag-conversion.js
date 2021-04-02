// below was my first solution
let zigzag = function zigzag(s, numRows) {
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

console.log(zigzag("PAYPALISHIRING",3));

// it was OK. But the iterating over all possible grid points
// made it slow
// I then realized I could simply sort by y-coord first, then by x-coord
// to get correct order

zigzag = function zigzag(s, numRows) {
	if ( s.length < 2 || numRows < 2 ) return s;

	const X = {val:0};
	const Y = {val:0};
	const coords = [X,Y]; 
	const cycle = numRows - 1;
	const list = [];
	let newS = '';
	let maxX = 0;
	
	let i = 0;
	while( i < s.length ) {
		const rem = i % cycle;
		const quot = (i - rem)/cycle;
		list.push([X.val,Y.val,s[i]]);
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
	
	list.sort(([a1,b1],[a2,b2]) => b2 === b1 ? Math.sign(a1-a2) : Math.sign(b1-b2));
	
	return list.map(([,,c]) => c).join('');
}

console.log(zigzag("PAYPALISHIRING",3));
