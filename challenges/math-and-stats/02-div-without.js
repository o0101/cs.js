console.log(dividePure(101,9));
console.log(dividePure(7,2));
console.log(dividePure(5,4));
console.log(dividePure(1,3));
console.log(dividePure(40,5));
console.log(dividePure(40,4));
console.log(dividePure(4002120000,432341));

// This is not exactly O(logn) but is effectively if y is power-small relative to x
// But if y**2 > x then this is O(y)
function dividePure(x,y) {
  // how many times does y raised give x?
  // basically subtractive polynomial representation of x using y
  // get the greatest power such that y to it is less than equal to x
  const power = Math.round(Math.log(x)/Math.log(y));
  const test = y**power > x;
  const exp = test ? power - 1 : power;
  const X = x;

  let k = exp;
  let count = 0;
  let i = 0;
  while(x) {
    console.log(`Step: ${i++}`);
    const pow = y**k;

    if ( x < y ) break;

    if ( x >= pow ) {
      // there are y**(k-1) y's inside y**k
      count += y**(k-1);
      x -= pow;
    } else {
      k--;
    }
  }

  console.log(`Divided in ${i} steps. ${X} in base ${y} is roughly ${exp}`);

  return count;
}

