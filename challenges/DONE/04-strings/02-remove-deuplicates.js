// dedupe a string

// my first solution (using hash set)
let dedupe = function dedupe(str) {
  const set = new Set();
  const uniques = [];
  for(const char of str) {
    if ( !set.has(char) ) {
      uniques.push(char);
      set.add(char);
    }
  }
  return uniques.join('');
}

// my second solution after glacing at their solution description 
// where they said two pointers, reader and writer
// but I thought that mean they somehow did it without hashsets, 
// but I couldn't work out a way to do that, so I
// read more and they weren't trying to do it without hashsets
dedupe = function dedupe(str) {
  const set = new Set();
  const uniques = [];

  let write = 0;
  let read = 0;

  while(read < str.length) {
    const char = str[read];
    if ( !set.has(char) ) {
      uniques[write] = char;
      set.add(char);
      write++;
    }
    read++;
  }

  return uniques.join('');
}

// third way I thought of, more "functionally"

dedupe = s => Array.from(s).reduce(({S,u}, c) => !S.has(c) ? (S.add(c), u.push(c), S) : S, {S:new Set(), u: []}).u.join('');

// my fourth solution involves no hash set
// it's "O(n**2)" but actually you can say it's
// O(n*u) where u is the number of unique characters in the string
dedupe = function dedupe(str) {
  const uniques = [];

  let write = 0;
  let read = 0;

  while(read < str.length) {
    const char = str[read];
    if ( !uniques.includes(char) ) {
      uniques[write] = char;
      write++;
    }
    read++;
  }

  return uniques.join('');
}
