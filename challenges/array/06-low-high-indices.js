// My solution to this, before reading deeper into the challenge is an O(log N) 
// "dual binary range search". 
// Where we do binary range search (like for binary search on rotated array) but instead of  
// going into the 1 side where it isn't absent, we go into   
// both sides where it might be present and that are as far apart as possible. 
// We can do this with ranges as well, where we keep the left range
// low value to be less than key, and right range high value to be greater than key
// and the left range high value to be equal to key, as with the right range low value
// there may be a time where we are also ignoring 1 side, and where the other side contains the
// entire sequence of adjacent key entries
// So the binary search has two phases
// seek phase, where we find the min segment that contains the whole key sequence
// high > key, low < key
// and resolve phase, where we resolve the end points of that key sequence

let binarySearch = function(a, key, wedge) {
  let low = 0;
  let high = a.length;
  // Note on the condition:
    // <= is important as < 	
    // will only handle down to cases where subarray a[low..high] is length 2
    // but subarray of length 1 can only be handled by <=
  while( low <= high ) {
    const mid = (low+high)>>1;
    const midKey = a[mid];
    if ( midKey < key ) {
      low = mid + 1;
    } else if ( midKey > key ) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

let findLowIndex = function(arr, key) {
  return binarySearch(a, key, (start, end) => start <= key && end === key);
};

let findHighIndex = function(arr, key) {
  return binarySearch(a, key, (start, end) => start === key && end >= key);
};

