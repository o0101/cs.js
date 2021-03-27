// i like this because i saw the solution in my head in about 5 seconds

console.log(sumGap([3, 7, 1, 2, 8, 4, 5]));

function sumGap(arr) {
  // + 1 because 1 number is missing, 
  // and there will be numbers 1...n present (less that missing guy)
  const n = arr.length + 1;
  const targetSum = (n**2 + n)/2; // this is the equation for a serial sum
  const actualSum = arr.reduce((S,v) => S + v, 0); 
  return targetSum - actualSum;
}
