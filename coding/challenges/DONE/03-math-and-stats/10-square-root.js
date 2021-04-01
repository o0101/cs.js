// my solution
let sqroot = function sqroot(a) {
  let steps = 0;
  let low = 0;
  let high = 1 + a/2;
  let mid = (low+high)/2;

  while(Math.abs(a/mid - mid) > Number.EPSILON) {
    steps += 1;
    if ( a/mid > mid ) {
      low = mid; 
      high = a/mid;
    } else {
      low = a/mid;
      high = mid;
    }
    mid = (low+high)/2;
  }

  console.log(`Found sqrt ${a} in ${steps} steps: ${mid}`);

  return mid;
}

var arr = [16,17,2.25];
for(i in arr)
  console.log("Square root of", arr[i] , "is", sqroot(arr[i]));

// their solution O(n)
sqroot = function sqroot(a) {
  let steps = 0;
  let low = 0;
  let high = 1 + a/2;
  let mid = (low+high)/2;

  while(low < high) {
    const test = (mid*mid - a);
    if ( test > Number.EPSILON ) {
      high = mid;
    } else if ( test < -Number.EPSILON ) {
      low = mid;
    } else {
      console.log(`Found sqrt ${a} in ${steps} steps: ${mid}`);
      return mid;
    }
    mid = (low+high)/2;
    steps += 1;
  }

  return -1;
}

for(i in arr)
  console.log("Square root of", arr[i] , "is", sqroot(arr[i]));
