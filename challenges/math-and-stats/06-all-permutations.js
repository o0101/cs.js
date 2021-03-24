
// this is my solution I came up with after thinking about it and writing some 
// examples by hand
let permute = function allPermutations(str) {
  const ps = [];
  if ( str.length === 0 ) return ps;

  const values = str.split('');
  const n = values.length;
  const indices = Array(n).fill(0);

  permute: while(true) {
    // create permutation from indices
      const source = values.slice();
      let p = '';
      let i = 0;
      while(source.length) {
        p += source.splice(indices[i], 1); 
        i++;
      }
      ps.push(p);

    // update indices with carry
    let current = n-1;
    update: while(current >= 0) {
      indices[current] += 1;

      // if we need to carry
      if ( indices[current] === n-current ) {
        indices[current] = 0;

        if ( current === 0 ) {
          break permute;
        }

        current--;
      } else break update;
    }
  }

  console.log(ps.join('\n'));

  return ps;
}

console.log(permute(process.argv[2] || 'bad'));

// note: i want to go back later and implement a solution based on their official solution
// so i can understand it

permute = function allPermutations(str) {

}
console.log(permute(process.argv[2] || 'bad'));
