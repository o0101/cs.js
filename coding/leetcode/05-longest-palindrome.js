console.log(longnol('ac'));
console.log(longnol('cbbd'));
console.log(longnol('babad'));
console.log(longnol('bb'));

function longnol(s) {
  if ( s.length === 0 ) return 0;

  let p = s[0];
  let maxLength = 1;

  for(let i = 0; i < (s.length - 1); i++ ){
    const left = s[i];
    const right = s[i+1];

    if ( left === right ) {
      let a = i;
      let b = i+1;
      while(a > 0 && b < s.length - 1) {
        if ( s[a-1] !== s[b+1] ) break;
        a--;
        b++;
      }
      const length = b - a + 1;
      if ( length > maxLength ) {
        maxLength = length;
        p = s.slice(a, b+1);
      }
    } 
    if ( i < (s.length - 2) ) {
      const next = s[i+2];
      if ( left === next ) {
        let a = i;
        let b = i+2;
        while(a > 0 && b < s.length - 1) {
          if ( s[a-1] !== s[b+1] ) break;
          a--;
          b++;
        }
        const length = b - a + 1;
        if ( length > maxLength ) {
          maxLength = length;
          p = s.slice(a, b+1);
        }
      }
    }
  }

  return p;
}


