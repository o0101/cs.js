console.log(findTriples([4, 16, 1, 2, 3, 5, 6, 8, 25, 10]));

function findTriples(arr) {
  arr.sort((a,b) => Math.sign(parseInt(a)-parseInt(b)));
  const squares = new Map(arr.map(n => [n**2,n]));
  const triples = [];

  for( let i = 0; i < arr.length; i++ ) {
    const a = arr[i]**2;
    for( let j = i + 1; j < arr.length; j++ ) {
      const b = arr[j]**2;
      const c = a+b;
      if ( squares.has(c) ) {
        triples.push([arr[i],arr[j],squares.get(c)]);
      }
    }
  }

  return triples;
}

