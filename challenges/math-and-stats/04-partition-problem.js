console.log(partitions(15));

function partitions(n, k = 1) {
  const p = [];
  const half = Math.floor(n>>1);
  for( let i = k; i <= half; i++ ) {
    //console.log(JSON.stringify({p}));
    a(n, i, p); 
  }
  console.log(JSON.stringify({p}));
  return p.sort();
}

function a(n, i, list) {
  if ( i >= n ) return;
  //console.log({a:{n,i,list}});
  list.push([i, n-i]);
  const b = partitions(n-i, i).map(p => (p.push(i),p.sort(),p));
  list.push(...b);
}
