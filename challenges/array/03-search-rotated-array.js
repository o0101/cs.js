// Challenge: there is a sorted array that has been rotated by some arbitrary number
// efficiently ( faster than O(N) ) search for keys in that array

// AWESOME! I got it in 1. Got it first time. After thinking about it first.
// Came up with this solution ON MY OWN without reading ahead. Yeah! :P ;) xx

const notInOrderedRange = (key, left, right) => key < left || key > right;
const notInRotatedRange = (key, left, right) => key < left && key > right;
const rangeOrdered = (left, right) => left <= right;
const notInRange = (key, left, right) => rangeOrdered(left, right) ? 
  notInOrderedRange(key, left, right) :
  notInRotatedRange(key, left, right);


let binarySearchRotated = function(arr, key) {
	let low = 0;
	let high = arr.length - 1;

	while( low < high ) {
		if ( key === arr[low] ) {
			return low;
		} else if ( key === arr[high] ) {
			return high;
		}

		const mid = (low+high)>>1;

		const notInLeft = notInRange(key, arr[low], arr[mid]);
		const notInRight = notInRange(key, arr[mid+1], arr[high]);

		if ( notInLeft && notInRight ) break;

		if ( notInLeft ) {
			low = mid + 1;
		} else if ( notInRight ) {
			high = mid;
		}
	}

	if ( key === arr[low] ) {
		return low;
	} else if ( key === arr[high] ) {
		return high;
	}
	return -1;
};
