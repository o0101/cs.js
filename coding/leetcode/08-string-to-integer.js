var myAtoi = function(s) {
  s = s.replace(/^\s+/,'');
  let sign = s[0] === '+' ? 1 : 
    s[0] === '-' ? -1 : 0;
  if ( sign !== 0 ) {
    s = s.slice(1); 
  }  else {
    sign = 1;
  }
  s = s.replace(/^0/,'');
  try {
    const digits = s.match(/^\d+/)[0]
    const val = sign*parseInt(digits);
    if ( Number.isNaN(val) ) {
       return 0;
    } else if ( val < -(2**31) ) {
      return -(2**31);
    } else if ( val > (2**31-1) ) {
      return 2**31 - 1;
    } 
    return val;
  } catch {
    return 0;
  }
};
