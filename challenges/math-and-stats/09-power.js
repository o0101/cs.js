const EVEN = 0;
const ODD = 1;
// my solution
let exp = function exp(a, b) {
  if ( b === 0 ) return 1;
  let k = b;
  let n = a;
  while(k > 1) {
    const type = k % 2; // k & 1
    switch(type) {
      case ODD:
        k = k - 1;
        k = k / 2;
        n = n * n;
        n = n * a;
        break;
      case EVEN:
        k = k / 2;
        n = n * n;
        break;
    }
  }

  return n;
}

console.log(exp(2,10));
console.log(exp(3,3));
console.log(exp(5,4));

// alternate, note that relative to the divide and subtract method
// reading the bits goes from LSB to MSB
exp = function exp(a, b) {
  let k = b.toString(2).split('').reverse();

  // ignore the last item as it will always be 1
  // unless b is zero in which type
  if ( k.pop() === 0 ) return 1; 

  let n = a;
  for( const unit of k ) {
    const type = parseInt(unit);
    switch(type) {
      case ODD:
        k = k - 1;
        k = k / 2;
        n = n * n;
        n = n * a;
        break;
      case EVEN:
        k = k / 2;
        n = n * n;
        break;
    }
  }

  return n;
}

console.log(exp(2,10));
console.log(exp(3,3));
console.log(exp(5,4));

// their solution
exp = function(a, b) {

}
