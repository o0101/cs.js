/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// O(nm)
var strStr = function(haystack, needle) {
  const hLen = haystack.length;
  const nLen = needle.length;
  // pattern state
  let fStart = -1; 
  let nStart = 0;
  
  // source state
  let hStart = 0;
  
  if ( nLen === 0 ) return 0;
  if ( nLen > hLen ) return -1;
  
  while(hStart < hLen) {
    const hc = haystack[hStart];
    const nc = needle[nStart];
    
    if ( hc !== nc ) {
      if ( fStart !== -1 ) {
        hStart = fStart;
        fStart = -1;
      }
      nStart = 0;
    } else {
      if ( fStart === -1 ) {
        fStart = hStart; 
      }
      nStart++;
      if ( nStart >= nLen ) {
        return fStart;
      }
    }
    hStart++;
  }
  
  if ( nStart >= nLen ) {
    return fStart;
  }
  return -1;
};
