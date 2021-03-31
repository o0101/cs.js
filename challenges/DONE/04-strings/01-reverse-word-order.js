// reverse order of words
let rwo = function reverseWordOrder(s) {
  return s.split(/ /g).reverse().join(' ');
}

// limitations of above
// what if whitespace needs to be preserved? will it be?
// yes (but would be collapsed to single space if /\s+/g is used

// what if words can break on other characters?
// \t \n ?
// then need to do 1 split for each of those
// or handle character per character


// what if words and whitespace need to have order preserved?
// then define if whitespace attaches to one side or another of word.

// what if words can break across lines, but must not be split when reversed?
// then join all such broken words before running any other algorithm for this

// how to implement this without implementing a 'split' function?

// this is complex, reminds me to always keep things simple
rwo = function hardReverseWordOrder(s) {
  WS = /\s/g;
  const sentenceParts = [];
  const part = {
    isWord: false,
    chars: []
  };

  for( const char of s ) {
    switch(WS.test(char)) {
      case false:
        if ( !part.isWord ) {
          sentenceParts.push(part.chars.join(''));
          part.chars = [char];
          part.isWord = true;
        } else {
          part.chars.push(char);
        }
        break;

      case true:
        if ( part.isWord ) {
          sentenceParts.push(part.chars.join(''));
          part.chars = [char];
          part.isWord = false;
        } else {
          part.chars.push(char);
        }
        break;
    }
  }

  sentenceParts.push(part.chars.join(''));

  sentenceParts.reverse();

  return sentenceParts.join('');
}

// wow the above was a real lesson for me in keeping things simple
// the more code, the more change for errors
// mistake 1. i didn't correctly put the chars += char behind the else side of the 
// part.isWord conditional meaning I was misaligning the character at the word-whitespace interface
// mistake 2. I forgot to add the last part to sentenceParts meaning
// i was missing the last (first, in reversed order) word
// mistake 3. I left a line chars += char inside the whitespace case in the switch block
// outside the conditional so I was adding extra whitespace to the word before switching to a 
// whitspace segment


// wow amazing 3 simple mistakes
// but hard to catch or understand
// because they slipped past me
// because even this simple problem
// if I wrote it in a long way, could introduce bugs
// the more lines I wrote, the more bugs
// the more bugs, the more I needed to fix and change code
// and the more bugs. more bugs could come while doing that. while fixing. 
// it's really a lesson for me to keep things simple, or be very deliberate if I'm making it long
// I mean only if I'm in a test, otherwise I can just hack it out, but if I'm in a test
// it pays to be very deliberate


// the below is a solution i wrote based on glancing at the official solution
// which uses reversed words and "doesn't require extra memory"
// so I'm guessing after seeing this trick before in 
// linkedlists reversal (or reverse k)
// no it was in array rotation
// we can use the trick of reverse the words, then reverse the list. 

rwo = function reverseWordOrderNoExtraSpace(s) {
  const WS = /\s/g;
  const word = () => Number.isInteger(wordStart);
  let wordStart = null;
  let i = 0;

  // arrays not strings for unicode safety
  s = Array.from(s);

  for( const char of s ) {
    const thenWhitespace = WS.test(char);
    if ( word() && thenWhitespace ) {
      s = reverse(s, wordStart, i-1);
      wordStart = null;
    } else if ( !word() && !thenWhitespace ) {
      wordStart = i;
    }
    i++;
  }

  if ( word() ) {
    s = reverse(s, wordStart, s.length - 1);
  }

  s = reverse(s, 0, s.length - 1);

  return s.join('');
}

function reverse(s, i, j) {
  while(i < j) {
    s = swap(s, i, j);
    i++;
    j--;
  }
  return s;
}

function swap(s, i, j) {
  // splitting into characters is safer for unicode strings,
  // otherwise your indices may pull out and swap against
  // surrogate pairs which won't work
  if ( typeof s === 'string' ) {
    s = Array.from(s);
  } else if ( Array.isArray(s) ) {
    s = s;
  } else {
    throw new TypeError(`This version of swap only works on strings or Arrays`);
  }
  if ( i == j ) {
    return s.slice();
  } else if ( i > j ){
    ([i, j] = [j, i]);
  }
  // also once we deal with arrays with distinct elements,
  // there's no need to consider that a character can have a "width"
  // since all characters no matter how they are encoded will only
  // occupy a single slot in the array so we can readily swap them in and out


  // this reliability trumps the (in any case, dubious,
  // as we are creating new strings via substr or slice) "no extra memory"
  // benefit touted by the official solution which uses substrs and unicode-unsafe indexing
  return [...s.slice(0, i), s[j], ...s.slice(i+1, j), s[i], ...s.slice(j+1)];
}

// wow I am learning so much
// I just learned there is a difference between
// str.split('') and str.split() 
// e.g if you have x = '😊'
// str.split('') gives you the "surrogate pairs", ["�", "�"], while
// str.split()  gives you the logical (semantic, symbolic) characters, ["😊"]
// this is wrong

// Array.from(x) or [...x] gives you the logical (semantic, symbolic) characters, ["😊"]
// str.split just wraps the string in an array

// tech blog post, "In Search of the O(1) memory JavaScript string reversal"


// this is my final refactored version
// i like the simplicity, naming and readibility


rwo = function reverseWordOrderNoExtraSpace(s) {
  // arrays not strings for unicode safety
  s = Array.from(s);

  const len = s.length; 
  const WhiteSpace = /\s/g;
  const word = () => Number.isInteger(wordStart);
  let wordStart = null;
  let i = 0;

  for( const char of s ) {
    const thenWhitespace = WhiteSpace.test(char);
    const endOfWord = word() && thenWhitespace;
    const startOfWord = !word() && !thenWhitespace;

    if (startOfWord) {
      wordStart = i;
    } else if (endOfWord) {
      s = reverse(s, wordStart, i-1);
      wordStart = null;
    }
    i++;
  }

  if (word()) s = reverse(s, wordStart, len - 1);

  return reverse(s, 0, len - 1).join('');
} 
