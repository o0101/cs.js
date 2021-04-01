let removeWhiteSpaces = function nowhite(str) {
  const WS = /\s/;
  const parts = [];
  let read = 0;
  let write = 0;

  while(read < str.length) {
    const char = str[read];
    if ( WS.test(char) ) {
      read++;
      continue;
    }
    parts[write] = char;
    write++;
    read++;
  }

  return parts.join('');
}

// same as above but more concise
removeWhiteSpaces = function nowhite(str) {
  str = Array.from(str);

  const WS = /\s/;
  const parts = [];
  let read = 0;
  let write = 0;

  while(read < str.length) {
    const char = str[read];
    read++;
    if ( WS.test(char) ) {
      continue;
    } else {
      parts[write] = char;
      write++;
    }
  }

  return parts.join('');
}

// same as above but more concise
removeWhiteSpaces = function nowhite(str) {
  str = Array.from(str);

  const WS = /\s/;
  const parts = [];
  let read = 0;
  let write = 0;

  while(read < str.length) {
    const char = str[read];
    read++;
    if ( WS.test(char) ) {
      continue;
    }
    parts[write] = char;
    write++;
  }

  return parts.join('');
}

// same as above but more concise
removeWhiteSpaces = function nowhite(str) {
  str = Array.from(str);

  const WS = /\s/;
  const parts = [];
  let read = 0;
  let write = 0;

  while(read < str.length) {
    const char = str[read++];

    if ( WS.test(char) ) continue;

    parts[write++] = char;
  }

  return parts.join('');
}

// same as above but no indexes
removeWhiteSpaces = function nowhite(str) {
  str = Array.from(str);

  const WS = /\s/;
  const parts = [];

  for( const char of str ) {
    if ( WS.test(char) ) continue;

    parts.push(char);
  }

  return parts.join('');
}

// same as above but more concise
removeWhiteSpaces = str => Array.from(str).filter(c => !/\s/.test(c)).join('');

// same as above but with reduce
removeWhiteSpaces = str => Array.from(str).reduce((f, c) => (/\s/.test(c) ? 0 : f.push(c), f), []).join('');

// one liner with indexes (breaks with unicode)
removeWhiteSpaces = str => Array.from(str).map((_,i) => i).filter(i => !/\s/.test(str[i])).map(i => str[i]).join('')

// one liner with indexes (breaks with unicode) and without join
removeWhiteSpaces = str => Array.from(str).map((_,i) => i).filter(i => !/\s/.test(str[i])).reduce((S,i) => S + str[i], '');

// word processing
removeWhiteSpaces = function nowhite(str) {
  str = Array.from(str);

  const WS = /\s/;
  let word = null;
  let read = 0;
  let s = '';

  for( const char of str ) {
    const nonword = WS.test(char);

    if ( word !== null && nonword ) {
      s += str.slice(word,read).join(''); 
      word = null;
    } else if ( word === null && !nonword ) {
      word = read;
    }

    read++;
  }

  if ( word !== null ) {
    s += str.slice(word).join('');
  }

  return s;
} 
