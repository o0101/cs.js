var minimizeResult = function(expression) {
  const results = [];
  const center = expression.indexOf('+');
  const iStart = 0;
  const iEnd = center;
  const jStart = expression.length-1;
  const jEnd = center;
  for( let i = iStart; i < iEnd; i++ ) {
    for ( let j = jStart; j > jEnd; j-- ) {
      let test = Array.from(expression);
      if ( i > iStart )
        test.splice(i, 0, "*(");
      else 
        test.splice(i, 0, "(");
      if ( j < jStart ) 
        test.splice(j+2, 0, ")*");
      else 
        test.splice(j+2, 0, ")");
      test = test.join('');
      results.push([test, eval(test)]);
    }
  }
  results.sort(([,v], [,u]) => v-u);
  console.log(results[0]);
  return results[0][0].replaceAll('*', '');
};

minimizeResult("247+38");
minimizeResult("12+34");
minimizeResult("999+999");
