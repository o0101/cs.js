import {
  randomNumberList
} from '../../src/test.js';

let findTriples;

const bigList = randomNumberList(1000);

// my first solution
findTriples = function findTriples(arr) {
  arr.sort((a,b) => Math.sign(parseInt(a)-parseInt(b)));
  arr = arr.slice(arr.lastIndexOf(0)+1);
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

console.time(`My original`);
console.log(findTriples([4, 16, 1, 2, 3, 5, 6, 8, 25, 10]));
console.log(findTriples(bigList));
console.timeEnd(`My original`);

// a solution I created after reading the approach and glacing for less than a couple of seconds
// at the code of the official solution
findTriples = function findTriples(arr) {
  arr.sort((a,b) => Math.sign(parseInt(a)-parseInt(b)));
  arr = arr.slice(arr.lastIndexOf(0)+1);
  const triples = [];

  for( let i = arr.length - 1; i >= 2; i-- ) {
    const c = arr[i]**2;
    let start = 0;
    let end = i - 1;
    let a = arr[start]**2;
    let b = arr[end]**2;

    // for each i in arr (O(n)), for each start,end (there can only be O(n) start,end)
    // therefore algorithm O(n**2)
    while(start < end) {
      const val = a + b;
      if ( val > c ) {
        end--;
        b = arr[end]**2;
      } else if ( val < c ) {
        start++;
        a = arr[start]**2;
      } else {
        triples.push([arr[start], arr[end], arr[i]])
        break;
      }
    }
  }

  return triples;
}

// after looking closesly at the official solution code 
// i realized my algorithm is slightly different
// but it uses the same idea
// but mine's more effective
/**
  because they check c from array start forward, then put a and b at
  start and end of whole array every time
  this is stupid because
  a or b cannot come after c so there's no point using a or b at the end of the array
  the maximum index for a or b can only be at c
  so you can discard any values above c when checking for a and b since they are already bigger than c
  also, because c is larger than either a or b, putting c at the start means you have many 
  iterations where c cannot be the sum of any two squares of smaller elements because there are no 
  smaller elements
  but this means that they have to skip over 
**/

console.time(`My second after reading theirs`);
console.log(findTriples([4, 16, 1, 2, 3, 5, 6, 8, 25, 10]));
console.log(findTriples(bigList));
console.timeEnd(`My second after reading theirs`);

findTriples = function(arr) {
	let n = arr.length;
	let triplets = [];
	arr.sort(function(a, b) {
		return a - b;
	});

	for (let i = 0; i < n; i++) {
		if (arr[i] === 0) {
			continue;
		}

		let c2 = arr[i] * arr[i];

		let j = 0;
		let k = n - 1;

		while (j < k) {
			if (j === i || arr[j] === 0) {
				j++;
					continue;
			}

			if (k === i || arr[k] === 0) {
				k--;
				continue;
			}

			let a2 = arr[j] * arr[j];
			let b2 = arr[k] * arr[k];

			if (a2 + b2 === c2) {
				triplets.push([arr[j], arr[k], arr[i]]);
				break;
			} else if (a2 + b2 + (-c2) > 0) {
				k--;
			} else {
				j++;
			}
		}
	}
	return triplets;
};

console.time(`Theirs`);
console.log(findTriples([4, 16, 1, 2, 3, 5, 6, 8, 25, 10]));
console.log(findTriples(bigList));
console.timeEnd(`Theirs`);


/**

results (normalized time)
  
My original: 3-4
My second after reading theirs: 1
Theirs: 2


Fuck yeah so my second after reading theirs is twice (2wice?) as fast as theirs. Ahahaha
And my original is only two times slower than theirs. Hahahah. Fuck yeah I am the best I am fucking awesome forever :p ;) xxx xchakka ahahalllxxx ;pp xxxa;ppppp ppllklll


**/
