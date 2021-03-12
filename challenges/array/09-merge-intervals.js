// I solved this on first go after half a micro bottle of bourbon
// yay

class Pair { 
  constructor(first, second) { 
    this.first = first; 
    this.second = second; 
  }

  overlaps(otherPair) {
    if ( this.second >= otherPair.first ) {
      return true;
    }
    return false;
  }

  static merge(a, b) {
    const lowFirst = Math.min(a.first, b.first);
    const highSecond = Math.max(a.second, b.second);
    return new Pair(lowFirst, highSecond);
  }
}

let mergeIntervals = function(v) {
  let result = v;
  for( let i = 0; i < result.length - 1; i++ ) {
    const thisPair = result[i];
    const nextPair = result[i+1];

    if ( thisPair.overlaps(nextPair) ) {
      const newPair = Pair.merge(thisPair,nextPair);
      result.splice(i, 2, newPair);
      i -= 1;
    }
  }
  return result;    
}
