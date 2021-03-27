
// this is my solution I came up with after thinking about it and writing some 
// examples by hand
let subsets = function allSubsets(v, sets = []) {
  v.sort((a,b) => Math.sign(a-b));
  const n = v.length; 
  const limit = 2**n;

  for( let i = 0; i < limit; i++ ) {
    const x = i.toString(2).padStart(n,'0').split('');
    x.reverse();
    console.log(x);
    const set = v.filter((_,j) => x[j] === '1');
    sets.push(set);
  }

  return sets;
}

console.log(subsets((process.argv[2] || '2,5,7').split(',').map(x => parseInt(x))));

// this is based on their official solution
subsets = function allSubsets(v, sets = []) {

  return sets;
}
//console.log(subsets((process.argv[2] || '2,5,7').split(',').map(x => parseInt(x))));
