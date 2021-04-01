
// this is my solution I came up with after thinking about it and writing some 
// examples by hand
let permute = function allPermutations(str) {
  const ps = [];
  if ( str.length === 0 ) return ps;

  const values = str.split();
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

// the following is a recursive solution inspired by theirs
// but this is MY OWN recursive solution that I understand
// I think my algorithm is nearter and more literate and easier to reason about 
// and understand (GOOD! very GOOD!)
permute = function allPermutations(str) {
  if ( str.length < 3 ) {
    if ( str.length === 1 ) {
      return [str];
    } else if ( str.length === 2 ) {
      const a = str[0];
      const b = str[1];
      return [a+b, b+a];
    } else {
      return [];
    }
  } else {
    const ps = [];
    const vals = str.split();
    for( let i = 0; i < vals.length; i++ ) {
      const char = vals[i];
      let tail = vals.slice(0);
      tail.splice(i,1);
      tail = tail.join('');
      const charHeadPermutations = allPermutations(tail).map(p => char + p);
      ps.push(...charHeadPermutations);
    }
    return ps;
  }
}
console.log(permute(process.argv[2] || 'bad'));

// note: i want to go back later and implement a solution based on their official solution
// so i can understand it

// the following is a solution more directly related to theirs
// but I think their algorithm is more elegant because it uses the concept
// of "swap" to go all the way down and handle the base case and the general case

// OK I got it
// It's basically the same as mine but using swaps instead of splicing
permute = function allPermutations(str, i = 0, result = []) {
  if ( i === str.length - 1 ) {
    result.push(str.slice());
  } else {
    for( let j = i; j < str.length; j++ ) {
      const permutedInput = swap(str, i, j);
      allPermutations(permutedInput, i + 1, result);
    }
  }
  return result; 
}

function swap(str, i, j) {
  let permutedInput = str.slice();

  if ( i < j ) {
    ([i, j] = [j, i]);
  }
  if ( i > j ) {
    const charCI = str[j];
    const charI = str[i];
    permutedInput = str.slice(0, j) + charI +
      str.slice(j + charI.length, i) + charCI + str.slice(i + charCI.length); 
  }

  return permutedInput;
}

console.log(permute(process.argv[2] || 'bad'));

// so for example if I re-implement mine with swaps
// then it gives the exact same values as the above algorithm 
// that uses swaps
permute = function allPermutations(str) {
  if ( str.length < 3 ) {
    if ( str.length === 1 ) {
      return [str];
    } else if ( str.length === 2 ) {
      const a = str[0];
      const b = str[1];
      return [a+b, b+a];
    } else {
      return [];
    }
  } else {
    const ps = [];
    const vals = str.split();
    for( let i = 0; i < vals.length; i++ ) {
      const char = vals[i];
      const permutedInput = swap(str,0,i);
      const tail = permutedInput.slice(1);
      const charHeadPermutations = allPermutations(tail).map(p => char + p);
      ps.push(...charHeadPermutations);
    }
    return ps;
  }
}
console.log(permute(process.argv[2] || 'bad'));
