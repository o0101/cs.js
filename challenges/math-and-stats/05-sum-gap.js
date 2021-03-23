// i like this because i saw the solution in my head in about 5 seconds

function sumGap(arr) {
  const n = arr.length;
  const targetSum = (n**2 + n)/2;
  const actualSum = arr.reduce((S,v) => S + v, 0);
  return targetSum - actualSum;
}
