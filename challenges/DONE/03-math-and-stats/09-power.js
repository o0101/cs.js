const EVEN = 0;
const ODD = 1;

// my solution
// doesn't work because you can't do it from this end
// doing these divisions and subtractions gets you the bit sequence in reverse order
// it's good for converting a number to binary
// but for this it doesn't work (unless you saved it reversed it then ran the second algorithm)
// but I can use it in the recursive (and that's what the people do)
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

console.log();
console.log("Power(0, 0) = " + exp(0,0));
console.log("Power(2, 5) = " + exp(2, 5));
console.log("Power(3, 4) = " + exp(3, 4));
console.log("Power(1.5, 3) = " + exp(1.5, 3));
console.log("Power(2, -2) = " + exp(2, -2));

// my alternate solution start with MSB
exp = function exp(a, b) {
  let k = Math.abs(b).toString(2).split();

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

console.log();
console.log("Power(0, 0) = " + exp(0,0));
console.log("Power(2, 5) = " + exp(2, 5));
console.log("Power(3, 4) = " + exp(3, 4));
console.log("Power(1.5, 3) = " + exp(1.5, 3));
console.log("Power(2, -2) = " + exp(2, -2));

// their solution (rather my original solution updated to be recursive to match theirs)
// and to work
exp = function(a, b) {
  let n = rec(a,Math.abs(b));
  
  if ( b < 0 ) {
    n = 1/n; 
  }

  return n;
}

function rec(a, b) {
  if ( b >= 2 ) {
    const type = b % 2;
    const val = rec(a, (b-type)/2);
    switch(type) {
      case EVEN:
        return val * val;
      case ODD:
        return val * val * a;
    }
  } else if ( b === 1 ) {
    return a; 
  } else {
    // this is elegant because it handles the definitional case x**0 === 1 nicely
    // but also incorporates it as a general part of the algorithm and provides
    // a nice "justification" algorithmically for the definition x**0 == 1
    return 1;
  }
}

console.log();
console.log("Power(0, 0) = " + exp(0,0));
console.log("Power(2, 5) = " + exp(2, 5));
console.log("Power(3, 4) = " + exp(3, 4));
console.log("Power(1.5, 3) = " + exp(1.5, 3));
console.log("Power(2, -2) = " + exp(2, -2));

/**

  The recursive is a little bit difficult to understand but it's like this

  to do it normally we need to run the bit representation from MSB to LSB
  we can get that if we have the bit representation.

  The reason is because when we deconstruction the number with division and substraction

  The last deconstruction we will do will be on the MSBs. So when we reconstruct that number

  or an effect of that number (raising something to a power the magnitude of that number)

  then we need to do not the LSB first, but we need to do first in the reconstruction the last thing
  we did in the deconstruction. 

  So to reconstruct it that means going to MSB first. 

  But we can't get MSB if we are deconstructing, we have to wait until we've done the whole thing.

  That's why recursive can do it in a "single pass" down then up.

  Because the base case, when the recusion terminates, will be the first calculation to be done

  And that will also be ocurring on the MSB (because that is the last thing to be deconstructed).

  That's all it is, then after reaching the MSB, the recursion bounces back up through each

  successive prior bit, and does the correct multiplication 

  (either squaring , or a product of squaring and the base)

  at the correct point. Because it got the bits in the LSB to MSB order going down via the recursive

  deconstruction and taking of moduli by 2

  And then it calculated in the MSB to LSB correct order going back up because MSB was the last thing

  to be reached in recursion, and LSB was where recursion started, so LSB will be the last thing

  returned to before the first recursive call completes.

  So going down we get LSB to MSB order to create the bit sequence via deconstruction

  and going back up we get MSB to LSB order allowing either a reconstruction of the number

  (quite useless since we already have it!) or a raising of a number to the power the magnitude of 

  that number. Pretty useful since via repeated squaring it is O(log(N)). Because

  in order to accurately reconstruct you have to do it in MSB to LSB order, and that's what we get on 

  the way back up in recursion.

  To demonstrate these concepts take a look at the bit representation code below.
**/

function recursiveRadixRep(n, r, s = '') {
  if ( n >= r ) {
    const unit = n % r;
    console.log(`LSB-first order`, unit);
    s = recursiveRadixRep((n-unit)/r, r, s) + s;
    console.log(`MSB-first order`, unit);
    s = s + unit + '';
    console.log({s});
    return s;
  } else {
    console.log(`Last recursion level`, n);
    return n + '';
  }
}

console.log(recursiveRadixRep(10,2));
console.log(10..toString(2));
console.log(recursiveRadixRep(1024,10));
console.log(1024..toString(10));
console.log(recursiveRadixRep(1024,2));
console.log(1024..toString(2));
console.log(recursiveRadixRep(1024,3));
console.log(1024..toString(3));
console.log(recursiveRadixRep(999,2));
console.log(999..toString(2));
console.log(recursiveRadixRep(81,2));
console.log(81..toString(2));
console.log(recursiveRadixRep(81,10));
console.log(81..toString(10));



