/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const MAX = 2**31 - 1;
const MIN = -(2**31);
const err = 2**31 - 1;
var divide = function(dividend, divisor) {
  const rawSign = Math.sign(dividend) + Math.sign(divisor);
  // 0 is when signs are opposite, so result sign will be -1
  // otherwise result sign is 1
  const sign = rawSign === 0 ? -1 : 1;
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);
  
  if ( sign > 0 ) {
    if ( divisor === 1 ) return bound(dividend);
    return recDivide(dividend, divisor);
  } else {
    if ( divisor === 1 ) return bound(-dividend);
    return -recDivide(dividend, divisor);
  }
}

function recDivide(dividend, divisor) {
  //console.log(`Arriving: ${dividend}, ${divisor}`);
  if ( divisor === 1) return dividend;
  if ( dividend === 0 ) return 0;
  if ( dividend < divisor ) return 0;
  let N = dividend; 
  let r = divisor;
  let q = 1;
  while((r+r) <= N) {
    r += r;   
    q += q;
  }
  
  if ( r < N ) {
    //console.log(`Going down: ${r}, ${dividend-r}`);
    return bound(q + recDivide(dividend - r, divisor));
  } 
  return bound(q);
};

function bound(n) {
  if ( n > MAX || n < MIN ) {
    return err;
  }
  return n;
}

