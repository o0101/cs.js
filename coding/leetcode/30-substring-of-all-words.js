/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const DEBUG = false;
Array.prototype.subarr = function(a, len) {
  return this.slice(a, a+len);
}
var findSubstring = function(s, words) {
  const K = words.length - 1;
  const Len = words[0].length;
  const chunk = (W, c) => {
    let last = W.pop() || ''; 

    if ( last.length > 0 && ((last.length % Len) === 0) ) {
      W.push(last);
      W.push(c);
    } else {
      W.push(last + c);
    }

    return W;
  };
  const Words = new Map(words.map(w => ([w,{count:0}])));
  words.forEach(w => Words.get(w).count++); 
  const starts = [];
  
  s = Array.from(s);
  
  for( let i = 0; i < s.length; ) {
    const wordK = s.subarr(i+K*Len, Len).join('');
    let validK = Words.has(wordK);
    let valid = validK;
    DEBUG && console.log({wordK});
    // only check if last word is in our list
    if ( validK ) {
      let fs = s.subarr(i, Len*(K + 1));
      fs = fs.reduce(chunk, []);
      DEBUG && console.log(i, fs);
      // check we have the right number of words
      valid = valid && fs.length === words.length;
      valid = valid && fs.every(w => Words.has(w));
      valid = valid && (fs = Object.entries(fs.reduce(count, {})));
      DEBUG && console.log(fs, Words);
      // check all counts are valid
      valid = valid && fs.every(([w, {count}]) => count === Words.get(w).count);
    }
    
    // otherwise skip forward to 1 past the start of the last word
    if ( !valid ) {
      if ( !validK ) {
        //i += (K*Len) + 1;
        //we could check all the Len words from (K*Len) + 1 to (K*Len) + Len
        //and if all invalid we jump forward to (K+1)*Len + 1
        //else any valid (at j) we jump forward j (since it's possible
        // that a segmentation aligns on their because it's wordK is valid)
        /**
        let j;
        for( j = 1; j < Len; j++ ) {
          const wordJ = s.subarr(j+i+(K*Len), Len).join('');
          if ( Words.has(wordJ) ) break; 
        }
        //console.log(j,Len,i);
        if ( j <= Len ) {
          i += j;
        } else {
          i += j+(K+1)*Len;
          //console.log(i);
        }
        **/
        i += 1;
      } else {
        i += 1;
      }
    } else {
      starts.push(i);
      i += 1;
    }
  }
  
  return starts;
};

function count(O,w) {
  let data = O[w];
  if ( ! data ) {
    data = O[w] = {count:0};
  }
  data.count += 1;
  return O;
}
