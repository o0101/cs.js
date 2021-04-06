const L = {
  2: 'abc' ,
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
}
var letterCombinations = function(digits) {
  digits = digits.replace(/1/g, '');
  if ( digits.length === 0 ) {
    return []
  }
  
  let result = [];
  
  for( let i = 0; i < digits.length; i++ ) {
    const d = digits[i];
    const l = L[d].split('');
    if ( result.length === 0 ) {
      result.push(...l);
    } else {
      result = result.reduce(
        (R,p) => {
          R.push(...l.map(c => p+c));
          return R;
        }, []
      );
    }
  }
  
  return result;
};
