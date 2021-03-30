const DEBUG = true;
let palindromes = function palindromes(s) {
  // 1. create all n prefix suffix pairs O(n)
  // 2. for each pair, check the two basic cases
  // left.end == right.start || left.end === right[1]
  // if ( either basic case matches, keep extending )
  // O(n**2)

  let p = 0;

  for( let i = 1; i < s.length; i++ ) {
    const Left = i-1;
    const Right = i;
    const Next = i+1;

    if ( s[Left] === s[Right] ) {
      DEBUG && console.log(s.slice(Left,Right+1));
      p += 1;
      let left = Left-1;
      let right = Right+1;
      while(left >= 0 && right < s.length) {
        if ( s[left] !== s[right] ) {
          break;
        }
        DEBUG && console.log(s.slice(left,right+1));
        p += 1;
        left--;
        right++;
      }
    }
    if ( s[Left] === s[Next] ) {
      DEBUG && console.log(s.slice(Left,Next+1));
      p += 1;
      let left = Left-1;
      let right = Next+1;
      while(left >= 0 && right < s.length) {
        if ( s[left] !== s[right] ) {
          break;
        }
        DEBUG && console.log(s.slice(left,right+1));
        p += 1;
        left--;
        right++;
      }
    }
  }

  return p;
}

console.log(palindromes(process.argv[2] || 'aabbaa'));
