// Challenge: there is an array, and a window, we need to find the max 
// for each left-full (right termination is OK) window as it slides over the input

// try 1 - O(nw) 
let findMaxSlidingWindow1 = function(arr, window_size) {
	const result = [];
	const window = {
		max: -Infinity,
		index: -window_size,
		list: []
	}
	
	// if window.list was a heap or skiplist this would be O(N log W)
	// but as it is it is O(NW) worst case
	for( let i = 0; i < arr.length; i++ ) {
		const item = arr[i];
		window.list.push(item);
		if ( window.list.length > window_size ) {
			const leaving = window.list.shift();
			if ( window.max === leaving ) {
				window.max = item;
				
				window.list.forEach(wItem => {
					if ( wItem > window.max ) {
						window.max = wItem;
					}
				})
			}
		}
		
		if ( item > window.max ) {
			window.max = item;
		}
		if ( window.list.length === window_size ) {
			result.push(window.max);
		}
	}
	return result;
};

// try 2 - using deque
  // although in JS this deque is not truly 0(1) at both ends I think
  // we could use a double linked list
  // this challenge is good for me because I never thought deque could be used to do anything cool
let ffindMaxSlidingWindow = function(arr, windowSize) {
  const result = [];
  const list = [];

  // if window.list was a heap or skiplist this would be O(N log W)
  // but as it is it is O(NW) worst case
  for( let i = 0; i < arr.length; i++ ) {
    const item = arr[i];
    const queueBack = arr[list[list.length-1]];
    if ( item > queueBack ) {
      while(item > arr[list[list.length-1]]) {
        list.pop();
      }
    }
    const leaving = i - windowSize;
    if ( leaving >= 0 ) {
      if( leaving >= list[0] ) {
        list.shift();
      }
    }
    list.push(i);

    if ( (i+1) >= windowSize ) {
      result.push(arr[list[0]]);
    }
  }

  return result;
};
