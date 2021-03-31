let regxMatch = function match(str, pattern) {
  // array from allows us to handle unicode
  // as str[index] and substr and slice don't handle unicode
  // but for .. of and Array.from (str[Symbol.iterator]) DO 
  // correctly isolate single logical Unicode characters
  return matchR(Array.from(str), Array.from(pattern)); 
}

function matchR(str, pattern) {
  // conclusions based on length in the base case
    if ( str.length === 0 && pattern.length === 0 ) {
      return true;
    }
    if( str.length === 0 && pattern.length > 0 ) {
      // remaining pattern after string
      // entire pattern is unmatches so
      return false;
    }
    if ( str.length > 0 && pattern.length === 0 ) {
      // remaining string after pattern
      // entire string is unmatched (and we don't implement
      // but instead assume ^ and $) so
      return false;
    }
  
  // matching based on content
    const [patternHead, ...patternTail] = pattern;
    const [strHead, ...strTail] = str;

    // the pattern in the below is consume 1 or more characters
    // of str and or pattern and recurse down

    // glob match
    if ( patternTail.length && patternTail[0] === '*' ) {
      const newPatternTail = patternTail.slice(1);

      for(let i = 0; i < str.length; i++) {
        const newStrTail = str.slice(i);
        const strTailHead = newStrTail[0];

        // zero or more pattern[0]*
        if ( matchR(newStrTail, newPatternTail) ) {
          return true;
        }

        // if that didn't match 
        // check if 1 or more pattern[0]* matches
        if ( patternHead === strTailHead ) {
          continue;
        } else if ( patternHead === '.' ) {
          continue;
        } else {
          return false;
        }
      }
      console.warn(`We are here?`);
    // any match
    } else if ( patternHead === '.' ) {
      return matchR(strTail, patternTail);
    // exact match
    } else if ( patternHead === strHead ) {
      return matchR(strTail, patternTail);
    // no match
    } else {
      return false;
    }
}

const str = process.argv[2] || 'fabbbc';
const pattern = process.argv[3] || '.ab*c';
console.log(str, pattern, regxMatch(str, pattern));
