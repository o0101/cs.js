var isPalindrome = function(x) {
  if ( Math.sign(x) < 0 ) return false;
  if ( x >= 0 && x < 10 ) return true;
  
  const str = x.toString();
  return str === Array.from(str).reverse().join('');
};

isPalindrome = function(x) {
  if ( x < 0 ) return false;
  let n = x;
  let m = 0;
  while(n) {
    const r = n % 10; 
    n = (n-r)/10;
    m *= 10;
    m += r;
  }
 
  //console.log(m,x);
  return x === m;
}
