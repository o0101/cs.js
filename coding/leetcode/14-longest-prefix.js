var longestCommonPrefix = function(strs) {
  let lcp = '';
  let i = 0;
  if ( strs.length === 0 ) {
    return lcp;
  }
  advance: while(true) {
    let lastStrI = strs[0][i];
    for(const str of strs) {
      if (i < str.length && str[i] === lastStrI) {
        lastStrI = str[i];
        continue;
      } else {
        break advance;
      }
    }
    i++;
    lcp += lastStrI;
  }
  
  return lcp;
}; 
