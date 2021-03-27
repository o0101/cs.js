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
        part.chars.push(char);
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

