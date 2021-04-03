var reverse = function(x) {
  const min = -(2**31);
  const max = 2**31 - 1;
  
  const sign = Math.sign(x);
  x = Math.abs(x);
  
  const x10 = x.toString();
  const x10rev = Array.from(x10).reverse().join('');
  
  const val = sign*parseInt(x10rev);
  if ( val < min || val > max ) {
    return 0;
  }
  return val
};
