// I am up with this
// at first using a trie algorithm with multiple pointers for the 
// frontier of all possibilities at the current character
// then after seeing their solution description did not mentioned trie
// but did mention n**2 and substring I came up with this
// equivalent algorithm
let segment = function segment(s, dictionary) {
  // at each step we get a substring of s
  // and find any prefixes of that substring that are in the dictionary
  const segments = new Map();
  for( let i = 0; i < s.length; i++ ) {
    const tail = s.slice(i);
    for( let j = 1; j <= tail.length; j++ ) {
      const prefix = tail.slice(0,j);
      if ( dictionary.has(prefix) ) {
        if ( i === 0 ) {
          segments.set(i+j, {start:i,end:i+j});
        } else if ( segments.has(i) ) { // if there is an interconnecting segment
          segments.set(i+j, {start:i, end:i+j});
        }
      }
    }
  }

  return segments.has(s.length);
}

// same as above with comments and debug output
// and a correction s++ -> i++ (lesson to be careful!)
segment = let canSegmentString = function segment(s, dictionary) {
  // at each step we get a substring of s
  // and find any prefixes of that substring that are in the dictionary
  const segments = new Map();
  for( let i = 0; i < s.length; i++ ) {
    const tail = s.slice(i);
    for( let j = 1; j <= tail.length; j++ ) {
      const prefix = tail.slice(0,j);
      console.log(i,j,prefix, dictionary.has(prefix));
      if ( dictionary.has(prefix) ) {
        const start = i;
        const end = i+j-1;

        // any first segment (that starts at the start of the main string) can always be reached
        if ( i === 0 ) { 
          // so always add it
          segments.set(end, {start,end});
        }

        // if there is an interconnecting segment (therefore it can be reached)
        else if ( segments.has(start-1) ) { 
          // so always add it
          segments.set(end, {start,end});
        }
      }
    }
  }

  console.log(segments);

  return segments.has(s.length-1);
}
