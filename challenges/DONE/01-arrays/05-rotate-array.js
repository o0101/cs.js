{
  // My first solution
  // My solution to this was not taking into account (as I hadn't read that far into the challenge), nor thinking about, the running time (but I did consider space and achieved an O(1) space solution, that was nevertheless O(nk) where k is the rotate radius.
  // My initial solution was, perform swaps along length of array. If you swap adjacently, and start from left, it's like you rotated array to the left. If you do same from right, it's like you rotated from right. But the issue is, these rotations are only 1 place. You can probably scale this up to do a sequence of k-width swaps, to end up with rotation by k (I just thought of that now) but there's a simpler solution that also uses O(1) space. 

  // O(nk) time, O(1) space
  let rotateArray = function(arr, k) {
    const swap = k > 0 ? swapToLeft : swapToRight;
    const ends = [arr.length - 1, 0];
    const [start, stop] = k > 0 ? ends : ends.reverse();
    const step = -Math.sign(k);
    let iterations = Math.abs(k)%arr.length;

    while(iterations--) {
      for( let i = start; i != stop; i += step ) {
        swap(arr, i); 
      }
    }

    return {arr, k};
  };

  //console.log(rotateArray([1,2,3,4,5], -2));
  //console.log(rotateArray([1,2,3,4,5], +2));
  //console.log(rotateArray([1,2,3,4,5], 5));

  function swapToRight(arr, i) {
    if ( i < arr.length - 1 ) {
      const temp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = temp;
    }
  }

  function swapToLeft(arr, i) {
    if ( i > 0 ) {
      const temp = arr[i];
      arr[i] = arr[i-1];
      arr[i-1] = temp;
    }
  }
}

{
  // My second solution is O(n) and O(1)
  // I call it jumping
  // This was not an easy solution. I couldn't get it to work.
  // Probably if I worked through small examples on paper it would be OK
  let rotateArray = function(arr, k) {
    const len = arr.length;
    const end = len - 1;
    if ( end === 0 ) return;

    k = k % len;

    if ( k === 0 ) return;

    const startIndex = 0 - k;
    let sourceIndex = startIndex;
    if ( sourceIndex < 0 ) {
      sourceIndex += len;
    }
    let destIndex = 0;
    let temp;
    let sourceItem = arr[sourceIndex];
    let destItem = arr[destIndex];

    while( destIndex !== end ) {
      // save the dest item to jump it
      temp = destItem; 

      // shift the source to dest
      arr[destIndex] = sourceItem;

      // update indices
      sourceIndex = destIndex;
      destIndex += k;
      destIndex %= len;
      if ( destIndex < 0 ) {
        destIndex += len;
      }
      sourceItem = temp; 
      destItem = arr[destIndex];
    }

    arr[destIndex] = temp;

    return {arr, k};
  }

  //console.log(rotateArray([1,2,3,4,5], -2));
  //console.log(rotateArray([1,2,3,4,5], +2));
  //console.log(rotateArray([1,2,3,4,5], 5));
}

{
  // My third solution is implementing the reverse solution
  function reverseArray(arr, start, end) {
    while(start < end) {
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }

  // Interesting here that the order of the rotations
  // with respect to the whole rotation and the part rotations
  // matters by changing the sign of the rotation direction
  // if I rotate whole array last, then a -2 rotation is actually -2 to the right
  // if I rotate whole array first, then a -2 rotation is actually -2 to the left
  let rotateArray = function(arr, k) {
    const n = k;
    const len = arr.length;

    k %= len;

    if ( k < 0 ) {
      k += len;
    }

    if ( len === 0 || k === 0 ) return;

    reverseArray(arr, 0, len - 1);
    reverseArray(arr, 0, k - 1);
    reverseArray(arr, k, len - 1);

    return {arr, n};
  }

  console.log(rotateArray([1,2,3,4,5], -2));
  console.log(rotateArray([1,2,3,4,5], +2));
  console.log(rotateArray([1,2,3,4,5], 5));
}
