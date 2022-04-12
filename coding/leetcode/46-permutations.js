/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var combinations = function(nums) {
	const all = [];   
  const Unique = nums.length;
  const Order = Unique**Unique;
  for ( let i = 0; i < Order; i++ ) {
    const key = (i.toString(nums.length)).padStart(nums.length, '0');
    const next = Array.from(key).map(i => nums[parseInt(i)]);
    all.push(next);
  }
  return all;
};

var permuteUnique = function(nums) {
  const rows = f(nums.length);
  const all = new Array(rows);
  const indexes = nums.map((_,i) => i);
  const periods = indexes.map((_,i) => f(nums.length - i - 1));
  for( let i = 0; i < rows; i++ ) {
    let last = rows;
    indexes.forEach((v,j) => {
      const period = periods[j];
      const position = Math.floor((i % last)/period);
      indexes[j] = position;
      last = period;
    });
    const thisNums = Array.from(nums);
    const next = indexes.map(i => {
      //console.log(thisNums,i);
      const value = thisNums[i];
      thisNums.splice(i,1);
      return value;
    });
    all[i] = next;
  }
  //console.log(JSON.stringify(all));
  return all;
};

function f(n) {
  let s = 1;
  while(n > 0) {
    s *= n;
    n--;
  }
  return s;
}

const T = [
  permuteUnique([1,2,3]),
  permuteUnique([0,1]),
  permuteUnique([1]),
  permuteUnique([-10,-3,2,5,1,11,10]),
];

console.log(T);
