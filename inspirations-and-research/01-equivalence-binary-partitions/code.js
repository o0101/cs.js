// partitions code from the educative challenge
{
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

  if ( process.argv[2] ) {
    console.time(`Mine`);
    console.log(partition(parseInt(process.argv[2])).length);
    console.timeEnd(`Mine`);
  }

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

  if ( process.argv[2] ) {
    console.time(`Theirs`);
    console.log(partition(parseInt(process.argv[2])).length);
    console.timeEnd(`Theirs`);
  }
}

// notes
  /**
    Research ideas

    1. equivalence classes of numbers that map to the same parition
    2. partition algorithms are miniscule. it's ridiculous how small their code is. how compact and transparent it is. I feel like I've stumbled on something fundamental here. Like there's something really huge, powerful, general and obvious staring out at me from these algorithms but I'm missing it. It's beautiful. A beautiful sight to behold, like the simplicity of the LZ algorithm, but better, purer, more divine. Lierally, LZ is clearly an elegant human construction, partition algorithms, even if you understand them, are other wordly, they're so simple. It's fucking crazy. There must be more depth to this. (or maybe all exponential algorithms have this allure of deceptive symmetry, their power subtlety magnified by the exponential size of the graph, their subtly directions giving structure to the path and graph it carves through space and time to give a particular result, butterfly effect, magnified by massive scale.

  **/

  // equivalence class of integers under partitions
  // represented by binary 

  // there are two things we can look at here
  // the class of integers (onto map)
  // N -> P (E)
  // and the order of integers (partial order)
  // (N, <=) 
  // (P, <=)
  // is E isotone? 

function integerEquivalenceClassOfPartitions(n, showBits = false) {
  // use big ints to go high but we will never reach this anyway hahah
  n = BigInt(n);
  const max = 2n**n - 1n;
  const classes = {};
  const lists = {};
  
  let {rep,partition,sum} = binaryToPartition();

  let list = lists[sum];
  if ( ! list ) {
    list = lists[sum] = [];
  }

  let partitions = classes[sum];
  if ( ! partitions ) {
    partitions = classes[sum] = {};
  }
  let equivalences = partitions[partition];
  if ( ! equivalences ) {
    equivalences = partitions[partition] = [];
  }

  for( let i = 0n; i <= max; i++ ) {
    const rawBinary = i.toString(2);
    ({rep, partition,sum} = binaryToPartition(rawBinary));

    list = lists[sum];
    if ( ! list ) {
      list = lists[sum] = [];
    }

    partitions = classes[sum];
    if ( ! partitions ) {
      partitions = classes[sum] = {};
    }
    equivalences = partitions[partition];
    if ( ! equivalences ) {
      equivalences = partitions[partition] = [];
    }

    if ( showBits ) {
      const vals = [
        `n: ${(i+'').padStart(rep.length, ' ')}`, 
        'b: -'+i.toString(2).split('').join('-')+'-', 
        `p: ${rep}`, 
        `w: ${(weight(i)+'').padStart(rep.length, ' ')}`
      ];
      list.push(vals.slice());
      equivalences.push(vals.slice());
    } else {
      list.push(i);
      equivalences.push(i);
    }
  }

  return {classes, lists};
}

function weight(i) {
  return i.toString(2).split('').reduce((S,u) => S + parseInt(u), 0);
}

function binaryToPartition(rawBinary = '') {
  const binary = Array.from(rawBinary).map(unit => parseInt(unit));
  const p = [];
  let current = 1;
  let sum = 1;
  let rep = '1';

  for( const unit of binary ) {
    if ( unit === 0 ) {
      current += 1;    
      rep += ',1';
    } else if ( unit === 1 ) {
      p.push(current);
      current = 1;
      rep += '-1';
    }
    sum += 1;
  }

  p.push(current);

  p.sort((a,b) => Math.sign(a-b));

  return {sum, partition: p.join(','), rep};
}

const MAX = 10;

for( let i = 0; i <= MAX; i++ ) {
  console.log(`\nInteger classes for sums up to ${i+1}`);
  /**
  console.log(
    {sums: integerEquivalenceClassOfPartitions(i)}
  )
  **/
  ///**
  console.log(JSON.stringify(
    {sums: integerEquivalenceClassOfPartitions(i, true)},
    (k,v) => {
      if ( typeof v === 'bigint' ) {
        return parseInt(v+'');
      } else return v;
    },
    2
  ));
  //**/
}


// there's a bit of a definitional issue
// with 1s and 0s
// do we incude 0s in partition? seems no need
// min partition 0 -> empty
// then 1 -> 1
// then what does binary represent. It represents division of the space
// so n bits divides up n + 1 slots
// OK
// So 1 bit min partition is 2
// So zero bits "empty" / null , min partition is 1
// there is no zero. Is that a problem? Or a solution? hehe. Or an opportunity?
// Definitional issues. Base case. Interesting. Etc
// doing it the way we are
// with n bits divides n + 1 1 slots
// means there is no paritiotn for zero (should be empty partition)
// and the parition for 1 is given by the "empty" binary string, corresponding to the "empty" number
// also in all these partitions, of n ( except n === 2 ) there is no "blank partition" i.e n
// the largest number in any partition of n via this (except in the case of n being 2) is n - 1



