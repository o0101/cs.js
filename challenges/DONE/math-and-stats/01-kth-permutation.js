let findKthPermutation = function findKthPermutation(v, k, result) {
  // v - values
  // result[0] is the permutation values joined
  const n = v.length;
  let i = n - 1;
  k--;

  result[0] = '';

  while(i >= 0) {
    //console.log({r:result[0], k, i});
    const blockSize = nbang(i);
    const blockIndex = Math.floor(k/blockSize);
    const indexInBlock = k%blockSize;
    result[0] += '' + v[blockIndex];
    v.splice(blockIndex,1);
    k = indexInBlock;
    i--;
    //console.log({r:result[0], k, blockSize, blockIndex, indexInBlock});
    //console.log();
  }

  return result[0];
};

const result = [];
findKthPermutation([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 8158, result);
console.log(result[0]);

function nbang(n) {
  let r = 1;
  let i = n;
  while(i) {
    r *= i;
    i--;
  }
  return r;
}
