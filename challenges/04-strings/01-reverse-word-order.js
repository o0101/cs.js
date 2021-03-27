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
