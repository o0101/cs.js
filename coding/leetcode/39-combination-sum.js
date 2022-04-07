var combinationSum = comboSum;

function comboSumOriginal(c, t) {
  const C = c.length;
  c = c.map(n => parseInt(n));
  c.sort((a,b) => b-a); // decreasing order 
  const m = [];
  let i = 0;
  while(i < C) {
    const sum = [];
    let N = t;
    let j = i;
    while(j < C) {
      const part = c[j]; 
      while(part <= N) {
        N -= part;
        sum.push(part);
        m.push(...combinationSum(c.slice(j+1), N).map(x => (x.push(...sum), x)));
      }
      j++;
    }
    if ( N === 0 ) {
      m.push(sum);
    }
    i++;
  }
  const dup = new Set();
  m.forEach(x => x.sort());
  const result = m.filter(y => {
    const key = y.join(',');
    if ( !dup.has(key) ) {
      dup.add(key); 
      return true;
    }
    return false;
  });
  return result;
};

function cSum(t, c, i, S, s, A) {
  if ( S > t ) return; 
  if ( S === t ) {
    A.push(Array.from(s));
    return;
  }

  for( ; i < c.length; i++ ) {
    const C = c[i];
    s.push(C);
    S += C;
    cSum(t, c, i, S, s, A);
    s.pop();
    S -= C;
  }
}

function comboSum(c, t) {
  const A = [];
  const s = [];
  cSum(t, c, 0, 0, s, A);
  return A;
}



const T = [
  combinationSum([2], 1),
  combinationSum([2,3,5], 8),
  combinationSum([2,3,6,7], 7),
];

console.log(T);

