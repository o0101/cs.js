let moveZerosToLeft = function(A) {
  const zeroCount = 0;
  let write = A.length - 1;
  for( let i = A.length - 1; i >= 0; i-- ) {
    const item = A[i];
    if ( item === 0 ) {
      if ( write === A.length - 1 ) {
        write = i;
      }
    } else {
      A[write] = item;
      write--;
    }
  }
  while(write >= 0) {
    A[write] = 0;
    write--;
  }
};
