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

// My solution was to handle the cases as I saw it
// I think it's possible I missed a few cases here.
// One slip up I made in implementing was I missed a break at the end of a case statement (twice actually!) and
// 2 of 3 of my tests were failing until I put that in. After I put that in, all tests passed!

let binarySearch = function(arr, key, isLow = true) {
  let low = 0;
  let high = arr.length - 1;
  // Note on the condition:
    // <= is important as <
    // will only handle down to cases where subarray a[low..high] is length 2
    // but subarray of length 1 can only be handled by <=
  while( low <= high ) {
    const mid = (high+low)>>1;
    const midV = arr[mid];
    const lowV = arr[low];
    const highV = arr[high];
    switch(true) {
      case lowV < key && key < highV:
        // in wedge
        if ( midV < key ) {
          low = mid + 1;
        } else if ( midV > key ) {
          high = mid - 1;
        } else {
          if ( isLow ) {
            high = mid;
          } else {
            low = mid;
          }
        }
        break;
      case isLow && lowV < key && highV === key:
        // lowV in wedge
        if ( midV < key ) {
          low = mid + 1;
        } else {
          high = mid;
        }
        break;
      case !isLow && lowV === key && key < highV:
        // highV in wedge
        if ( midV > key ) {
          high = mid - 1;
        } else {
          low = mid;
        }
        break;
      case lowV === key && highV === key:
        // lowV is lowVIndex
        // highV is highVIndex
        if ( isLow ) {
          return low;
        } else {
          return high;
        }
        break;
      case key < lowV || highV < key:
        return -1;
    }
  }
  return -1;
};

let findLowIndex = function(arr, key) {
  return binarySearch(arr, key, true);
};

let findHighIndex = function(arr, key) {
  return binarySearch(arr, key, false);
};
