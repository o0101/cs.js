// As the arrays are sorted this is easy. O(N)
// just treat all arrays as a queue and continuously pop off (increment index on) the smallest elements
// testing equality.
// I got this before reading the solution. My idea:
// find max item at index frontier across arrays 
// now pop off items from other queues until they are >= that max item.
// this is less comparisons that testing equality of all 3 at each step. 
// because you only have to find a new max when they exceed the old one.
// and if all 3 are equal, then you win. or if any array is empty then 
// you also win.
let findLeastCommonNumber = function(a, b, c) {
	const lists = [a,b,c];
	const indices = [0,0,0];
	let mins = [0,1,2];
	let element = -1;
	let maxValue = -Infinity;

	const maxMinArray = () => {
		const mins = [0, 1, 2];
		let maxValue = -Infinity;
		let max;

		lists.forEach((list, index) => {
			if ( list[indices[index]] >= maxValue ) {
				maxValue = list[indices[index]];
				max = index;
			}
		});

		mins.splice(max, 1);

		return {max, mins, maxValue};
	};

	const noListsEmpty = () => lists.every((list, index) => indices[index] < list.length);

	({mins, maxValue} = maxMinArray());

	while(noListsEmpty()) {
		const found = mins.map(min => {
			while(lists[min][indices[min]] < maxValue) {
				indices[min] += 1;
			}
			if ( lists[min][indices[min]] === maxValue ) {
				return true;
			} else {
				maxValue = lists[min][indices[min]];
				return false;
			}
		}).every(a => a);

		if ( found ) {
			element = maxValue;
			break;
		}

		({mins} = maxMinArray());
	}

	return element;
};

