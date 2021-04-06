const J = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
}
var romanToInt = function(s) {
  // read it backward
  // it needs to increase
  // if it decreases
  // subtract it
  let lastVal = -Infinity;
  let n = 0;
  const r = Array.from(s).reverse().join('');
  for(const u of r) {
    const val = J[u];
    if ( val >= lastVal ) {
      n += val;
    } else {
      n -= val;
    }
    lastVal = val;
  }
  return n;
};
