console.log(allPermutations('bad'));

function allPermutations(str) {
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

  return ps;
}
