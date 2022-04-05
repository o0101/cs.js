const DEBUG = false;

var countAndSay = function(n) {
  let i = n - 1;
  n = "1";
  while(i--) {
    n = nextCS(n);
  }
  return n;
};

function nextCS(n) {
  const runs = Array.from(n).reduce((R, char) => {
    let run = R.pop(); 

    if ( run && (run.char !== char) ) {
      R.push(run);
      run = null;
    } 

    if ( ! run ) {
      run = {
        char,
        count: 0
      };
    } 

    run.count++;      

    R.push(run);

    return R;
  }, []);
  DEBUG && console.log(runs);
  return runs.reduce((S, {char,count}) => S + `${count}${char}`, '');
}

console.log(countAndSay(5));
