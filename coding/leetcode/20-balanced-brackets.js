const CLOSE = {
  '(': ')',
  '{':'}',
  '[':']',
}
var isValid = function(s) {
  s = Array.from(s)
  const stack = [];
  for( const c of s ) {
    switch(c) {
      case '(':
      case '{':
      case '[':
        stack.push(c);
        break;
      default:
        if ( CLOSE[stack[stack.length-1]] !== c) {
          return false;
        }
        stack.pop();
        break;
    }
  }
  
  return stack.length === 0;
};


