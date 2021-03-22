// This is not exactly O(logn) but is effectively if y is power-small relative to x
// But if y**2 > x then this is O(y)
let dividePure = function dividePure(x,y) {
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

console.log(dividePure(101,9));
console.log(dividePure(7,2));
console.log(dividePure(5,4));
console.log(dividePure(1,3));
console.log(dividePure(40,5));
console.log(dividePure(40,4));
console.log(dividePure(401231,4232));
console.log(dividePure(4002120000,432341));


// The second solution I created after seeing the hints about bitwise operators
// and understanding that my first solution is not O(log n) in cases where y is not small
// This is optimal. It's step count is basically less than or equal to the 
// number of bits in the result. Great!
// Also great I created this only with the hint about using bit operators and 
// seeing a shift instruction in the solution code, but without reading the code beyond a glance while 
// scrolling. I'm very happy with myself here.
dividePure = function dividePure(x,y) {
  console.log({x,y});
  if ( y === 0 ) return NaN;
  let yshift = 0;
  let shift = y;
  let lastShift;
  while(shift < x) {
    lastShift = shift;
    shift <<= 1;
    if ( shift < 0 ) {
      shift = lastShift;
      break;
    }
    yshift++;
  }
  if ( shift === x ) {
    console.log(`Divided in ${yshift} steps. ${x} / ${y} in base 2 is roughly ${Math.round((Math.log(x)-Math.log(y))/Math.log(2))}`);
    return 1<<yshift;
  }
  shift>>=1;
  yshift--;

  let sum = 0;
  let count = 0;
  let steps = 0;
  while((x - sum) > y) {
    steps++;
    //console.log({x,sum,shift,yshift,count,steps});
    if ((sum + shift) <= x ) {
      sum += shift;
      count += 1<<yshift;
    }
    if ((x - sum) < shift) {
      shift >>= 1;
      yshift--;
    }
    if ( yshift < 0 ) break;
  }

  console.log(`Divided in ${steps} steps. ${x} / ${y} in base 2 is roughly ${Math.round((Math.log(x)-Math.log(y))/Math.log(2))}`);

  return count;
}

console.log(dividePure(101,9));
console.log(dividePure(7,2));
console.log(dividePure(5,4));
console.log(dividePure(1,3));
console.log(dividePure(40,5));
console.log(dividePure(40,4));
console.log(dividePure(401231,4232));
console.log(dividePure(4002120000,432341));


// this is the official solution
// I'm including here because zeroing in via recursion is interesting
// But it doesn't handle the shift overflow like mine does :p ;) x
// and mine is way more efficient by like a factor of sqrt or 3x or something
dividePure = function(x, y, steps = 0) {
  const X = x;
  // We will return -1 if the
  // divisor is '0'.
  if (y == 0) {
    return -1;
  }

  if (x < y) {
    return 0;
  } else if (x == y) {
    return 1;
  } else if (y == 1) {
    return x;
  }

  let q = 1;
  let val = y;

  while (val < x) {
    //val <<= 1;
    // we can also use 'val = val + val;'
    val += val;
    //q <<= 1;
    // we can also use 'q = q + q;'
    q += q;
    steps += 1;
  }
  if (val > x) {
    val /= 2;
    q /= 2;
    console.log(`Divided ${X} by ${y} in ${steps} steps`);
    return q + dividePure(x - val, y, steps + 1);
  }	else {
    console.log(`Divided ${X} by ${y} in ${steps} steps`);
  }
  return q;
};


console.log(dividePure(101,9));
console.log(dividePure(7,2));
console.log(dividePure(5,4));
console.log(dividePure(1,3));
console.log(dividePure(40,5));
console.log(dividePure(40,4));
console.log(dividePure(401231,4232));
console.log(dividePure(4002120000,432341));

