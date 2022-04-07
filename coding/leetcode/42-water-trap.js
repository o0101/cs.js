import BIG from './test-42.js';

var trap = function(height) {
  let total = 0;
  let lastFirst1 = 0, lastLast1 = height.length - 1;
  //const max = Math.max(...height);
  let low = Math.min(...height);
  let high = low+1;
  while(true) {
    const {first1,last1,filteredPeaks} = filter(low, high, height, 0, height.length-1, /*lastFirst1, lastLast1*/);
    if ( first1 === last1 ) break;
    lastFirst1 = first1;
    lastLast1 = last1;
    //const intervals = findIntervals(filteredPeaks, first1, last1);
    const sum = sumIntervals(filteredPeaks, first1, last1);
    total += sum;
    /*
    if ( intervals.length ) {
      for( const [left, right] of intervals ) {
        total += (right - left) - 1;
      }
    }
    */
    low++;
    high++;
  }
  return total;
};

const T = [
  /*
  trap([0,1,0,2,1,0,1,3,2,1,2,1]),
  trap([4,2,0,3,2,5]),
  trap([0,7,1,4,6]),
  */
  trap(BIG)
];
console.log(T);

function filter(low, high, arr, lastFirst1, lastLast1) {
  let first1 = -1, last1 = -1;
  const filteredPeaks = [];
  for ( let i = lastFirst1; i <= lastLast1; i++ ) {
    const v = arr[i];
    if ( v <= low ) filteredPeaks.push(0);
    if ( v >= high ) {
      if ( first1 === -1 ) first1 = i;
      last1 = i;
      filteredPeaks.push(1);
    }
  }
  return {filteredPeaks, first1, last1};
}

function findIntervals(peaks, intervalStart, last) {
  const intervals = [];
  if ( intervalStart === -1 ) {
    return intervals;
  }
  for( let i = intervalStart+1; i <= last; i++ ) {
    const val = peaks[i];
    if ( val === 1 ) {
      if ( (i - intervalStart) > 1 ) {
        intervals.push([intervalStart, i]);
      }
      intervalStart = i;
    }
  }
  return intervals;
}

function sumIntervals(peaks, intervalStart, last) {
  let sum = 0;
  if ( intervalStart === -1 ) {
    return sum;
  }
  for( let i = intervalStart+1; i <= last; i++ ) {
    const val = peaks[i];
    if ( val === 1 ) {
      if ( (i - intervalStart) > 1 ) {
        sum += (i - intervalStart) - 1;
      }
      intervalStart = i;
    }
  }
  return sum;
}

