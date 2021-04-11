/**
 * @param {number} n
 * @return {string[]}
 */
// rewrite rules on leaf nodes
// 1. () => ()()
// 2. () => (())
// That's it
// Then ignore order
// But I think if you restrict 1 to "only last leaf in a chain of leaves"
// You don't need to track order.
// But probably too complex to worry about that
var generateParenthesis = function(n) {
  if ( n === 0 ) return [];
  let f = ['()'];
  n -= 1;
  while(n--) {
    const newF = [];
    for( const p of f ) {
      for( const {index} of p.matchAll(/\(\)/g) ) {
        newF.push(p.slice(0,index) + '()()' + p.slice(index+2));
        newF.push(p.slice(0,index) + '(())' + p.slice(index+2));
      }
    } 
    f = [...new Set(newF)];
  } 
  return f;
};
