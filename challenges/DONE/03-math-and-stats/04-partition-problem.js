// this is the solution i created before I looked at the official solution code
// I was considering a binary solution at first (all partitions, then removing duplicates)
// but settled with this recursive solution instead
// an interesting idea is the equivalence class of numbers that 
// encode the same partition
// for example for 15 there are ~ 100 partitions
// but 2**15 is around 32000
// so we can bin 32000 numbers into ~100 equivalence classes
// could this be something to do with hashing?
let partition = function partitions(n, k = 1) {
  const ps = [];
  const half = n>>1;
  for( let i = k; i <= half; i++ ) {
    //console.log(JSON.stringify({ps}));
    //a(n, i, ps); 
    if ( i >= n ) break;
    //console.log({a:{n,i,list}});
    ps.push([i, n-i]);
    const b = partition(n-i, i).map(p => (p.push(i),p));
    ps.push(...b);
  }
  //console.log(JSON.stringify({len:ps.length, ps}));
  return ps;
}

function a(n, i, list) {
  if ( i >= n ) return;
  //console.log({a:{n,i,list}});
  list.push([i, n-i]);
  const b = partition(n-i, i).map(p => (p.push(i),p));
  list.push(...b);
}

console.time(`Mine`);
console.log(partition(parseInt(process.argv[2])).length);
console.timeEnd(`Mine`);

// the below is the official solution code
/**
  this is a great algorithm
  what i wonder about is
  how does it know that what it creates as a partition doesn't happen before?
  and how did they come up with this algorithm?

  i think the answer to the first is because it monotonically increases, basically it counts
  over the possibilities in a simple way, so every partition is both unique, and 
  never occuring previously

  the second part is it's obvious from the point of view of we will try these different paths
  and return the ones that match

  (my algorithm is more deterministic, because it works top down, it never over shoots
  and only creates partitions that are valid)

  the non-intuitive thing for me about this algorithm is how many paths are abandoned, for instance

  1, 1, 3, 4, 5 - too low, go and push more
  1, 1, 3, 4, 5, 5 - didn't work, too high
  1, 1, 3, 4, 5, 6 - didn't work, too high
  1, 1, 3, 4, 5, 7 - didn't work, too high
  ... etc ...
  pop, 
  pop,
  etc
  1, 1, 3, 4, 6 - good

  and

  1, 1, 3, 5, 5, - good
  1, 1, 3, 6 -- too low, push
  1, 1, 3, 6, 6, - too high
  ... etc

  1, 1, 3, 9, 9, -- too high
  pop
  1, 1, 3, 9, 10 -- too high
  pop
  1, 1, 3, 10 -- good

  I think I see an optimization, can't i break out once i hit a dead end path?
  // like the first number, i, that i get to that is too high, obviously
  // all subsequent i will be too high as well so can't i break the loop on that

  Ah, I see it already does that. The return in the loop. Anyway this is a great algorithm

  But I prefer mine, mine is more deterministic, only creating those guys
  that actually are partitions. 

**/

// it is vastly superior to mine in terms of performance
// mine being 2 - 6 times slower
// but i still like mine for its simplicity

partition = function partitions(n) {
  const ps = [];
  recurse(n, 0, 1, [], ps);
  return ps
}

function recurse(N, sum, start, p, ps) {
  if ( sum === N ) {
    ps.push(p.slice());
  }

  for( let i = start; i < N; i++ ) {
    const next = sum + i;
    if ( next <= N ) {
      p.push(i);
      recurse(N, next, i, p, ps);
      p.pop();
    } else {
      break;
    }
  }
}

console.time(`Theirs`);
console.log(partition(parseInt(process.argv[2])).length);
console.timeEnd(`Theirs`);

/**
  Research ideas

  1. equivalence classes of numbers that map to the same parition
  2. partition algorithms are miniscule. it's ridiculous how small their code is. how compact and transparent it is. I feel like I've stumbled on something fundamental here. Like there's something really huge, powerful, general and obvious staring out at me from these algorithms but I'm missing it. It's beautiful. A beautiful sight to behold, like the simplicity of the LZ algorithm, but better, purer, more divine. Lierally, LZ is clearly an elegant human construction, partition algorithms, even if you understand them, are other wordly, they're so simple. It's fucking crazy. There must be more depth to this. (or maybe all exponential algorithms have this allure of deceptive symmetry, their power subtlety magnified by the exponential size of the graph, their subtly directions giving structure to the path and graph it carves through space and time to give a particular result, butterfly effect, magnified by massive scale.

**/
