/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const table = {};

var combinationSum2 = function(c, t) {
  const key = `${t},${c.join(',')}`;
  if ( table[key]) return clone(table[key]);
  const C = c.length;
  c = c.map(n => parseInt(n));
  c.sort((a,b) => b-a); // decreasing order
  const m = [];
  const P = [];
  let i = 0;
  while(i < C) {
    const sum = [];
    let N = t;
    let j = i;
    let lastPart;
    while(j < C) {
      const part = c[j];
      if(part <= N) {
        N -= part;
        sum.push(part);
        if ( part != lastPart ) {
          m.push(...combinationSum2(c.slice(j+1), N).map(x => (x.push(...sum), x)));
        }
      }
      lastPart = part;
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
  table[key] = clone(result);
  return result;
};

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}


