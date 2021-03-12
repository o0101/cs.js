// Once you see it
// This is easy because
// there are only val ways that two numbers can sum to val, ignoring order
let findSumOfTwo = function(A, val) {
  const a = new Set(A);
  let i = val;
  while(i) {
    const [x, y] = [i, val - i];
    if ( a.has(x) && a.has(y) ) {
      return true;
    }
    i--;
  }
  return false;
};

// the above works but only for positive integers
// a better (more general) algorithm with the same running time
findSumOfTwo = function(A, val) {
  const a = new Set(A);
  for( const item of A ) {
    const comp = val - item;
    if ( a.has(comp) ) {
      return true;
    }
  }
  return false;
}
