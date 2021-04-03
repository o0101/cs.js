var isMatch = function(s, p) {
  s = Array.from(s);
  p = Array.from(p);
  return recIsMatch(s,p);
}

function recIsMatch(s, p) {
  // base case no conflict so is a match
  if ( s.length === 0 && p.length === 0 ) {
    return true;   
  }
  // wildcard match
  if ( p[1] === '*' ) {
    for( let i = 0; i < s.length + 1; i++ ) {
      // match i wildcard p[0]
      if (recIsMatch(s.slice(i), p.slice(2))) {
        return true;
      } 
      
      // break in a wildcard match sequence
      if ( s[i] !== p[0] && p[0] !== '.' ) {
        return false;
      }
    }
  }
  // didn't match wildcard 
  // either unmatched string or unmet pattern
  if ( s.length === 0 || p.length === 0 ) {
    return false;
  }
  // exact or any match
  if ( s[0] === p[0] || p[0] === '.' ) {
    return recIsMatch(s.slice(1), p.slice(1));   
  }
  return false;
};
