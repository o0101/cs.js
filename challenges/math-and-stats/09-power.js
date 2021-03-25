const EVEN = 0;
const ODD = 1;

// my solution
// doesn't work because you can't do it from this end
let exp = function exp(a, b) {
  if ( b === 0 ) return 1;
  let k = b;
  let n = 1;

  while(k > 0) {
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
console.log(exp(2,5));
console.log(exp(3,3));
console.log(exp(5,4));

// my alternate solution start with MSB
exp = function exp(a, b) {
  let k = Math.abs(b).toString(2).split('');

  let n = 1;
  let x = 0;

  for( const unit of k ) {
    const type = parseInt(unit);
    switch(type) {
      case ODD:
        n = n * n;
        n = n * a;
        x *= 2;
        x += 1;
        break;
      case EVEN:
        n = n * n;
        x *= 2;
        break;
    }
  }

  //console.log({x});
  return b > 0 ? n : 1/n;
}

console.log(exp(2,10));
console.log(exp(2,5));
console.log(exp(3,3));
console.log(exp(5,4));

// their solution (rather my original solution updated to be recursive to match theirs)
// and to work
exp = function(a, b) {
  if ( b === 0 ) return 1;

   

  return n;
}

function rec(a, b) {

}
