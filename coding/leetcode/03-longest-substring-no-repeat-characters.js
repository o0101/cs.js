var lengthOfLongestSubstring = function(s = '') {
  // a valid substring can become invalid with the addition
  // of a character that has already occured in it
  // in that case you move the start index of the substring
  // to one after the *last* occurrence of that character
  // in addition, on each new character you record
  // its position in the table
  // you can ignore any last positions that are less than the start
  // position of the substring
  
  // handle trivial edge-cases
  if (s.length < 2) {
    return s.length;
  }
  
  const map = new Map();
  let start = 0;
  let maxLength = 0;
  let curr = 0;
  
  while(curr < s.length) {
    const char = s[curr];
    
    if ( map.has(char) ) {
      const latestCharPosition = map.get(char);
      if ( latestCharPosition >= start ) {
        start = latestCharPosition + 1;
      }
    }
    
    const currentLength = curr - start + 1;
    if ( currentLength >= maxLength ) {
      maxLength = currentLength;
    }
    
    map.set(char, curr);
    
    curr++;
  }
  
  return maxLength;
};
